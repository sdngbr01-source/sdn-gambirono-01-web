// ============ KONFIGURASI ============
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxBQ1uIEL1DA9IfHkKqvWEFRI0idRw0ys73pAz_wdhxVUB04HuLcDquf4rb36RrNRNJ/exec';
const PASSWORD = '20524756';

// Variabel global
let dataSiswaGlobal = [];
let dataJumlahSiswaGlobal = [];
let dataMutasiGlobal = [];
let siswaDitemukan = null;

// ============ FUNGSI UTILITY ============

// Helper: Sembunyikan 4 angka terakhir NIK
function hideNIK(nik) {
    if (!nik || nik === '' || nik === '-') return '-';
    const str = String(nik).trim();
    if (str.length <= 4) return 'xxxx';
    return str.slice(0, -4) + 'xxxx';
}

// Helper: Highlight text
function highlightText(text, search) {
    if (!text || !search) return text || '-';
    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Helper: Format angka (0 jadi -)
function formatAngka(value) {
    const num = parseInt(value) || 0;
    return num === 0 ? '-' : num;
}

// Helper: Format angka dengan bold
function formatAngkaBold(value) {
    const num = parseInt(value) || 0;
    return num === 0 ? '-' : `<strong>${num}</strong>`;
}

// Helper: Format tanggal ke DD/MM/YYYY
function formatTanggal(tanggal) {
    if (!tanggal) return '-';
    
    try {
        // Jika format ISO (2024-01-15T17:00:00.000Z)
        if (typeof tanggal === 'string' && tanggal.includes('T')) {
            const date = new Date(tanggal);
            if (!isNaN(date.getTime())) {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            }
        }
        
        // Jika format YYYY-MM-DD
        if (typeof tanggal === 'string' && tanggal.match(/^\d{4}-\d{2}-\d{2}/)) {
            const parts = tanggal.split('-');
            if (parts.length === 3) {
                return `${parts[2]}/${parts[1]}/${parts[0]}`;
            }
        }
        
        // Jika format DD/MM/YYYY
        if (typeof tanggal === 'string' && tanggal.match(/^\d{2}\/\d{2}\/\d{4}/)) {
            return tanggal;
        }
        
        // Jika format DD-MM-YYYY
        if (typeof tanggal === 'string' && tanggal.match(/^\d{2}-\d{2}-\d{4}/)) {
            const parts = tanggal.split('-');
            return `${parts[0]}/${parts[1]}/${parts[2]}`;
        }
        
        return tanggal;
    } catch (e) {
        return tanggal;
    }
}

// ============ FUNGSI AMBIL DATA ============

// Ambil data dari sheet tertentu
async function fetchDataFromSheet(sheetName) {
    try {
        const url = `${APPS_SCRIPT_URL}?sheet=${encodeURIComponent(sheetName)}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.error) {
            console.error('Error from Apps Script:', result.error);
            return [];
        }
        
        console.log(`✅ Data dari sheet "${sheetName}": ${result.total} baris`);
        return result.data || [];
    } catch (error) {
        console.error(`Error fetching sheet ${sheetName}:`, error);
        return [];
    }
}

// Ambil semua data sekaligus
async function fetchAllData() {
    try {
        const response = await fetch(`${APPS_SCRIPT_URL}?action=getAll`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        if (result.error) {
            console.error('Error from Apps Script:', result.error);
            return;
        }
        
        if (result.data_siswa) {
            dataSiswaGlobal = result.data_siswa.data || [];
            console.log(`✅ Data siswa: ${dataSiswaGlobal.length} baris`);
        }
        
        if (result.jumlah_siswa) {
            dataJumlahSiswaGlobal = result.jumlah_siswa.data || [];
            console.log(`✅ Data jumlah siswa: ${dataJumlahSiswaGlobal.length} baris`);
        }
        
        if (result.mutasi) {
            dataMutasiGlobal = result.mutasi.data || [];
            console.log(`✅ Data mutasi: ${dataMutasiGlobal.length} baris`);
        }
        
        // Tampilkan data
        await tampilkanJumlahSiswa();
        await loadHistoryMutasi();
        
    } catch (error) {
        console.error('Error fetching all data:', error);
        showError('Gagal memuat data. Silakan coba lagi.');
    }
}

// Ambil data detail siswa
async function getDetailSiswa() {
    if (dataSiswaGlobal.length > 0) return dataSiswaGlobal;
    
    const data = await fetchDataFromSheet('data_siswa');
    if (data.length > 0) {
        dataSiswaGlobal = data;
    }
    return dataSiswaGlobal;
}

// Ambil data jumlah siswa
async function getJumlahSiswa() {
    if (dataJumlahSiswaGlobal.length > 0) return dataJumlahSiswaGlobal;
    
    const data = await fetchDataFromSheet('jumlah_siswa');
    if (data.length > 0) {
        dataJumlahSiswaGlobal = data;
    }
    return dataJumlahSiswaGlobal;
}

// ============ TAMPILKAN TABEL JUMLAH SISWA ============

async function tampilkanJumlahSiswa() {
    const tbody = document.getElementById('jumlahSiswaBody');
    if (!tbody) return;
    
    tbody.innerHTML = '<tr><td colspan="10" class="loading-text"><i class="fas fa-spinner fa-spin"></i> Memuat data...</td></tr>';
    
    const dataJumlah = await getJumlahSiswa();
    
    if (dataJumlah.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="no-data">⚠️ Tidak ada data. Pastikan Apps Script URL sudah benar dan spreadsheet sudah diisi.</td></tr>';
        return;
    }
    
    // Urutan kelas
    const kelasUrutan = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B', 'TOTAL'];
    
    // Sort data
    const sortedData = [...dataJumlah].sort((a, b) => {
        return kelasUrutan.indexOf(a.kelas) - kelasUrutan.indexOf(b.kelas);
    });
    
    let rowsHtml = '';
    sortedData.forEach(item => {
        rowsHtml += `
            <tr>
                <td><strong>${item.kelas}</strong></td>
                <td>${formatAngka(item.laki)}</td>
                <td>${formatAngka(item.perempuan)}</td>
                <td>${formatAngka(item.mml)}</td>
                <td>${formatAngka(item.mmp)}</td>
                <td>${formatAngka(item.mkl)}</td>
                <td>${formatAngka(item.mkp)}</td>
                <td>${formatAngkaBold(item.jmll)}</td>
                <td>${formatAngkaBold(item.jmlp)}</td>
                <td>${formatAngkaBold(item.total)}</td>
            </tr>
        `;
    });
    
    tbody.innerHTML = rowsHtml;
    
    console.log(`✅ Data jumlah siswa dimuat: ${sortedData.length} baris dari spreadsheet`);
}

// ============ FUNGSI PENCARIAN SISWA ============

async function cariSiswa() {
    const kelas = document.getElementById('filterKelas')?.value || '';
    const nama = document.getElementById('filterNama')?.value?.toLowerCase() || '';
    const nis = document.getElementById('filterNIS')?.value || '';
    
    const container = document.getElementById('hasilSiswa');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-text"><i class="fas fa-spinner fa-spin"></i> Mencari data...</div>';
    
    try {
        const data = await getDetailSiswa();
        
        if (data.length === 0) {
            container.innerHTML = `<div class="no-data"><i class="fas fa-exclamation-circle"></i> Tidak ada data siswa ditemukan</div>`;
            return;
        }
        
        // Filter data
        let filtered = data;
        
        if (kelas) {
            filtered = filtered.filter(s => s.kelas === kelas);
        }
        
        if (nama) {
            filtered = filtered.filter(s => s.nama?.toLowerCase().includes(nama));
        }
        
        if (nis) {
            filtered = filtered.filter(s => s.nis === nis || s.nisn === nis);
        }
        
        if (filtered.length === 0) {
            container.innerHTML = `<div class="no-data"><i class="fas fa-search"></i> Tidak ada siswa yang ditemukan dengan kriteria tersebut</div>`;
            return;
        }
        
        // Tampilkan hasil
        let html = `
            <div class="statistik-kelas">
                <div class="stat-item"><i class="fas fa-users"></i> Total Siswa: <span>${filtered.length}</span></div>
                <div class="stat-item"><i class="fas fa-male"></i> Laki-laki: <span>${filtered.filter(s => s.jenisKelamin === 'L' || s.jenisKelamin === 'Laki-laki').length}</span></div>
                <div class="stat-item"><i class="fas fa-female"></i> Perempuan: <span>${filtered.filter(s => s.jenisKelamin === 'P' || s.jenisKelamin === 'Perempuan').length}</span></div>
            </div>
            <div class="table-wrapper">
                <table class="tabel-siswa">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>NIS</th>
                            <th>NISN</th>
                            <th>NIK</th>
                            <th>Kelas</th>
                            <th>JK</th>
                            <th>Tempat Lahir</th>
                            <th>Tanggal Lahir</th>
                            <th>Nama Ayah</th>
                            <th>NIK Ayah</th>
                            <th>Nama Ibu</th>
                            <th>NIK Ibu</th>
                            <th>No. Telepon</th>
                            <th>Alamat</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        filtered.forEach((siswa, index) => {
            // Sembunyikan NIK
            const nik = hideNIK(siswa.nik);
            const nikAyah = hideNIK(siswa.nikAyah);
            const nikIbu = hideNIK(siswa.nikIbu);
            
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${highlightText(siswa.nama, nama)}</td>
                    <td>${siswa.nis || '-'}</td>
                    <td>${siswa.nisn || '-'}</td>
                    <td>${nik}</td>
                    <td>${siswa.kelas || '-'}</td>
                    <td>${siswa.jenisKelamin || '-'}</td>
                    <td>${siswa.tempatLahir || '-'}</td>
                    <td>${siswa.tanggalLahir || '-'}</td>
                    <td>${siswa.namaAyah || '-'}</td>
                    <td>${nikAyah}</td>
                    <td>${siswa.namaIbu || '-'}</td>
                    <td>${nikIbu}</td>
                    <td>${siswa.nomorTelepon || '-'}</td>
                    <td>${siswa.alamat || '-'}</td>
                    <td><span class="status-badge ${siswa.keterangan?.toLowerCase() || ''}">${siswa.keterangan || 'Aktif'}</span></td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        container.innerHTML = html;
        
    } catch (error) {
        console.error('Error searching siswa:', error);
        container.innerHTML = `<div class="no-data"><i class="fas fa-exclamation-triangle"></i> Error: ${error.message}</div>`;
    }
}

// ============ FUNGSI RESET DAN CLEAR ============

function resetFilter() {
    const kelas = document.getElementById('filterKelas');
    const nama = document.getElementById('filterNama');
    const nis = document.getElementById('filterNIS');
    const container = document.getElementById('hasilSiswa');
    
    if (kelas) kelas.value = '';
    if (nama) nama.value = '';
    if (nis) nis.value = '';
    
    if (container) {
        container.innerHTML = `
            <p class="info-text"><i class="fas fa-info-circle"></i> Pilih kelas, ketik nama siswa, atau NIS/NISN untuk mencari data</p>
        `;
    }
    
    // Sembunyikan tombol clear
    const btnClearNama = document.getElementById('btnClearNama');
    const btnClearNIS = document.getElementById('btnClearNIS');
    if (btnClearNama) btnClearNama.style.display = 'none';
    if (btnClearNIS) btnClearNIS.style.display = 'none';
}

function clearNamaFilter() {
    const input = document.getElementById('filterNama');
    const btn = document.getElementById('btnClearNama');
    if (input) input.value = '';
    if (btn) btn.style.display = 'none';
}

function clearNISFilter() {
    const input = document.getElementById('filterNIS');
    const btn = document.getElementById('btnClearNIS');
    if (input) input.value = '';
    if (btn) btn.style.display = 'none';
}

function showError(message) {
    const tbody = document.getElementById('jumlahSiswaBody');
    if (tbody) {
        tbody.innerHTML = `<tr><td colspan="10" class="no-data">⚠️ ${message}</td></tr>`;
    }
}

// ============ MUTASI SISWA ============

// ============ SWITCH TAB ============
function switchTab(tab) {
    // Update tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tab) {
            btn.classList.add('active');
        }
    });
    
    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    const targetTab = document.getElementById(`tab-${tab}`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Reset results
    if (tab === 'keluar') {
        const hasilCari = document.getElementById('mk_hasilCari');
        const formMutasi = document.getElementById('mk_formMutasi');
        const result = document.getElementById('mk_result');
        
        if (hasilCari) hasilCari.innerHTML = '';
        if (formMutasi) formMutasi.style.display = 'none';
        if (result) result.style.display = 'none';
        
        // Reset siswaDitemukan
        siswaDitemukan = null;
    }
}

// ============ TOGGLE FORM BERDASARKAN DROPDOWN ============
function toggleMutasiForm() {
    const jenis = document.getElementById('jenisMutasi');
    if (!jenis) return;
    
    const jenisValue = jenis.value;
    
    // Sembunyikan semua form
    const formMasuk = document.getElementById('form-mutasi-masuk');
    const formKeluar = document.getElementById('form-mutasi-keluar');
    
    if (formMasuk) formMasuk.style.display = 'none';
    if (formKeluar) formKeluar.style.display = 'none';
    
    // Reset hasil
    const mmResult = document.getElementById('mm_result');
    const mkHasilCari = document.getElementById('mk_hasilCari');
    const mkFormMutasi = document.getElementById('mk_formMutasi');
    const mkResult = document.getElementById('mk_result');
    
    if (mmResult) mmResult.style.display = 'none';
    if (mkHasilCari) mkHasilCari.innerHTML = '';
    if (mkFormMutasi) mkFormMutasi.style.display = 'none';
    if (mkResult) mkResult.style.display = 'none';
    
    // Tampilkan form sesuai pilihan
    if (jenisValue === 'masuk') {
        if (formMasuk) {
            formMasuk.style.display = 'block';
            // Reset form
            const form = document.getElementById('formMutasiMasuk');
            if (form) {
                form.reset();
                document.querySelectorAll('#formMutasiMasuk .form-control').forEach(el => {
                    el.classList.remove('error');
                });
            }
        }
    } else if (jenisValue === 'keluar') {
        if (formKeluar) {
            formKeluar.style.display = 'block';
            // Reset form
            const cariNama = document.getElementById('mk_cariNama');
            const cariNIS = document.getElementById('mk_cariNIS');
            const sekolahTujuan = document.getElementById('mk_sekolahTujuan');
            const alamatTujuan = document.getElementById('mk_alamatTujuan');
            const password = document.getElementById('mk_password');
            
            if (cariNama) cariNama.value = '';
            if (cariNIS) cariNIS.value = '';
            if (sekolahTujuan) sekolahTujuan.value = '';
            if (alamatTujuan) alamatTujuan.value = '';
            if (password) password.value = '';
            
            siswaDitemukan = null;
        }
    }
}

// ============ MUTASI MASUK ============
async function submitMutasiMasuk() {
    // Ambil semua elemen form
    const elements = {
        nama: document.getElementById('mm_nama'),
        nis: document.getElementById('mm_nis'),
        nisn: document.getElementById('mm_nisn'),
        nik: document.getElementById('mm_nik'),
        kelas: document.getElementById('mm_kelas'),
        jk: document.getElementById('mm_jk'),
        tempatLahir: document.getElementById('mm_tempatLahir'),
        tanggalLahir: document.getElementById('mm_tanggalLahir'),
        sekolah: document.getElementById('mm_sekolah'),
        namaAyah: document.getElementById('mm_namaAyah'),
        nikAyah: document.getElementById('mm_nikAyah'),
        namaIbu: document.getElementById('mm_namaIbu'),
        nikIbu: document.getElementById('mm_nikIbu'),
        telepon: document.getElementById('mm_telepon'),
        alamat: document.getElementById('mm_alamat'),
        password: document.getElementById('mm_password')
    };
    
    const resultDiv = document.getElementById('mm_result');
    if (!resultDiv) return;
    
    // Validasi elemen form
    for (let key in elements) {
        if (!elements[key]) {
            resultDiv.style.display = 'block';
            resultDiv.className = 'mutasi-result error';
            resultDiv.innerHTML = `<i class="fas fa-exclamation-circle result-icon"></i> Elemen form tidak lengkap!`;
            return;
        }
    }
    
    // Ambil nilai jenis kelamin dari form dan konversi ke L/P
    let jenisKelaminValue = elements.jk.value;
    
    // Konversi ke L/P saja (untuk disimpan ke spreadsheet)
    let jenisKelaminConverted = '';
    if (jenisKelaminValue === 'Laki-laki' || jenisKelaminValue === 'L' || jenisKelaminValue === 'laki-laki') {
        jenisKelaminConverted = 'L';
    } else if (jenisKelaminValue === 'Perempuan' || jenisKelaminValue === 'P' || jenisKelaminValue === 'perempuan') {
        jenisKelaminConverted = 'P';
    } else {
        jenisKelaminConverted = jenisKelaminValue; // fallback
    }
    
    // Ambil data dari form - SEMUA DATA DIKONVERSI KE STRING
    const data = {
        nama: String(elements.nama.value).trim(),
        nis: String(elements.nis.value).trim(),
        nisn: String(elements.nisn.value).trim(),
        nik: String(elements.nik.value).trim(),
        kelas: String(elements.kelas.value).trim(),
        jenisKelamin: String(jenisKelaminConverted).trim(),
        tempatLahir: String(elements.tempatLahir.value).trim(),
        tanggalLahir: String(elements.tanggalLahir.value).trim(),
        sekolah: String(elements.sekolah.value).trim(),
        namaAyah: String(elements.namaAyah.value).trim(),
        nikAyah: String(elements.nikAyah.value).trim(),
        namaIbu: String(elements.namaIbu.value).trim(),
        nikIbu: String(elements.nikIbu.value).trim(),
        nomorTelepon: String(elements.telepon.value).trim(),
        alamat: String(elements.alamat.value).trim(),
        password: String(elements.password.value).trim()
    };
    
    // Validasi form
    let isValid = true;
    for (let key in data) {
        if (key !== 'password' && !data[key]) {
            isValid = false;
            const el = elements[key === 'jenisKelamin' ? 'jk' : key];
            if (el) el.classList.add('error');
        }
    }
    
    if (!isValid) {
        resultDiv.style.display = 'block';
        resultDiv.className = 'mutasi-result error';
        resultDiv.innerHTML = `<i class="fas fa-exclamation-circle result-icon"></i> Harap isi semua field yang wajib diisi!`;
        return;
    }
    
    // Validasi kata kunci
    if (data.password !== PASSWORD) {
        resultDiv.style.display = 'block';
        resultDiv.className = 'mutasi-result error';
        resultDiv.innerHTML = `<i class="fas fa-lock result-icon"></i> Kata kunci salah!`;
        elements.password.classList.add('error');
        return;
    }
    
    // Hapus password sebelum dikirim
    delete data.password;
    
    // Tampilkan loading
    resultDiv.style.display = 'block';
    resultDiv.className = 'mutasi-result';
    resultDiv.innerHTML = `<i class="fas fa-spinner fa-spin result-icon"></i> Mengirim data mutasi masuk...`;
    
    try {
        // Kirim data ke Apps Script
        await fetch(`${APPS_SCRIPT_URL}?action=mutasi_masuk`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // Success
        resultDiv.className = 'mutasi-result success';
        resultDiv.innerHTML = `
            <i class="fas fa-check-circle result-icon"></i> 
            <strong>Mutasi Masuk Berhasil!</strong><br>
            Siswa <strong>${data.nama}</strong> dengan NIS <strong>${data.nis}</strong> telah ditambahkan ke kelas ${data.kelas}.<br>
            <small>Asal Sekolah: ${data.sekolah}</small>
            <br><br>
            <small>Data telah disimpan di spreadsheet.</small>
        `;
        
        // Reset form
        const form = document.getElementById('formMutasiMasuk');
        if (form) {
            form.reset();
            document.querySelectorAll('#formMutasiMasuk .form-control').forEach(el => {
                el.classList.remove('error');
            });
        }
        
        // Refresh data setelah 2 detik
        setTimeout(() => {
            fetchAllData();
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        resultDiv.className = 'mutasi-result error';
        resultDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle result-icon"></i> 
            <strong>Gagal!</strong> ${error.message}
            <br><br>
            <small>Periksa koneksi internet dan coba lagi.</small>
        `;
    }
}

// ============ MUTASI KELUAR - CARI SISWA ============
async function cariSiswaMutasi() {
    const namaInput = document.getElementById('mk_cariNama');
    const nisInput = document.getElementById('mk_cariNIS');
    const resultDiv = document.getElementById('mk_hasilCari');
    
    if (!namaInput || !nisInput || !resultDiv) return;
    
    const nama = namaInput.value.trim();
    const nis = nisInput.value.trim();
    
    if (!nama && !nis) {
        resultDiv.innerHTML = `<div class="mutasi-result error"><i class="fas fa-exclamation-circle result-icon"></i> Masukkan nama atau NIS untuk mencari!</div>`;
        return;
    }
    
    resultDiv.innerHTML = `<div class="mutasi-result"><i class="fas fa-spinner fa-spin result-icon"></i> Mencari data siswa...</div>`;
    
    try {
        const dataSiswa = await getDetailSiswa();
        
        if (!dataSiswa || dataSiswa.length === 0) {
            resultDiv.className = 'mutasi-result error';
            resultDiv.innerHTML = `<i class="fas fa-exclamation-circle result-icon"></i> Belum ada data siswa!`;
            return;
        }
        
        // Cari siswa
        let found = null;
        if (nama) {
            found = dataSiswa.find(s => s.nama && s.nama.toLowerCase() === nama.toLowerCase());
        } else if (nis) {
            found = dataSiswa.find(s => s.nis === nis);
        }
        
        if (!found) {
            resultDiv.className = 'mutasi-result error';
            resultDiv.innerHTML = `
                <i class="fas fa-user-slash result-icon"></i> 
                Siswa dengan <strong>${nama || nis}</strong> tidak ditemukan.
            `;
            const formMutasi = document.getElementById('mk_formMutasi');
            if (formMutasi) formMutasi.style.display = 'none';
            return;
        }
        
        // Cek status siswa
        if (found.keterangan && found.keterangan.toLowerCase() === 'mutasi keluar') {
            resultDiv.className = 'mutasi-result error';
            resultDiv.innerHTML = `
                <i class="fas fa-exclamation-triangle result-icon"></i> 
                Siswa <strong>${found.nama}</strong> sudah dimutasikan keluar.
            `;
            const formMutasi = document.getElementById('mk_formMutasi');
            if (formMutasi) formMutasi.style.display = 'none';
            return;
        }
        
        // Simpan data siswa yang ditemukan
        siswaDitemukan = found;
        
        // Tampilkan informasi siswa
        resultDiv.className = 'mutasi-result success';
        resultDiv.innerHTML = `
            <i class="fas fa-check-circle result-icon"></i> 
            <strong>Siswa Ditemukan!</strong>
            <div class="student-info-card">
                <div class="info-item">
                    <div class="label">Nama</div>
                    <div class="value">${found.nama || '-'}</div>
                </div>
                <div class="info-item">
                    <div class="label">NIS</div>
                    <div class="value">${found.nis || '-'}</div>
                </div>
                <div class="info-item">
                    <div class="label">Kelas</div>
                    <div class="value">${found.kelas || '-'}</div>
                </div>
                <div class="info-item">
                    <div class="label">Status</div>
                    <div class="value"><span class="status-badge ${found.keterangan?.toLowerCase() || 'aktif'}">${found.keterangan || 'Aktif'}</span></div>
                </div>
            </div>
            <p style="margin-top: 10px; color: #155724;">Silakan isi form di bawah untuk melanjutkan mutasi keluar.</p>
        `;
        
        // Tampilkan form mutasi keluar
        const formMutasi = document.getElementById('mk_formMutasi');
        const sekolahTujuan = document.getElementById('mk_sekolahTujuan');
        const alamatTujuan = document.getElementById('mk_alamatTujuan');
        const password = document.getElementById('mk_password');
        const result = document.getElementById('mk_result');
        
        if (formMutasi) formMutasi.style.display = 'block';
        if (sekolahTujuan) sekolahTujuan.value = '';
        if (alamatTujuan) alamatTujuan.value = '';
        if (password) password.value = '';
        if (result) result.style.display = 'none';
        
    } catch (error) {
        console.error('Error:', error);
        resultDiv.className = 'mutasi-result error';
        resultDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle result-icon"></i> 
            Error: ${error.message}
        `;
    }
}

// ============ MUTASI KELUAR - SUBMIT ============
async function submitMutasiKeluar() {
    if (!siswaDitemukan) {
        alert('Silakan cari siswa terlebih dahulu!');
        return;
    }
    
    const sekolahTujuan = document.getElementById('mk_sekolahTujuan');
    const alamatTujuan = document.getElementById('mk_alamatTujuan');
    const passwordInput = document.getElementById('mk_password');
    const resultDiv = document.getElementById('mk_result');
    
    if (!sekolahTujuan || !alamatTujuan || !passwordInput || !resultDiv) return;
    
    const sekolahValue = sekolahTujuan.value.trim();
    const alamatValue = alamatTujuan.value.trim();
    const passwordValue = passwordInput.value.trim();
    
    // Validasi
    if (!sekolahValue) {
        resultDiv.style.display = 'block';
        resultDiv.className = 'mutasi-result error';
        resultDiv.innerHTML = `<i class="fas fa-exclamation-circle result-icon"></i> Harap isi Sekolah Tujuan!`;
        return;
    }
    
    if (!alamatValue) {
        resultDiv.style.display = 'block';
        resultDiv.className = 'mutasi-result error';
        resultDiv.innerHTML = `<i class="fas fa-exclamation-circle result-icon"></i> Harap isi Alamat Sekolah Tujuan!`;
        return;
    }
    
    // Validasi kata kunci
    if (passwordValue !== PASSWORD) {
        resultDiv.style.display = 'block';
        resultDiv.className = 'mutasi-result error';
        resultDiv.innerHTML = `<i class="fas fa-lock result-icon"></i> Kata kunci salah!`;
        passwordInput.classList.add('error');
        return;
    }
    
    // Siapkan data
    const today = new Date();
    const tanggalKeluar = String(today.getDate()).padStart(2, '0') + '/' + 
                         String(today.getMonth() + 1).padStart(2, '0') + '/' + 
                         today.getFullYear();
    
    const data = {
        nis: siswaDitemukan.nis,
        nama: siswaDitemukan.nama,
        sekolahTujuan: sekolahValue,
        alamatTujuan: alamatValue,
        tanggalKeluar: tanggalKeluar
    };
    
    // Tampilkan loading
    resultDiv.style.display = 'block';
    resultDiv.className = 'mutasi-result';
    resultDiv.innerHTML = `<i class="fas fa-spinner fa-spin result-icon"></i> Memproses mutasi keluar...`;
    
    try {
        // Kirim data ke Apps Script
        await fetch(`${APPS_SCRIPT_URL}?action=mutasi_keluar`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // Success
        resultDiv.className = 'mutasi-result success';
        resultDiv.innerHTML = `
            <i class="fas fa-check-circle result-icon"></i> 
            <strong>Mutasi Keluar Berhasil!</strong><br>
            Siswa <strong>${data.nama}</strong> dengan NIS <strong>${data.nis}</strong> telah dimutasikan ke:<br>
            <strong>${data.sekolahTujuan}</strong><br>
            <small>Tanggal Mutasi: ${data.tanggalKeluar}</small>
            <br><br>
            <small class="help-text">* Refresh halaman untuk melihat perubahan data</small>
        `;
        
        // Reset form
        sekolahTujuan.value = '';
        alamatTujuan.value = '';
        passwordInput.value = '';
        passwordInput.classList.remove('error');
        
        const formMutasi = document.getElementById('mk_formMutasi');
        if (formMutasi) formMutasi.style.display = 'none';
        
        siswaDitemukan = null;
        
        // Refresh data setelah 2 detik
        setTimeout(() => {
            fetchAllData();
            const hasilCari = document.getElementById('mk_hasilCari');
            if (hasilCari) hasilCari.innerHTML = '';
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        resultDiv.className = 'mutasi-result error';
        resultDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle result-icon"></i> 
            <strong>Gagal!</strong> ${error.message}
            <br><br>
            <small>Periksa koneksi internet dan coba lagi.</small>
        `;
    }
}

// ============ LOAD HISTORY MUTASI ============
async function loadHistoryMutasi() {
    const tbody = document.getElementById('historyMutasiBody');
    if (!tbody) {
        console.warn('⚠️ Elemen historyMutasiBody tidak ditemukan');
        return;
    }
    
    tbody.innerHTML = '<tr><td colspan="7" class="loading-text"><i class="fas fa-spinner fa-spin"></i> Memuat history...</td></tr>';
    
    try {
        const dataSiswa = await getDetailSiswa();
        
        if (!dataSiswa || dataSiswa.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="no-data">📭 Belum ada data siswa</td></tr>';
            return;
        }
        
        // Filter siswa yang memiliki keterangan mutasi
        const mutasiData = dataSiswa.filter(s => {
            const keterangan = (s.keterangan || '').toLowerCase().trim();
            return keterangan === 'mutasi masuk' || keterangan === 'mutasi keluar';
        });
        
        if (mutasiData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="no-data">📭 Belum ada history mutasi</td></tr>';
            return;
        }
        
        // Sorting dari terbaru ke terlama (berdasarkan Tanggal)
        mutasiData.sort((a, b) => {
            const dateA = a.Tanggal || a.tanggal || '';
            const dateB = b.Tanggal || b.tanggal || '';
            
            const parseDateNumber = (dateStr) => {
                if (!dateStr) return 0;
                
                // Format YYYY-MM-DD
                if (typeof dateStr === 'string' && dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/)) {
                    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
                    return parseInt(match[1]) * 10000 + parseInt(match[2]) * 100 + parseInt(match[3]);
                }
                // Format DD/MM/YYYY
                if (typeof dateStr === 'string' && dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})/)) {
                    const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
                    return parseInt(match[3]) * 10000 + parseInt(match[2]) * 100 + parseInt(match[1]);
                }
                // Format DD-MM-YYYY
                if (typeof dateStr === 'string' && dateStr.match(/^(\d{2})-(\d{2})-(\d{4})/)) {
                    const match = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})/);
                    return parseInt(match[3]) * 10000 + parseInt(match[2]) * 100 + parseInt(match[1]);
                }
                return 0;
            };
            
            const numA = parseDateNumber(dateA);
            const numB = parseDateNumber(dateB);
            
            if (numA > 0 && numB > 0) return numB - numA; // Terbaru dulu
            if (numA > 0 && numB === 0) return -1;
            if (numA === 0 && numB > 0) return 1;
            return 0;
        });
        
        let html = '';
        mutasiData.forEach((siswa, index) => {
            const jenisMutasi = siswa.keterangan || '';
            const jenisLower = jenisMutasi.toLowerCase();
            
            const nama = siswa.nama || '-';
            const nisn = siswa.nisn || '-';
            const kelas = siswa.kelas || '-';
            let sekolah = siswa.Sekolah || siswa.sekolah || '-';
            let tanggal = siswa.Tanggal || siswa.tanggal || '-';
            
            // Format tanggal ke DD/MM/YYYY
            tanggal = formatTanggal(tanggal);
            
            html += `
                <tr>
                    <td><strong>${index + 1}</strong></td>
                    <td><strong>${nama}</strong></td>
                    <td>${nisn}</td>
                    <td>${kelas}</td>
                    <td>
                        <span class="status-badge ${jenisLower === 'mutasi masuk' ? 'mutasi-masuk' : 'mutasi-keluar'}">
                            <i class="fas ${jenisLower === 'mutasi masuk' ? 'fa-sign-in-alt' : 'fa-sign-out-alt'}"></i>
                            ${jenisMutasi}
                        </span>
                    </td>
                    <td>${sekolah}</td>
                    <td>${tanggal}</td>
                </tr>
            `;
        });
        
        tbody.innerHTML = html;
        console.log(`✅ History mutasi dimuat: ${mutasiData.length} data`);
        
    } catch (error) {
        console.error('❌ Error loading history:', error);
        tbody.innerHTML = `<tr><td colspan="7" class="no-data">⚠️ Gagal memuat history: ${error.message}</td></tr>`;
    }
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Memuat data...');
    console.log('📡 URL Apps Script:', APPS_SCRIPT_URL);
    
    // Load data
    fetchAllData();
    
    // Event listener untuk filter
    const filterNama = document.getElementById('filterNama');
    const filterNIS = document.getElementById('filterNIS');
    const filterKelas = document.getElementById('filterKelas');
    
    if (filterNama) {
        filterNama.addEventListener('input', function() {
            const btn = document.getElementById('btnClearNama');
            if (btn) btn.style.display = this.value ? 'block' : 'none';
        });
    }
    
    if (filterNIS) {
        filterNIS.addEventListener('input', function() {
            const btn = document.getElementById('btnClearNIS');
            if (btn) btn.style.display = this.value ? 'block' : 'none';
        });
    }
    
    // Enter key untuk search
    [filterNama, filterNIS, filterKelas].forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    cariSiswa();
                }
            });
        }
    });
    
    console.log('✅ Aplikasi siap digunakan');
});