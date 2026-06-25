// ============================================
// KONFIGURASI
// ============================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz-PW7G6cV2ZqFf05yX5PgrdOzXKbiJBQW0XyORMkpZSMqztANJ7xfAsKnLxey7E_GT/exec';

// ============================================
// VARIABEL GLOBAL
// ============================================
var currentPage = 1;
var rowsPerPage = 10;
var allPendaftaranData = [];
var autoRefreshInterval = null;

// ============================================
// FUNGSI UTILITY
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

function formatNIK(nik) {
    if (!nik || nik === '-' || nik === '') return '-';
    const strNik = String(nik).trim();
    if (strNik.length < 4) return 'xxxx';
    return strNik.slice(0, -4) + 'xxxx';
}

function getElementSafe(id) {
    const el = document.getElementById(id);
    if (!el) {
        console.warn(`⚠️ Element #${id} tidak ditemukan`);
    }
    return el;
}

function updateTextContent(id, value) {
    const el = getElementSafe(id);
    if (el) el.textContent = value;
}

// ============================================
// 1. TAMPILKAN KUOTA
// ============================================
function tampilkanKuota() {
    console.log('🔄 Memuat data kuota...');
    
    const tbody = getElementSafe('kuotaTableBody');
    if (!tbody) {
        console.error('❌ Element #kuotaTableBody tidak ditemukan!');
        return;
    }
    
    tbody.innerHTML = '<tr><td colspan="10" class="loading-text"><i class="fas fa-spinner fa-spin"></i> Memuat data kuota...</td></tr>';
    
    fetch(`${SCRIPT_URL}?action=getKuota`)
        .then(response => response.json())
        .then(dataKuota => {
            console.log('✅ Data kuota diterima:', dataKuota);
            
            if (!dataKuota.success || !dataKuota.data || dataKuota.data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="10" class="loading-text">Belum ada data kuota</td></tr>';
                updateTextContent('sisaKuotaBesar', '0');
                updateTextContent('detailKuota', 'Total Kuota: 0 | Terisi: 0');
                return;
            }
            
            fetch(`${SCRIPT_URL}?action=getPendaftaran`)
                .then(response => response.json())
                .then(dataPendaftaran => {
                    console.log('✅ Data pendaftaran untuk rekap diterima');
                    renderTabelKuota(dataKuota, dataPendaftaran);
                })
                .catch(err => {
                    console.warn('⚠️ Gagal ambil pendaftaran, pakai fallback:', err);
                    renderTabelKuota(dataKuota, null);
                });
        })
        .catch(err => {
            console.error('❌ Gagal memuat kuota:', err);
            tbody.innerHTML = '<tr><td colspan="10" class="loading-text" style="color:#ef4444;">❌ Gagal memuat data kuota</td></tr>';
        });
}

// ============================================
// RENDER TABEL KUOTA
// ============================================
function renderTabelKuota(dataKuota, dataPendaftaran) {
    const tbody = document.getElementById('kuotaTableBody');
    if (!tbody) return;
    
    let html = '';
    let totalKuota = 0;
    let totalDiterima = 0;
    let totalAfirmasiL = 0, totalAfirmasiP = 0;
    let totalMutasiL = 0, totalMutasiP = 0;
    let totalDomisiliL = 0, totalDomisiliP = 0;
    
    // Buat rekap per tahun dari data pendaftaran
    const rekapPerTahun = {};
    
    if (dataPendaftaran && dataPendaftaran.success && dataPendaftaran.data) {
        dataPendaftaran.data.forEach((row) => {
            const tglDaftar = row[12] || '';
            let tahun = '-';
            
            if (tglDaftar && tglDaftar !== '-') {
                try {
                    const date = new Date(tglDaftar);
                    if (!isNaN(date.getTime())) {
                        tahun = date.getFullYear().toString();
                    }
                } catch (e) {
                    tahun = '-';
                }
            }
            
            const jalur = (row[14] || '').toLowerCase();
            const jenisKelamin = (row[4] || '').toLowerCase();
            const status = (row[13] || '').toLowerCase();
            
            if (status !== 'diterima' && status !== 'lulus') return;
            
            if (!rekapPerTahun[tahun]) {
                rekapPerTahun[tahun] = {
                    afirmasiL: 0, afirmasiP: 0,
                    mutasiL: 0, mutasiP: 0,
                    domisiliL: 0, domisiliP: 0
                };
            }
            
            const isLaki = jenisKelamin === 'laki-laki' || jenisKelamin === 'l' || jenisKelamin === 'lk';
            
            if (jalur === 'afirmasi') {
                if (isLaki) rekapPerTahun[tahun].afirmasiL++;
                else rekapPerTahun[tahun].afirmasiP++;
            } else if (jalur === 'mutasi') {
                if (isLaki) rekapPerTahun[tahun].mutasiL++;
                else rekapPerTahun[tahun].mutasiP++;
            } else if (jalur === 'domisili') {
                if (isLaki) rekapPerTahun[tahun].domisiliL++;
                else rekapPerTahun[tahun].domisiliP++;
            }
        });
    }
    
    // Proses data kuota
    dataKuota.data.forEach((row) => {
        const tahun = row[0] || '-';
        const kuota = parseInt(row[1]) || 0;
        
        const rekap = rekapPerTahun[tahun] || {
            afirmasiL: 0, afirmasiP: 0,
            mutasiL: 0, mutasiP: 0,
            domisiliL: 0, domisiliP: 0
        };
        
        const afirmasiL = rekap.afirmasiL || 0;
        const afirmasiP = rekap.afirmasiP || 0;
        const mutasiL = rekap.mutasiL || 0;
        const mutasiP = rekap.mutasiP || 0;
        const domisiliL = rekap.domisiliL || 0;
        const domisiliP = rekap.domisiliP || 0;
        
        const totalAfirmasi = afirmasiL + afirmasiP;
        const totalMutasi = mutasiL + mutasiP;
        const totalDomisili = domisiliL + domisiliP;
        const diterima = totalAfirmasi + totalMutasi + totalDomisili;
        const sisa = kuota - diterima;
        
        totalKuota += kuota;
        totalDiterima += diterima;
        totalAfirmasiL += afirmasiL;
        totalAfirmasiP += afirmasiP;
        totalMutasiL += mutasiL;
        totalMutasiP += mutasiP;
        totalDomisiliL += domisiliL;
        totalDomisiliP += domisiliP;
        
        const sisaClass = sisa > 0 ? 'positif' : (sisa < 0 ? 'negatif' : 'nol');
        
        html += `
            <tr>
                <td><strong>${tahun}</strong></td>
                <td>${kuota}</td>
                <td>${afirmasiL}</td>
                <td>${afirmasiP}</td>
                <td>${mutasiL}</td>
                <td>${mutasiP}</td>
                <td>${domisiliL}</td>
                <td>${domisiliP}</td>
                <td><strong>${diterima}</strong></td>
                <td class="sisa-kuota ${sisaClass}">${sisa}</td>
            </tr>
        `;
    });
    
    const totalSisa = totalKuota - totalDiterima;
    const totalClass = totalSisa > 0 ? 'positif' : (totalSisa < 0 ? 'negatif' : 'nol');
    
    html += `
        <tr class="total-row">
            <td><strong>TOTAL</strong></td>
            <td><strong>${totalKuota}</strong></td>
            <td><strong>${totalAfirmasiL}</strong></td>
            <td><strong>${totalAfirmasiP}</strong></td>
            <td><strong>${totalMutasiL}</strong></td>
            <td><strong>${totalMutasiP}</strong></td>
            <td><strong>${totalDomisiliL}</strong></td>
            <td><strong>${totalDomisiliP}</strong></td>
            <td><strong>${totalDiterima}</strong></td>
            <td class="sisa-kuota ${totalClass}"><strong>${totalSisa}</strong></td>
        </tr>
    `;
    
    tbody.innerHTML = html;
    
    // UPDATE SISA KUOTA ATAS (ID: sisaKuotaAtas)
    const sisaAtas = document.getElementById('sisaKuotaAtas');
    if (sisaAtas) {
        sisaAtas.textContent = totalSisa;
        sisaAtas.className = 'nilai-sisa' + (totalSisa < 0 ? ' negatif' : '');
    }
    
    // UPDATE SISA KUOTA BAWAH (ID: sisaKuotaBawah)
    const sisaBawah = document.getElementById('sisaKuotaBawah');
    if (sisaBawah) {
        sisaBawah.textContent = totalSisa;
        sisaBawah.className = 'sisa-nilai' + (totalSisa < 0 ? ' negatif' : '');
    }
    
    // UPDATE DETAIL KUOTA
    const detailElements = document.querySelectorAll('.sisa-detail');
    detailElements.forEach(el => {
        el.textContent = `Total Kuota: ${totalKuota} | Terisi: ${totalDiterima}`;
    });
}
// ============================================
// 2. TAMPILKAN REKAP LENGKAP
// ============================================
function tampilkanRekapLengkap() {
    console.log('🔄 Memuat rekap lengkap...');
    
    fetch(`${SCRIPT_URL}?action=getPendaftaran`)
        .then(response => response.json())
        .then(data => {
            console.log('✅ Data rekap diterima');
            
            if (!data.success || !data.data || data.data.length === 0) {
                resetRekapLengkap();
                return;
            }
            
            let counters = {
                afirmasiPendaftarL: 0, afirmasiPendaftarP: 0,
                mutasiPendaftarL: 0, mutasiPendaftarP: 0,
                domisiliPendaftarL: 0, domisiliPendaftarP: 0,
                afirmasiDiterimaL: 0, afirmasiDiterimaP: 0,
                mutasiDiterimaL: 0, mutasiDiterimaP: 0,
                domisiliDiterimaL: 0, domisiliDiterimaP: 0
            };
            
            data.data.forEach((row) => {
                const jalur = (row[14] || '').toLowerCase();
                const jenisKelamin = (row[4] || '').toLowerCase();
                const status = (row[13] || '').toLowerCase();
                
                const isLaki = jenisKelamin === 'laki-laki' || jenisKelamin === 'l' || jenisKelamin === 'lk';
                const isDiterima = (status === 'diterima' || status === 'lulus');
                
                // Hitung Pendaftar
                if (jalur === 'afirmasi') {
                    if (isLaki) counters.afirmasiPendaftarL++;
                    else counters.afirmasiPendaftarP++;
                } else if (jalur === 'mutasi') {
                    if (isLaki) counters.mutasiPendaftarL++;
                    else counters.mutasiPendaftarP++;
                } else if (jalur === 'domisili') {
                    if (isLaki) counters.domisiliPendaftarL++;
                    else counters.domisiliPendaftarP++;
                }
                
                // Hitung Diterima
                if (isDiterima) {
                    if (jalur === 'afirmasi') {
                        if (isLaki) counters.afirmasiDiterimaL++;
                        else counters.afirmasiDiterimaP++;
                    } else if (jalur === 'mutasi') {
                        if (isLaki) counters.mutasiDiterimaL++;
                        else counters.mutasiDiterimaP++;
                    } else if (jalur === 'domisili') {
                        if (isLaki) counters.domisiliDiterimaL++;
                        else counters.domisiliDiterimaP++;
                    }
                }
            });
            
            // Update DOM - Pendaftar
            updateTextContent('afirmasiPendaftarL', counters.afirmasiPendaftarL);
            updateTextContent('afirmasiPendaftarP', counters.afirmasiPendaftarP);
            updateTextContent('afirmasiPendaftarTotal', counters.afirmasiPendaftarL + counters.afirmasiPendaftarP);
            
            updateTextContent('mutasiPendaftarL', counters.mutasiPendaftarL);
            updateTextContent('mutasiPendaftarP', counters.mutasiPendaftarP);
            updateTextContent('mutasiPendaftarTotal', counters.mutasiPendaftarL + counters.mutasiPendaftarP);
            
            updateTextContent('domisiliPendaftarL', counters.domisiliPendaftarL);
            updateTextContent('domisiliPendaftarP', counters.domisiliPendaftarP);
            updateTextContent('domisiliPendaftarTotal', counters.domisiliPendaftarL + counters.domisiliPendaftarP);
            
            // Update DOM - Diterima
            updateTextContent('afirmasiDiterimaL', counters.afirmasiDiterimaL);
            updateTextContent('afirmasiDiterimaP', counters.afirmasiDiterimaP);
            updateTextContent('afirmasiDiterimaTotal', counters.afirmasiDiterimaL + counters.afirmasiDiterimaP);
            
            updateTextContent('mutasiDiterimaL', counters.mutasiDiterimaL);
            updateTextContent('mutasiDiterimaP', counters.mutasiDiterimaP);
            updateTextContent('mutasiDiterimaTotal', counters.mutasiDiterimaL + counters.mutasiDiterimaP);
            
            updateTextContent('domisiliDiterimaL', counters.domisiliDiterimaL);
            updateTextContent('domisiliDiterimaP', counters.domisiliDiterimaP);
            updateTextContent('domisiliDiterimaTotal', counters.domisiliDiterimaL + counters.domisiliDiterimaP);
            
            // Update Semua Jalur
            const totalL = counters.afirmasiDiterimaL + counters.mutasiDiterimaL + counters.domisiliDiterimaL;
            const totalP = counters.afirmasiDiterimaP + counters.mutasiDiterimaP + counters.domisiliDiterimaP;
            
            updateTextContent('semuaDiterimaL', totalL);
            updateTextContent('semuaDiterimaP', totalP);
            updateTextContent('semuaDiterimaTotal', totalL + totalP);
            
        })
        .catch(err => {
            console.error('❌ Gagal memuat rekap:', err);
            resetRekapLengkap();
        });
}

function resetRekapLengkap() {
    const ids = [
        'afirmasiPendaftarL', 'afirmasiPendaftarP', 'afirmasiPendaftarTotal',
        'mutasiPendaftarL', 'mutasiPendaftarP', 'mutasiPendaftarTotal',
        'domisiliPendaftarL', 'domisiliPendaftarP', 'domisiliPendaftarTotal',
        'afirmasiDiterimaL', 'afirmasiDiterimaP', 'afirmasiDiterimaTotal',
        'mutasiDiterimaL', 'mutasiDiterimaP', 'mutasiDiterimaTotal',
        'domisiliDiterimaL', 'domisiliDiterimaP', 'domisiliDiterimaTotal',
        'semuaDiterimaL', 'semuaDiterimaP', 'semuaDiterimaTotal'
    ];
    ids.forEach(id => updateTextContent(id, '0'));
}

// ============================================
// 3. TAMPILKAN PENDAFTARAN
// ============================================
function tampilkanPendaftaran() {
    console.log('🔄 Memuat data pendaftaran...');
    
    const tbody = getElementSafe('pendaftaranTableBody');
    if (!tbody) {
        console.error('❌ Element #pendaftaranTableBody tidak ditemukan!');
        return;
    }
    
    tbody.innerHTML = '<tr><td colspan="16" class="loading-text"><i class="fas fa-spinner fa-spin"></i> Memuat data pendaftaran...</td></tr>';
    
    fetch(`${SCRIPT_URL}?action=getPendaftaran`)
        .then(response => response.json())
        .then(data => {
            console.log('✅ Data pendaftaran diterima');
            
            if (!data.success || !data.data || data.data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="16" class="loading-text">Belum ada data pendaftaran</td></tr>';
                const pagContainer = getElementSafe('paginationContainer');
                if (pagContainer) pagContainer.style.display = 'none';
                return;
            }
            
            allPendaftaranData = data.data;
            currentPage = 1;
            renderPendaftaranTable();
        })
        .catch(err => {
            console.error('❌ Gagal memuat pendaftaran:', err);
            tbody.innerHTML = '<tr><td colspan="16" class="loading-text" style="color:#ef4444;">❌ Gagal memuat data</td></tr>';
        });
}

// ============================================
// 4. RENDER TABEL PENDAFTARAN
// ============================================
function renderPendaftaranTable() {
    const tbody = getElementSafe('pendaftaranTableBody');
    if (!tbody) return;
    
    const totalPages = Math.ceil(allPendaftaranData.length / rowsPerPage);
    
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
    
    const start = (currentPage - 1) * rowsPerPage;
    const end = Math.min(start + rowsPerPage, allPendaftaranData.length);
    const pageData = allPendaftaranData.slice(start, end);
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="16" class="loading-text">Tidak ada data</td></tr>';
        const pagContainer = getElementSafe('paginationContainer');
        if (pagContainer) pagContainer.style.display = 'none';
        return;
    }
    
    let html = '';
    pageData.forEach((row, index) => {
        const status = row[13] || 'Pending';
        const statusClass = status.toLowerCase();
        const jalur = row[14] || '-';
        
        const tanggalLahir = formatTanggal(row[3]);
        const tanggalDaftar = formatTanggal(row[12]);
        
        const nik = formatNIK(row[1]);
        const noKK = formatNIK(row[6]);
        const nikAyah = formatNIK(row[8]);
        const nikIbu = formatNIK(row[10]);
        
        html += `
            <tr>
                <td>${start + index + 1}</td>
                <td>${row[0] || '-'}</td>
                <td>${nik}</td>
                <td>${row[2] || '-'}</td>
                <td>${tanggalLahir}</td>
                <td>${row[4] || '-'}</td>
                <td>${row[5] || '-'}</td>
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
// 5. RENDER PAGINATION
// ============================================
function renderPagination(totalPages) {
    const container = getElementSafe('paginationContainer');
    if (!container) return;
    
    if (totalPages <= 1) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'flex';
    
    let html = `
        <button onclick="goToPage(${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    for (let i = 1; i <= totalPages; i++) {
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
// 6. GO TO PAGE
// ============================================
function goToPage(page) {
    const totalPages = Math.ceil(allPendaftaranData.length / rowsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPendaftaranTable();
}

// ============================================
// 7. CEK PENDAFTARAN
// ============================================
function cekPendaftaran() {
    const nikInput = getElementSafe('nikCari');
    const hasilDiv = getElementSafe('hasilCekPendaftaran');
    
    if (!nikInput || !hasilDiv) {
        console.error('❌ Element cek pendaftaran tidak ditemukan');
        return;
    }
    
    const nik = nikInput.value.trim();
    
    if (!nik || nik.length !== 16) {
        hasilDiv.innerHTML = `
            <div class="not-found">
                <i class="fas fa-exclamation-circle"></i> Masukkan NIK yang valid (16 digit angka)
            </div>
        `;
        return;
    }
    
    hasilDiv.innerHTML = '<p style="color:#64748b;"><i class="fas fa-spinner fa-spin"></i> Mencari data...</p>';
    
    fetch(`${SCRIPT_URL}?action=getPendaftaran`)
        .then(response => response.json())
        .then(data => {
            if (!data.success || !data.data || data.data.length === 0) {
                hasilDiv.innerHTML = `
                    <div class="not-found">
                        <i class="fas fa-exclamation-circle"></i> Belum ada data pendaftaran
                    </div>
                `;
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
                                <div class="value">${row[4] || '-'}</div>
                                
                                <div><span class="label">Alamat</span></div>
                                <div class="value">${row[5] || '-'}</div>
                                
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
        })
        .catch(err => {
            console.error('Error:', err);
            hasilDiv.innerHTML = `
                <div class="not-found" style="background:#fee2e2;color:#991b1b;border-color:#fca5a5;">
                    <i class="fas fa-exclamation-circle"></i> Gagal mencari data.
                </div>
            `;
        });
}

// ============================================
// 8. SUBMIT FORM PENDAFTARAN
// ============================================
function showFormMessage(message, type) {
    const msgDiv = getElementSafe('formMessage');
    if (!msgDiv) return;
    
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
    const msgDiv = getElementSafe('formMessage');
    if (msgDiv) msgDiv.style.display = 'none';
    
    const form = getElementSafe('formPendaftaran');
    if (form) form.reset();
}

async function submitPendaftaran(event) {
    event.preventDefault();
    
    const data = {
        namaLengkap: document.getElementById('namaLengkap')?.value?.trim() || '',
        nik: document.getElementById('nikDaftar')?.value?.trim() || '',
        tempatLahir: document.getElementById('tempatLahir')?.value?.trim() || '',
        tanggalLahir: document.getElementById('tanggalLahir')?.value || '',
        jenisKelamin: document.getElementById('jenisKelamin')?.value || '',
        alamat: document.getElementById('alamat')?.value?.trim() || '',
        noKK: document.getElementById('noKK')?.value?.trim() || '',
        namaAyah: document.getElementById('namaAyah')?.value?.trim() || '',
        nikAyah: document.getElementById('nikAyah')?.value?.trim() || '',
        namaIbu: document.getElementById('namaIbu')?.value?.trim() || '',
        nikIbu: document.getElementById('nikIbu')?.value?.trim() || '',
        asalTK: document.getElementById('asalTK')?.value?.trim() || '',
        jalur: document.getElementById('jalurPendaftaran')?.value || ''
    };
    
    // Validasi
    for (const key in data) {
        if (!data[key]) {
            showFormMessage('Semua field wajib diisi!', 'error');
            return;
        }
    }
    
    // Validasi NIK dan No KK (16 digit)
    if (!/^\d{16}$/.test(data.nik) || !/^\d{16}$/.test(data.nikAyah) || 
        !/^\d{16}$/.test(data.nikIbu) || !/^\d{16}$/.test(data.noKK)) {
        showFormMessage('NIK dan No KK harus 16 digit angka!', 'error');
        return;
    }
    
    const submitBtn = document.querySelector('#formPendaftaran button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    }
    
    try {
        showFormMessage('Mengirim data...', 'info');
        
        const params = new URLSearchParams();
        params.append('action', 'addPendaftaran');
        Object.keys(data).forEach(key => params.append(key, data[key]));
        
        const response = await fetch(`${SCRIPT_URL}?${params.toString()}`);
        const result = await response.json();
        
        console.log('Hasil submit:', result);
        
        if (result.success) {
            showFormMessage('✅ Pendaftaran berhasil!', 'success');
            if (document.getElementById('formPendaftaran')) {
                document.getElementById('formPendaftaran').reset();
            }
            
            // Refresh semua data
            tampilkanKuota();
            tampilkanPendaftaran();
            tampilkanRekapLengkap();
        } else {
            showFormMessage('❌ ' + (result.message || 'Gagal mendaftar'), 'error');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showFormMessage('❌ Gagal mendaftar. Silakan coba lagi.', 'error');
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Daftar Sekarang';
        }
    }
}

// ============================================
// 9. INISIALISASI
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 SPMB Initialized');
    console.log('📡 Script URL:', SCRIPT_URL);
    
    // Cek apakah semua element ada
    const requiredElements = [
        'kuotaTableBody',
        'pendaftaranTableBody',
        'paginationContainer',
        'sisaKuotaBesar',
        'detailKuota'
    ];
    
    let allFound = true;
    requiredElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.warn(`⚠️ Element #${id} tidak ditemukan di HTML`);
            allFound = false;
        }
    });
    
    if (!allFound) {
        console.error('❌ Ada element HTML yang hilang! Periksa kembali HTML Anda.');
    }
    
    // Load semua data
    tampilkanKuota();
    tampilkanPendaftaran();
    tampilkanRekapLengkap();
    
    // Auto refresh setiap 60 detik
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }
    
    autoRefreshInterval = setInterval(() => {
        console.log('🔄 Auto refresh...');
        tampilkanKuota();
        tampilkanPendaftaran();
        tampilkanRekapLengkap();
    }, 60000);
    
    // Enter key untuk cek pendaftaran
    const nikInput = document.getElementById('nikCari');
    if (nikInput) {
        nikInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') cekPendaftaran();
        });
    }
    
    console.log('✅ SPMB siap digunakan!');
});
