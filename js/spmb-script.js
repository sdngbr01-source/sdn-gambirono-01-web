// ============================================
// KONFIGURASI
// ============================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwxonXQ2XEvrSn7Ct1zhpTHQiN_zO2U25Zg5SdcF8XMZbwSxjZIxwgA5k-mLXk-15mp/exec';

// ============================================
// 1. TAMPILKAN DATA KUOTA
// ============================================
function tampilkanKuota() {
    const tbody = document.getElementById('kuotaTableBody');
    tbody.innerHTML = '<tr><td colspan="6" class="loading-text"><i class="fas fa-spinner fa-spin"></i> Memuat data kuota...</td></tr>';
    
    const script = document.createElement('script');
    const callbackName = 'callbackKuota_' + Date.now();
    
    window[callbackName] = function(data) {
        if (!data.success || !data.data || data.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="loading-text">Belum ada data kuota</td></tr>';
            delete window[callbackName];
            return;
        }
        
        let html = '';
        let totalKuota = 0;
        let totalDiterima = 0;
        
        data.data.forEach((row) => {
            const tahun = row[0] || '-';
            const kuota = parseInt(row[1]) || 0;
            const afirmasi = parseInt(row[2]) || 0;
            const domisili = parseInt(row[3]) || 0;
            const diterima = parseInt(row[4]) || 0;
            const sisa = kuota - diterima;
            
            totalKuota += kuota;
            totalDiterima += diterima;
            
            const sisaClass = sisa >= 0 ? 'positif' : 'negatif';
            
            html += `
                <tr>
                    <td><strong>${tahun}</strong></td>
                    <td>${kuota}</td>
                    <td>${afirmasi}</td>
                    <td>${domisili}</td>
                    <td>${diterima}</td>
                    <td class="sisa-kuota ${sisaClass}">${sisa}</td>
                </tr>
            `;
        });
        
        const totalSisa = totalKuota - totalDiterima;
        const totalClass = totalSisa >= 0 ? 'positif' : 'negatif';
        html += `
            <tr style="background: #f1f5f9; font-weight: 700; border-top: 2px solid #1e293b;">
                <td><strong>TOTAL</strong></td>
                <td>${totalKuota}</td>
                <td>-</td>
                <td>-</td>
                <td>${totalDiterima}</td>
                <td class="sisa-kuota ${totalClass}">${totalSisa}</td>
            </tr>
        `;
        
        tbody.innerHTML = html;
        delete window[callbackName];
    };
    
    script.src = `${SCRIPT_URL}?action=getKuota&callback=${callbackName}`;
    script.onerror = function() {
        tbody.innerHTML = '<tr><td colspan="6" class="loading-text" style="color:#ef4444;">Gagal memuat data</td></tr>';
        delete window[callbackName];
    };
    document.body.appendChild(script);
}

// ============================================
// 2. TAMPILKAN SEMUA DATA PENDAFTARAN - DENGAN JALUR
// ============================================
function tampilkanPendaftaran() {
    const tbody = document.getElementById('pendaftaranTableBody');
    tbody.innerHTML = '<tr><td colspan="14" class="loading-text"><i class="fas fa-spinner fa-spin"></i> Memuat data pendaftaran...</td></tr>';
    
    const script = document.createElement('script');
    const callbackName = 'callbackPendaftaran_' + Date.now();
    
    window[callbackName] = function(data) {
        if (!data.success || !data.data || data.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="14" class="loading-text">Belum ada data pendaftaran</td></tr>';
            delete window[callbackName];
            return;
        }
        
        let html = '';
        data.data.forEach((row, index) => {
            const status = row[11] || 'Pending';
            const statusClass = status.toLowerCase();
            const jalur = row[12] || '-'; // Kolom M = Jalur
            
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${row[0] || '-'}</td>
                    <td>${row[1] || '-'}</td>
                    <td>${row[2] || '-'}</td>
                    <td>${row[3] || '-'}</td>
                    <td>${row[4] || '-'}</td>
                    <td>${row[5] || '-'}</td>
                    <td>${row[6] || '-'}</td>
                    <td>${row[7] || '-'}</td>
                    <td>${row[8] || '-'}</td>
                    <td>${row[9] || '-'}</td>
                    <td>${row[10] || '-'}</td>
                    <td><span class="status-badge ${statusClass}">${status}</span></td>
                    <td><span class="jalur-badge">${jalur}</span></td>
                </tr>
            `;
        });
        
        tbody.innerHTML = html;
        delete window[callbackName];
    };
    
    script.src = `${SCRIPT_URL}?action=getPendaftaran&callback=${callbackName}`;
    script.onerror = function() {
        tbody.innerHTML = '<tr><td colspan="14" class="loading-text" style="color:#ef4444;">Gagal memuat data</td></tr>';
        delete window[callbackName];
    };
    document.body.appendChild(script);
}

// ============================================
// 3. SUBMIT FORM PENDAFTARAN
// ============================================
async function submitPendaftaran(event) {
    event.preventDefault();
    
    const data = {
        namaLengkap: document.getElementById('namaLengkap').value.trim(),
        nik: document.getElementById('nikDaftar').value.trim(),
        tempatLahir: document.getElementById('tempatLahir').value.trim(),
        tanggalLahir: document.getElementById('tanggalLahir').value,
        noKK: document.getElementById('noKK').value.trim(),
        namaAyah: document.getElementById('namaAyah').value.trim(),
        nikAyah: document.getElementById('nikAyah').value.trim(),
        namaIbu: document.getElementById('namaIbu').value.trim(),
        nikIbu: document.getElementById('nikIbu').value.trim(),
        asalTK: document.getElementById('asalTK').value.trim(),
        jalur: document.getElementById('jalurPendaftaran').value
    };
    
    console.log('Data dikirim:', data);
    
    // Validasi
    if (!data.namaLengkap || !data.nik || !data.tempatLahir || !data.tanggalLahir || 
        !data.noKK || !data.namaAyah || !data.nikAyah || !data.namaIbu || 
        !data.nikIbu || !data.asalTK || !data.jalur) {
        showFormMessage('Semua field wajib diisi!', 'error');
        return;
    }
    
    if (!/^\d{16}$/.test(data.nik) || !/^\d{16}$/.test(data.nikAyah) || 
        !/^\d{16}$/.test(data.nikIbu) || !/^\d{16}$/.test(data.noKK)) {
        showFormMessage('NIK dan No KK harus 16 digit angka!', 'error');
        return;
    }
    
    const submitBtn = document.querySelector('#formPendaftaran button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    
    try {
        showFormMessage('Mengirim data...', 'info');
        
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.id = 'submitIframe';
        
        const params = new URLSearchParams();
        params.append('action', 'addPendaftaran');
        Object.keys(data).forEach(key => params.append(key, data[key]));
        
        iframe.src = `${SCRIPT_URL}?${params.toString()}`;
        document.body.appendChild(iframe);
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const iframeToRemove = document.getElementById('submitIframe');
        if (iframeToRemove && iframeToRemove.parentNode) {
            iframeToRemove.parentNode.removeChild(iframeToRemove);
        }
        
        showFormMessage('✅ Pendaftaran berhasil!', 'success');
        document.getElementById('formPendaftaran').reset();
        
        tampilkanKuota();
        tampilkanPendaftaran();
        
    } catch (error) {
        console.error('Error:', error);
        showFormMessage('❌ Gagal mendaftar. Silakan coba lagi.', 'error');
        
        const iframeToRemove = document.getElementById('submitIframe');
        if (iframeToRemove && iframeToRemove.parentNode) {
            iframeToRemove.parentNode.removeChild(iframeToRemove);
        }
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Daftar Sekarang';
    }
}

function showFormMessage(message, type) {
    const msgDiv = document.getElementById('formMessage');
    msgDiv.style.display = 'block';
    msgDiv.textContent = message;
    msgDiv.className = 'form-message ' + type;
    
    if (type === 'success' || type === 'error') {
        setTimeout(() => {
            msgDiv.style.display = 'none';
        }, 5000);
    }
}

function resetForm() {
    document.getElementById('formMessage').style.display = 'none';
    document.getElementById('formPendaftaran').reset();
}

// ============================================
// 4. CEK PENDAFTARAN
// ============================================
function cekPendaftaran() {
    const nik = document.getElementById('nikCari').value.trim();
    const hasilDiv = document.getElementById('hasilCekPendaftaran');
    
    if (!nik || nik.length !== 16) {
        hasilDiv.innerHTML = `
            <div class="not-found">
                <i class="fas fa-exclamation-circle"></i> Masukkan NIK yang valid (16 digit angka)
            </div>
        `;
        return;
    }
    
    hasilDiv.innerHTML = '<p style="color:#64748b;"><i class="fas fa-spinner fa-spin"></i> Mencari data...</p>';
    
    const script = document.createElement('script');
    const callbackName = 'callbackCek_' + Date.now();
    
    window[callbackName] = function(data) {
        if (!data.success || !data.data || data.data.length === 0) {
            hasilDiv.innerHTML = `
                <div class="not-found">
                    <i class="fas fa-exclamation-circle"></i> Belum ada data pendaftaran
                </div>
            `;
            delete window[callbackName];
            return;
        }
        
        let found = false;
        for (const row of data.data) {
            if (row[1] === nik || row[6] === nik || row[8] === nik) {
                const status = row[11] || 'Pending';
                const statusClass = status.toLowerCase();
                const jalur = row[12] || '-';
                
                hasilDiv.innerHTML = `
                    <div class="result-card">
                        <div class="row-grid">
                            <div><span class="label">Nama Lengkap</span></div>
                            <div class="value">${row[0] || '-'}</div>
                            
                            <div><span class="label">NIK</span></div>
                            <div class="value">${row[1] || '-'}</div>
                            
                            <div><span class="label">Tempat Lahir</span></div>
                            <div class="value">${row[2] || '-'}</div>
                            
                            <div><span class="label">Tanggal Lahir</span></div>
                            <div class="value">${row[3] || '-'}</div>
                            
                            <div><span class="label">Asal TK/Paud</span></div>
                            <div class="value">${row[9] || '-'}</div>
                            
                            <div><span class="label">Tanggal Daftar</span></div>
                            <div class="value">${row[10] || '-'}</div>
                            
                            <div><span class="label">Jalur</span></div>
                            <div class="value"><strong>${jalur}</strong></div>
                            
                            <div><span class="label">Status</span></div>
                            <div class="value"><span class="status-badge ${statusClass}">${status}</span></div>
                        </div>
                    </div>
                `;
                found = true;
                break;
            }
        }
        
        if (!found) {
            hasilDiv.innerHTML = `
                <div class="not-found">
                    <i class="fas fa-exclamation-circle"></i> Data tidak ditemukan.
                </div>
            `;
        }
        
        delete window[callbackName];
    };
    
    script.src = `${SCRIPT_URL}?action=getPendaftaran&callback=${callbackName}`;
    script.onerror = function() {
        hasilDiv.innerHTML = `
            <div class="not-found" style="background:#fee2e2;color:#991b1b;border-color:#fca5a5;">
                <i class="fas fa-exclamation-circle"></i> Gagal mencari data.
            </div>
        `;
        delete window[callbackName];
    };
    document.body.appendChild(script);
}

// ============================================
// 5. INISIALISASI
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    tampilkanKuota();
    tampilkanPendaftaran();
    
    setInterval(() => {
        tampilkanKuota();
        tampilkanPendaftaran();
    }, 60000);
    
    const nikInput = document.getElementById('nikCari');
    if (nikInput) {
        nikInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') cekPendaftaran();
        });
    }
});