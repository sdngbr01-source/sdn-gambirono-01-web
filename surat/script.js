// ============================================
// FRONTEND - script.js
// ============================================

// Konfigurasi
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzG5-sf46V-FlC9jn_ai5OFKvKoIDl67CC4pbk8SwnXjqBBwDLS8xeFUi-9583ILpaM/exec';

// KODE AKSES
const KODE_AKSES = 'admin123';

let currentNomorAgenda = '';
let currentJenisSurat = '';
let currentKodeKlasifikasi = '';
let isLoggedIn = false;

// ============================================
// 0. LOGIN & LOGOUT
// ============================================

// Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const kodeAkses = document.getElementById('kodeAkses').value.trim();
    const errorEl = document.getElementById('loginError');

    if (kodeAkses === KODE_AKSES) {
        isLoggedIn = true;
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('loginTime', Date.now().toString());

        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('suratPage').classList.add('show');

        // Inisialisasi halaman surat
        initSuratPage();
    } else {
        errorEl.classList.add('show');
        document.getElementById('kodeAkses').value = '';
        document.getElementById('kodeAkses').focus();
        setTimeout(() => errorEl.classList.remove('show'), 3000);
    }
});

// Logout
document.getElementById('btnLogout').addEventListener('click', function() {
    isLoggedIn = false;
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('loginTime');

    document.getElementById('suratPage').classList.remove('show');
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('kodeAkses').value = '';
    document.getElementById('kodeAkses').focus();
});

// Cek Session
function checkSession() {
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    const loginTime = sessionStorage.getItem('loginTime');

    if (loggedIn === 'true' && loginTime) {
        const elapsed = Date.now() - parseInt(loginTime);
        if (elapsed < 8 * 60 * 60 * 1000) { // 8 jam
            isLoggedIn = true;
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('suratPage').classList.add('show');
            initSuratPage();
            return true;
        }
    }
    return false;
}

// Init Surat Page
function initSuratPage() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('tanggalSurat').value = today;
    loadJenisSurat();
    document.getElementById('btnDownload').disabled = true;
}

// ============================================
// 1. LOAD JENIS SURAT (dari sheet kode_surat)
// ============================================
async function loadJenisSurat() {
    if (!isLoggedIn) {
        alert('Silakan login terlebih dahulu!');
        return;
    }

    const select = document.getElementById('jenisSurat');
    select.innerHTML = '<option value="">⏳ Memuat...</option>';

    try {
        const response = await fetch(`${SCRIPT_URL}?action=getJenisSurat`);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Gagal memuat data');
        }

        select.innerHTML = '<option value="">— Pilih Jenis Surat —</option>';
        data.data.forEach(item => {
            const option = document.createElement('option');
            option.value = JSON.stringify(item);
            option.textContent = `${item.kode} - ${item.nama}`;
            select.appendChild(option);
        });

        document.getElementById('statusText').textContent = `✅ ${data.data.length} jenis surat dimuat`;
    } catch (error) {
        console.error(error);
        select.innerHTML = '<option value="">❌ Gagal memuat data</option>';
        document.getElementById('statusText').textContent = '❌ Error: ' + error.message;
    }
}

// ============================================
// 2. PROSES SURAT
// ============================================
document.getElementById('suratForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    if (!isLoggedIn) {
        alert('Silakan login terlebih dahulu!');
        return;
    }

    const btn = document.getElementById('btnProses');
    const loader = document.getElementById('loader');
    const resultDiv = document.getElementById('result');
    const statusText = document.getElementById('statusText');

    const jenisSuratRaw = document.getElementById('jenisSurat').value;
    if (!jenisSuratRaw) {
        alert('Silakan pilih jenis surat!');
        return;
    }

    const jenisSurat = JSON.parse(jenisSuratRaw);
    const perihal = document.getElementById('perihal').value.trim();
    const tanggal = document.getElementById('tanggalSurat').value;

    if (!perihal) {
        alert('Perihal surat wajib diisi!');
        return;
    }

    if (!tanggal) {
        alert('Tanggal surat wajib diisi!');
        return;
    }

    btn.disabled = true;
    loader.classList.add('show');
    resultDiv.classList.remove('show');
    statusText.textContent = '⏳ Memproses surat...';

    try {
        const payload = {
            action: 'prosesSurat',
            jenisSurat: jenisSurat,
            perihal: perihal,
            tanggal: tanggal
        };

        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        sessionStorage.setItem('lastProses', JSON.stringify({
            jenisSurat,
            perihal,
            tanggal,
            timestamp: Date.now()
        }));

        await new Promise(resolve => setTimeout(resolve, 1500));

        const resultResponse = await fetch(`${SCRIPT_URL}?action=getHasilProses&t=${Date.now()}`);
        const resultData = await resultResponse.json();

        if (resultData.success) {
            currentNomorAgenda = resultData.data.nomorAgenda;
            currentJenisSurat = resultData.data.jenisSurat;
            currentKodeKlasifikasi = resultData.data.kodeKlasifikasi;

            resultDiv.innerHTML = `
                <strong>✅ Surat berhasil diproses!</strong><br />
                <strong>Nomor Agenda:</strong> ${currentNomorAgenda}<br />
                <strong>Jenis Surat:</strong> ${currentJenisSurat}<br />
                <strong>Kode Klasifikasi:</strong> ${currentKodeKlasifikasi}<br />
                <strong>Perihal:</strong> ${perihal}<br />
                <strong>Tanggal:</strong> ${tanggal}
            `;
            resultDiv.classList.add('show');
            statusText.textContent = `✅ Surat siap: ${currentNomorAgenda}`;

            document.getElementById('btnDownload').disabled = false;
        } else {
            throw new Error(resultData.message || 'Gagal memproses surat');
        }

    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = `❌ Error: ${error.message}`;
        resultDiv.classList.add('show');
        statusText.textContent = '❌ Gagal memproses';
    } finally {
        btn.disabled = false;
        loader.classList.remove('show');
    }
});

// ============================================
// 3. DOWNLOAD SURAT - BUKA LINK GOOGLE DOCS
// ============================================
document.getElementById('btnDownload').addEventListener('click', async function() {
    if (!isLoggedIn) {
        alert('Silakan login terlebih dahulu!');
        return;
    }

    if (!currentNomorAgenda) {
        alert('Silakan proses surat terlebih dahulu!');
        return;
    }

    const btn = this;
    btn.disabled = true;
    btn.textContent = '⏳ Mengunduh...';

    try {
        const url = `${SCRIPT_URL}?action=downloadSurat&nomorAgenda=${encodeURIComponent(currentNomorAgenda)}&t=${Date.now()}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.message || 'Gagal mengambil docId');
        }
        
        const docId = data.data.docId;
        const downloadUrl = `https://docs.google.com/document/d/${docId}/export?format=docx`;
        
        window.open(downloadUrl, '_blank');

        btn.textContent = '✅ Download dimulai!';
        setTimeout(() => {
            btn.textContent = '⬇️ Download Surat (DOCX)';
            btn.disabled = false;
        }, 2000);

    } catch (error) {
        console.error(error);
        alert('Gagal mengunduh: ' + error.message);
        btn.textContent = '⬇️ Download Surat (DOCX)';
        btn.disabled = false;
    }
});

// ============================================
// 4. INIT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Cek session login
    if (!checkSession()) {
        document.getElementById('loginPage').style.display = 'block';
        document.getElementById('suratPage').classList.remove('show');
    }
});