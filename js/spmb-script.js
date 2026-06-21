// ============================================
// KONFIGURASI
// ============================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz-PW7G6cV2ZqFf05yX5PgrdOzXKbiJBQW0XyORMkpZSMqztANJ7xfAsKnLxey7E_GT/exec';

// ============================================
// VARIABEL PAGINATION
// ============================================
var currentPage = 1;
var rowsPerPage = 10;
var allPendaftaranData = [];

// ============================================
// FUNGSI FORMAT TANGGAL
// ============================================
function formatTanggal(isoString) {
    if (!isoString || isoString === '-' || isoString === '') return '-';
    
    try {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return isoString;
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}-${month}-${year}`;
    } catch (e) {
        return isoString;
    }
}

// ============================================
// FUNGSI FORMAT NIK (HANYA 4 ANGKA TERAKHIR)
// ============================================
function formatNIK(nik) {
    if (!nik || nik === '-' || nik === '') return '-';
    
    const strNik = String(nik).trim();
    if (strNik.length < 4) return 'xxxx';
    
    const depan = strNik.slice(0, -4);
    return `${depan}xxxx`;
}

// ============================================
// 1. TAMPILKAN KUOTA
// ============================================
function tampilkanKuota() {
    const tbody = document.getElementById('kuotaTableBody');
    tbody.innerHTML = '<tr><td colspan="6" class="loading-text"><i class="fas fa-spinner fa-spin"></i> Memuat data kuota...</td></tr>';
    
    const script = document.createElement('script');
    const callbackName = 'callbackKuota_' + Date.now();
    
    window[callbackName] = function(data) {
        if (!data.success || !data.data || data.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="loading-text">Belum ada data kuota</td></tr>';
            document.getElementById('sisaKuotaBesar').textContent = '0';
            document.getElementById('detailKuota').textContent = 'Total Kuota: 0 | Terisi: 0';
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
        
        const sisaElement = document.getElementById('sisaKuotaBesar');
        const detailElement = document.getElementById('detailKuota');
        
        sisaElement.textContent = totalSisa;
        sisaElement.className = 'nilai-sisa' + (totalSisa < 0 ? ' negatif' : '');
        detailElement.textContent = `Total Kuota: ${totalKuota} | Terisi: ${totalDiterima}`;
        
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
// 2. TAMPILKAN PENDAFTARAN - DENGAN PAGINATION
// ============================================
function tampilkanPendaftaran() {
    const tbody = document.getElementById('pendaftaranTableBody');
    tbody.innerHTML = '<tr><td colspan="16" class="loading-text"><i class="fas fa-spinner fa-spin"></i> Memuat data pendaftaran...</td></tr>';
    
    const script = document.createElement('script');
    const callbackName = 'callbackPendaftaran_' + Date.now();
    
    window[callbackName] = function(data) {
        if (!data.success || !data.data || data.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="16" class="loading-text">Belum ada data pendaftaran</td></tr>';
            document.getElementById('paginationContainer').style.display = 'none';
            delete window[callbackName];
            return;
        }
        
        allPendaftaranData = data.data;
        currentPage = 1;
        renderPendaftaranTable();
        delete window[callbackName];
    };
    
    script.src = `${SCRIPT_URL}?action=getPendaftaran&callback=${callbackName}`;
    script.onerror = function() {
        tbody.innerHTML = '<tr><td colspan="16" class="loading-text" style="color:#ef4444;">Gagal memuat data</td></tr>';
        delete window[callbackName];
    };
    document.body.appendChild(script);
}

// ============================================
// 3. RENDER TABEL PENDAFTARAN DENGAN PAGINATION
// ============================================
function renderPendaftaranTable() {
    var tbody = document.getElementById('pendaftaranTableBody');
    var totalPages = Math.ceil(allPendaftaranData.length / rowsPerPage);
    
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
    
    var start = (currentPage - 1) * rowsPerPage;
    var end = Math.min(start + rowsPerPage, allPendaftaranData.length);
    var pageData = allPendaftaranData.slice(start, end);
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="16" class="loading-text">Tidak ada data</td></tr>';
        document.getElementById('paginationContainer').style.display = 'none';
        return;
    }
    
    var html = '';
    pageData.forEach((row, index) => {
        // KOLOM SESUAI SPREADSHEET (15 KOLOM)
        // A: Nama, B: NIK, C: Tempat Lahir, D: Tanggal Lahir,
        // E: Jenis Kelamin, F: Alamat, G: No KK, H: Nama Ayah,
        // I: NIK Ayah, J: Nama Ibu, K: NIK Ibu, L: Asal TK,
        // M: Tanggal Daftar, N: Status, O: Jalur
        var status = row[13] || 'Pending'; // Kolom N
        var statusClass = status.toLowerCase();
        var jalur = row[14] || '-'; // Kolom O
        
        var tanggalLahir = formatTanggal(row[3]);
        var tanggalDaftar = formatTanggal(row[12]);
        
        var nik = formatNIK(row[1]);
        var noKK = formatNIK(row[6]);
        var nikAyah = formatNIK(row[8]);
        var nikIbu = formatNIK(row[10]);
        
        var jenisKelamin = row[4] || '-';
        var alamat = row[5] || '-';
        
        html += `
            <tr>
                <td>${start + index + 1}</td>
                <td>${row[0] || '-'}</td>
                <td>${nik}</td>
                <td>${row[2] || '-'}</td>
                <td>${tanggalLahir}</td>
                <td>${jenisKelamin}</td>
                <td>${alamat}</td>
                <td>${noKK}</td>
                <td>${row[7] || '-'}</td>
                <td>${nikAyah}</td>
                <td>${row[9] || '-'}</td>
                <td>${nikIbu}</td>
                <td>${row[11] || '-'}</td>
                <td>${tanggalDaftar}</td>
                <td><span class="status-badge ${statusClass}">${status}</span></td>
                <td><span class="jalur-badge">${jalur}</span></td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
    renderPagination(totalPages);
}

// ============================================
// 4. RENDER PAGINATION
// ============================================
function renderPagination(totalPages) {
    var container = document.getElementById('paginationContainer');
    if (!container) return;
    
    if (totalPages <= 1) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'flex';
    
    var html = `
        <button onclick="goToPage(${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    for (var i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            html += `<button class="active" onclick="goToPage(${i})">${i}</button>`;
        } else if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 2) {
            html += `<button onclick="goToPage(${i})">${i}</button>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += `<span class="pagination-dots">...</span>`;
        }
    }
    
    html += `
        <button onclick="goToPage(${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
        <span class="pagination-info">Halaman ${currentPage} dari ${totalPages} (${allPendaftaranData.length} data)</span>
    `;
    
    container.innerHTML = html;
}

// ============================================
// 5. GO TO PAGE
// ============================================
function goToPage(page) {
    var totalPages = Math.ceil(allPendaftaranData.length / rowsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPendaftaranTable();
}

// ============================================
// 6. SUBMIT FORM PENDAFTARAN - DENGAN JENIS KELAMIN + ALAMAT
// ============================================
async function submitPendaftaran(event) {
    event.preventDefault();
    
    const data = {
        namaLengkap: document.getElementById('namaLengkap').value.trim(),
        nik: document.getElementById('nikDaftar').value.trim(),
        tempatLahir: document.getElementById('tempatLahir').value.trim(),
        tanggalLahir: document.getElementById('tanggalLahir').value,
        jenisKelamin: document.getElementById('jenisKelamin').value,
        alamat: document.getElementById('alamat').value.trim(),
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
        !data.jenisKelamin || !data.alamat || !data.noKK || !data.namaAyah || 
        !data.nikAyah || !data.namaIbu || !data.nikIbu || !data.asalTK || !data.jalur) {
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

// ============================================
// 7. CEK PENDAFTARAN
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
                const status = row[13] || 'Pending';
                const statusClass = status.toLowerCase();
                const jalur = row[14] || '-';
                
                const tanggalLahir = formatTanggal(row[3]);
                const tanggalDaftar = formatTanggal(row[12]);
                
                const nikTampil = formatNIK(row[1]);
                const noKKTampil = formatNIK(row[6]);
                const nikAyahTampil = formatNIK(row[8]);
                const nikIbuTampil = formatNIK(row[10]);
                
                const jenisKelamin = row[4] || '-';
                const alamat = row[5] || '-';
                
                hasilDiv.innerHTML = `
                    <div class="result-card">
                        <div class="row-grid">
                            <div><span class="label">Nama Lengkap</span></div>
                            <div class="value">${row[0] || '-'}</div>
                            
                            <div><span class="label">NIK</span></div>
                            <div class="value">${nikTampil}</div>
                            
                            <div><span class="label">Tempat Lahir</span></div>
                            <div class="value">${row[2] || '-'}</div>
                            
                            <div><span class="label">Tanggal Lahir</span></div>
                            <div class="value">${tanggalLahir}</div>
                            
                            <div><span class="label">Jenis Kelamin</span></div>
                            <div class="value">${jenisKelamin}</div>
                            
                            <div><span class="label">Alamat</span></div>
                            <div class="value">${alamat}</div>
                            
                            <div><span class="label">No KK</span></div>
                            <div class="value">${noKKTampil}</div>
                            
                            <div><span class="label">Nama Ayah</span></div>
                            <div class="value">${row[7] || '-'}</div>
                            
                            <div><span class="label">NIK Ayah</span></div>
                            <div class="value">${nikAyahTampil}</div>
                            
                            <div><span class="label">Nama Ibu</span></div>
                            <div class="value">${row[9] || '-'}</div>
                            
                            <div><span class="label">NIK Ibu</span></div>
                            <div class="value">${nikIbuTampil}</div>
                            
                            <div><span class="label">Asal TK/Paud</span></div>
                            <div class="value">${row[11] || '-'}</div>
                            
                            <div><span class="label">Tanggal Daftar</span></div>
                            <div class="value">${tanggalDaftar}</div>
                            
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
// 8. FUNGSI FORM MESSAGE
// ============================================
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
// 9. INISIALISASI
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
