// ============================================
// KONFIGURASI
// ============================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwxonXQ2XEvrSn7Ct1zhpTHQiN_zO2U25Zg5SdcF8XMZbwSxjZIxwgA5k-mLXk-15mp/exec';

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
    
    // 4 angka terakhir diganti xxxx
    const depan = strNik.slice(0, -4);
    return `${depan}xxxx`;
}

function tampilkanKuota() {
    const tbody = document.getElementById('kuotaTableBody');
    tbody.innerHTML = '<tr><td colspan="6" class="loading-text"><i class="fas fa-spinner fa-spin"></i> Memuat data kuota...</td></tr>';
    
    const script = document.createElement('script');
    const callbackName = 'callbackKuota_' + Date.now();
    
    window[callbackName] = function(data) {
        if (!data.success || !data.data || data.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="loading-text">Belum ada data kuota</td></tr>';
            // Update rekap dengan 0
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
        
        // ============================================
        // UPDATE REKAP KUOTA BESAR
        // ============================================
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
// 2. TAMPILKAN SEMUA DATA PENDAFTARAN - DENGAN NIK TERSEMBUNYI
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
            const jalur = row[12] || '-';
            
            // FORMAT TANGGAL
            const tanggalLahir = formatTanggal(row[3]);
            const tanggalDaftar = formatTanggal(row[10]);
            
            // FORMAT NIK (SEMUA NIK DISEMBUNYIKAN)
            const nik = formatNIK(row[1]);
            const noKK = formatNIK(row[4]);
            const nikAyah = formatNIK(row[6]);
            const nikIbu = formatNIK(row[8]);
            
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${row[0] || '-'}</td>
                    <td>${nik}</td>
                    <td>${row[2] || '-'}</td>
                    <td>${tanggalLahir}</td>
                    <td>${noKK}</td>
                    <td>${row[5] || '-'}</td>
                    <td>${nikAyah}</td>
                    <td>${row[7] || '-'}</td>
                    <td>${nikIbu}</td>
                    <td>${row[9] || '-'}</td>
                    <td>${tanggalDaftar}</td>
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
// 4. CEK PENDAFTARAN - DENGAN NIK TERSEMBUNYI
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
            // Cek berdasarkan NIK asli (masih pake row[1] untuk pencarian)
            if (row[1] === nik || row[6] === nik || row[8] === nik) {
                const status = row[11] || 'Pending';
                const statusClass = status.toLowerCase();
                const jalur = row[12] || '-';
                
                // FORMAT TANGGAL
                const tanggalLahir = formatTanggal(row[3]);
                const tanggalDaftar = formatTanggal(row[10]);
                
                // FORMAT NIK (TAMPILKAN TERSEMBUNYI)
                const nikTampil = formatNIK(row[1]);
                const noKKTampil = formatNIK(row[4]);
                const nikAyahTampil = formatNIK(row[6]);
                const nikIbuTampil = formatNIK(row[8]);
                
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
                            
                            <div><span class="label">No KK</span></div>
                            <div class="value">${noKKTampil}</div>
                            
                            <div><span class="label">Nama Ayah</span></div>
                            <div class="value">${row[5] || '-'}</div>
                            
                            <div><span class="label">NIK Ayah</span></div>
                            <div class="value">${nikAyahTampil}</div>
                            
                            <div><span class="label">Nama Ibu</span></div>
                            <div class="value">${row[7] || '-'}</div>
                            
                            <div><span class="label">NIK Ibu</span></div>
                            <div class="value">${nikIbuTampil}</div>
                            
                            <div><span class="label">Asal TK/Paud</span></div>
                            <div class="value">${row[9] || '-'}</div>
                            
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
