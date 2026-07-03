// ============================================
// MAIN JAVASCRIPT - SDN GAMBIRONO 01
// ============================================

// Toggle Mobile Menu
function toggleMenu() {
    const menu = document.getElementById('navbarMenu');
    menu.classList.toggle('active');
    
    // Change icon
    const icon = document.querySelector('.navbar-toggle i');
    if (menu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Close menu when clicking a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const menu = document.getElementById('navbarMenu');
            menu.classList.remove('active');
            
            const icon = document.querySelector('.navbar-toggle i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-menu a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
        
        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
});

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Change profil image
function changeImage(src) {
    const mainImage = document.getElementById('mainProfilImage');
    mainImage.src = src;
    
    // Update active thumbnail
    const thumbs = document.querySelectorAll('.profil-thumbnails .thumb');
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    event.target.classList.add('active');
}

// Filter Guru
function filterGuru(kategori) {
    const cards = document.querySelectorAll('.guru-card');
    const buttons = document.querySelectorAll('.guru-filters .filter-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter cards
    cards.forEach(card => {
        if (kategori === 'all') {
            card.style.display = 'block';
        } else {
            if (card.dataset.kategori === kategori) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Filter Galeri
function filterGaleri(kategori) {
    const items = document.querySelectorAll('.galeri-item');
    const buttons = document.querySelectorAll('.galeri-filters .filter-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter items
    items.forEach(item => {
        if (kategori === 'all') {
            item.style.display = 'block';
        } else {
            if (item.dataset.kategori === kategori) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// Lightbox for gallery
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    lightbox.style.display = 'block';
    lightboxImage.src = src;
    lightboxCaption.innerHTML = caption;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Add click event to gallery items
document.addEventListener('DOMContentLoaded', function() {
    const galeriItems = document.querySelectorAll('.galeri-item');
    galeriItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img').src;
            const caption = this.querySelector('.galeri-overlay h4').innerHTML;
            openLightbox(img, caption);
        });
    });
    
    // Close lightbox with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('SDN Gambirono 01 website loaded');
});
// ============================================
// MAIN JAVASCRIPT - SDN GAMBIRONO 01
// ============================================

// Toggle Mobile Menu
function toggleMenu() {
    const menu = document.getElementById('navbarMenu');
    menu.classList.toggle('active');
    
    // Change icon
    const icon = document.querySelector('.navbar-toggle i');
    if (menu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Close menu when clicking a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const menu = document.getElementById('navbarMenu');
            menu.classList.remove('active');
            
            const icon = document.querySelector('.navbar-toggle i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-menu a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
        
        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
});

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Change profil image
function changeImage(src) {
    const mainImage = document.getElementById('mainProfilImage');
    mainImage.src = src;
    
    // Update active thumbnail
    const thumbs = document.querySelectorAll('.profil-thumbnails .thumb');
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    event.target.classList.add('active');
}

// Filter Guru
function filterGuru(kategori) {
    const cards = document.querySelectorAll('.guru-card');
    const buttons = document.querySelectorAll('.guru-filters .filter-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter cards
    cards.forEach(card => {
        if (kategori === 'all') {
            card.style.display = 'block';
        } else {
            if (card.dataset.kategori === kategori) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Filter Galeri
function filterGaleri(kategori) {
    const items = document.querySelectorAll('.galeri-item');
    const buttons = document.querySelectorAll('.galeri-filters .filter-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter items
    items.forEach(item => {
        if (kategori === 'all') {
            item.style.display = 'block';
        } else {
            if (item.dataset.kategori === kategori) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// Lightbox for gallery
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    lightbox.style.display = 'block';
    lightboxImage.src = src;
    lightboxCaption.innerHTML = caption;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Add click event to gallery items
document.addEventListener('DOMContentLoaded', function() {
    const galeriItems = document.querySelectorAll('.galeri-item');
    galeriItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img').src;
            const caption = this.querySelector('.galeri-overlay h4').innerHTML;
            openLightbox(img, caption);
        });
    });
    
    // Close lightbox with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('SDN Gambirono 01 website loaded');
    
    // Add animation to tryout section
    const tryoutSection = document.querySelector('.tryout-tka');
    if (tryoutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(tryoutSection);
    }
    
    // ============ PANGGIL FUNGSI ABSENSI ============
    // Panggil fungsi untuk menampilkan data siswa (jika ada)
    if (typeof tampilkanJumlahSiswa === 'function') {
        tampilkanJumlahSiswa();
    }
    if (typeof setupRealTimeSearch === 'function') {
        setupRealTimeSearch();
    }
    
    // Panggil render absensi
    renderAbsensi();
    // ================================================
});
// ============ DATA SISWA - MENGGUNAKAN PROXY APPS SCRIPT ============
// Ganti dengan URL dari Apps Script yang sudah dideploy
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyILi1afr5ghuHoBJaPflne-m3ZiWw7zLds6s9WaLcfFl0szVrCSEEdYODkwkK8Kk9o/exec';

// Variabel global untuk menyimpan data
let dataSiswaGlobal = [];

// ============ FUNGSI AMBIL DATA DARI APPS SCRIPT ============

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

// Ambil data detail siswa
async function getDetailSiswa() {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec') {
        console.warn('⚠️ APPS_SCRIPT_URL belum diatur!');
        return [];
    }
    
    const data = await fetchDataFromSheet('data_siswa');
    if (data.length > 0) {
        dataSiswaGlobal = data;
    }
    return dataSiswaGlobal;
}

// ============ FUNGSI HITUNG JUMLAH SISWA ============

function hitungJumlahSiswaPerKelas(dataSiswa) {
    const jumlahPerKelas = {};
    
    dataSiswa.forEach(siswa => {
        const kelas = siswa.kelas;
        if (!kelas) return;
        
        if (!jumlahPerKelas[kelas]) {
            jumlahPerKelas[kelas] = { laki: 0, perempuan: 0, total: 0 };
        }
        
        const jk = siswa.jenisKelamin || '';
        if (jk === 'L' || jk === 'Laki-laki' || jk === 'Laki') {
            jumlahPerKelas[kelas].laki++;
        } else if (jk === 'P' || jk === 'Perempuan') {
            jumlahPerKelas[kelas].perempuan++;
        }
        
        jumlahPerKelas[kelas].total++;
    });
    
    // Convert ke array dan urutkan
    const kelasUrutan = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];
    const result = [];
    
    kelasUrutan.forEach(kelas => {
        if (jumlahPerKelas[kelas]) {
            result.push({
                kelas: kelas,
                laki: jumlahPerKelas[kelas].laki,
                perempuan: jumlahPerKelas[kelas].perempuan,
                total: jumlahPerKelas[kelas].total
            });
        }
    });
    
    return result;
}

// ============ TAMPILKAN TABEL JUMLAH SISWA ============

async function tampilkanJumlahSiswa() {
    const tbody = document.getElementById('jumlahSiswaBody');
    if (!tbody) return;
    
    tbody.innerHTML = '<tr><td colspan="4" class="loading-text"><i class="fas fa-spinner fa-spin"></i> Memuat data...</td></tr>';
    
    const dataSiswa = await getDetailSiswa();
    
    if (dataSiswa.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="no-data">⚠️ Tidak ada data siswa. Pastikan Apps Script URL sudah benar dan spreadsheet sudah diisi.</td></tr>';
        document.getElementById('totalLaki').innerHTML = '<strong>0</strong>';
        document.getElementById('totalPerempuan').innerHTML = '<strong>0</strong>';
        document.getElementById('totalSemua').innerHTML = '<strong>0</strong>';
        return;
    }
    
    const jumlahData = hitungJumlahSiswaPerKelas(dataSiswa);
    
    let totalLaki = 0;
    let totalPerempuan = 0;
    let totalSemua = 0;
    
    if (jumlahData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="no-data">Tidak ada data kelas</td></tr>';
    } else {
        tbody.innerHTML = jumlahData.map(item => {
            totalLaki += item.laki;
            totalPerempuan += item.perempuan;
            totalSemua += item.total;
            
            return `
                <tr>
                    <td><strong>${item.kelas}</strong></td>
                    <td>${item.laki}</td>
                    <td>${item.perempuan}</td>
                    <td><strong>${item.total}</strong></td>
                </tr>
            `;
        }).join('');
    }
    
    document.getElementById('totalLaki').innerHTML = `<strong>${totalLaki}</strong>`;
    document.getElementById('totalPerempuan').innerHTML = `<strong>${totalPerempuan}</strong>`;
    document.getElementById('totalSemua').innerHTML = `<strong>${totalSemua}</strong>`;
    
    console.log(`✅ Data dimuat: ${dataSiswa.length} siswa, ${jumlahData.length} kelas`);
}

// ============ FUNGSI PENCARIAN ============

function formatTanggal(tanggal) {
    if (!tanggal || tanggal === '') return '-';
    try {
        const tgl = new Date(tanggal);
        if (isNaN(tgl.getTime())) return tanggal;
        return tgl.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
        return tanggal;
    }
}

async function cariSiswa() {
    const kelas = document.getElementById('filterKelas').value;
    const namaQuery = document.getElementById('filterNama').value.trim().toLowerCase();
    const nisQuery = document.getElementById('filterNIS').value.trim().toLowerCase();
    const hasilDiv = document.getElementById('hasilSiswa');
    
    // Tampilkan/sembunyikan tombol clear
    const btnClearNama = document.getElementById('btnClearNama');
    const btnClearNIS = document.getElementById('btnClearNIS');
    if (btnClearNama) btnClearNama.style.display = namaQuery ? 'block' : 'none';
    if (btnClearNIS) btnClearNIS.style.display = nisQuery ? 'block' : 'none';
    
    if (!kelas && !namaQuery && !nisQuery) {
        hasilDiv.innerHTML = '<p class="info-text"><i class="fas fa-info-circle"></i> Pilih kelas, ketik nama siswa, atau NIS/NISN untuk mencari data</p>';
        return;
    }
    
    hasilDiv.innerHTML = '<p class="info-text"><i class="fas fa-spinner fa-spin"></i> Memuat data siswa...</p>';
    
    const semuaSiswa = await getDetailSiswa();
    
    if (semuaSiswa.length === 0) {
        hasilDiv.innerHTML = `
            <div class="no-data">
                <i class="fas fa-exclamation-triangle"></i>
                <p>⚠️ Tidak dapat mengambil data. Periksa URL Apps Script.</p>
            </div>
        `;
        return;
    }
    
    let siswaFiltered = [...semuaSiswa];
    
    if (kelas) {
        siswaFiltered = siswaFiltered.filter(siswa => siswa.kelas === kelas);
    }
    
    if (namaQuery) {
        siswaFiltered = siswaFiltered.filter(siswa => 
            siswa.nama && siswa.nama.toLowerCase().includes(namaQuery)
        );
    }
    
    if (nisQuery) {
        siswaFiltered = siswaFiltered.filter(siswa => 
            (siswa.nis && siswa.nis.toLowerCase().includes(nisQuery)) || 
            (siswa.nisn && siswa.nisn.toLowerCase().includes(nisQuery))
        );
    }
    
    console.log(`🔍 Hasil: ${siswaFiltered.length} siswa ditemukan`);
    
    if (siswaFiltered.length === 0) {
        let filterInfo = [];
        if (kelas) filterInfo.push(`kelas ${kelas}`);
        if (namaQuery) filterInfo.push(`nama "${document.getElementById('filterNama').value}"`);
        if (nisQuery) filterInfo.push(`NIS/NISN "${document.getElementById('filterNIS').value}"`);
        
        hasilDiv.innerHTML = `
            <div class="no-data">
                <i class="fas fa-user-graduate"></i>
                <p>Tidak ada data siswa untuk ${filterInfo.join(' dan ')}</p>
            </div>
        `;
        return;
    }
    
    const laki = siswaFiltered.filter(s => s.jenisKelamin === 'L' || s.jenisKelamin === 'Laki-laki').length;
    const perempuan = siswaFiltered.filter(s => s.jenisKelamin === 'P' || s.jenisKelamin === 'Perempuan').length;
    
    hasilDiv.innerHTML = `
        <div class="statistik-kelas">
            <div class="stat-item"><i class="fas fa-users"></i><span>Total: ${siswaFiltered.length}</span></div>
            <div class="stat-item"><i class="fas fa-male"></i><span>Laki-laki: ${laki}</span></div>
            <div class="stat-item"><i class="fas fa-female"></i><span>Perempuan: ${perempuan}</span></div>
            ${kelas ? `<div class="stat-item"><i class="fas fa-chalkboard"></i><span>Kelas: ${kelas}</span></div>` : ''}
        </div>
        <div class="table-wrapper">
            <table class="tabel-siswa">
                <thead><tr>
                    <th>No</th><th>Nama</th><th>NIS</th><th>NISN</th><th>NIK</th><th>Kelas</th>
                    <th>JK</th><th>Tempat Lahir</th><th>Tgl Lahir</th><th>Nama Ayah</th>
                    <th>NIK Ayah</th><th>Nama Ibu</th><th>NIK Ibu</th><th>No Telepon</th><th>Alamat</th>
                </tr></thead>
                <tbody>
                    ${siswaFiltered.map((siswa, index) => {
                        let namaDisplay = siswa.nama || '-';
                        if (namaQuery && siswa.nama && siswa.nama.toLowerCase().includes(namaQuery)) {
                            const regex = new RegExp(`(${namaQuery})`, 'gi');
                            namaDisplay = siswa.nama.replace(regex, '<span class="highlight">$1</span>');
                        }
                        return `<tr>
                            <td>${index + 1}</td>
                            <td>${namaDisplay}</td>
                            <td>${siswa.nis || '-'}</td>
                            <td>${siswa.nisn || '-'}</td>
                            <td>${siswa.nik || '-'}</td>
                            <td>${siswa.kelas || '-'}</td>
                            <td>${siswa.jenisKelamin === 'L' ? 'Laki-laki' : (siswa.jenisKelamin === 'P' ? 'Perempuan' : '-')}</td>
                            <td>${siswa.tempatLahir || '-'}</td>
                            <td>${formatTanggal(siswa.tanggalLahir)}</td>
                            <td>${siswa.namaAyah || '-'}</td>
                            <td>${siswa.nikAyah || '-'}</td>
                            <td>${siswa.namaIbu || '-'}</td>
                            <td>${siswa.nikIbu || '-'}</td>
                            <td>${siswa.nomorTelepon || siswa.noTelp || '-'}</td>
                            <td>${siswa.alamat || '-'}</td>
                        </tr>`;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Reset filter
function resetFilter() {
    document.getElementById('filterKelas').value = '';
    document.getElementById('filterNama').value = '';
    document.getElementById('filterNIS').value = '';
    document.getElementById('btnClearNama').style.display = 'none';
    document.getElementById('btnClearNIS').style.display = 'none';
    document.getElementById('hasilSiswa').innerHTML = '<p class="info-text"><i class="fas fa-info-circle"></i> Filter telah direset.</p>';
}

function clearNamaFilter() {
    document.getElementById('filterNama').value = '';
    document.getElementById('btnClearNama').style.display = 'none';
    const kelas = document.getElementById('filterKelas').value;
    const nis = document.getElementById('filterNIS').value;
    if (kelas || nis) cariSiswa();
}

function clearNISFilter() {
    document.getElementById('filterNIS').value = '';
    document.getElementById('btnClearNIS').style.display = 'none';
    const kelas = document.getElementById('filterKelas').value;
    const nama = document.getElementById('filterNama').value;
    if (kelas || nama) cariSiswa();
}

// Real time search
function setupRealTimeSearch() {
    const inputNama = document.getElementById('filterNama');
    const inputNIS = document.getElementById('filterNIS');
    const filterKelas = document.getElementById('filterKelas');
    
    let timeout;
    if (inputNama) {
        inputNama.addEventListener('input', () => {
            document.getElementById('btnClearNama').style.display = inputNama.value ? 'block' : 'none';
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (filterKelas.value || inputNama.value.trim() || inputNIS?.value) cariSiswa();
            }, 500);
        });
    }
    
    if (inputNIS) {
        inputNIS.addEventListener('input', () => {
            document.getElementById('btnClearNIS').style.display = inputNIS.value ? 'block' : 'none';
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (filterKelas.value || inputNama?.value.trim() || inputNIS.value) cariSiswa();
            }, 500);
        });
    }
    
    if (filterKelas) {
        filterKelas.addEventListener('change', () => cariSiswa());
    }
}

// ============================================
// ABSENSI SISWA - SESUAI SPREADSHEET
// ============================================

// URL Apps Script
const APPS_SCRIPT_URL_SISWA = 'https://script.google.com/macros/s/AKfycbyILi1afr5ghuHoBJaPflne-m3ZiWw7zLds6s9WaLcfFl0szVrCSEEdYODkwkK8Kk9o/exec';
const APPS_SCRIPT_URL_ABSENSI = 'https://script.google.com/macros/s/AKfycbxFB9fvp9y2P2BIJeqEdiY7wJm9DUdQ_3D74vrBXxFcpCrYUbq1JaNwk-WPBdPj6MNR/exec';

// Ambil data jumlah siswa dari sheet 'jumlah_siswa'
async function fetchJumlahSiswa() {
    try {
        const url = `${APPS_SCRIPT_URL_SISWA}?sheet=jumlah_siswa`;
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.error) {
            console.error('Error fetch jumlah siswa:', result.error);
            return [];
        }
        console.log('✅ Data jumlah siswa:', result.data);
        return result.data || [];
    } catch (error) {
        console.error('Error fetching jumlah_siswa:', error);
        return [];
    }
}

// Ambil data absensi hari ini dari sheet 'BACKUP_DATA'
// STATUS di spreadsheet: 'TEPAT WAKTU', 'TERLAMBAT', 'PULANG'
async function fetchAbsensiHariIni() {
    try {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const url = `${APPS_SCRIPT_URL_ABSENSI}?sheet=BACKUP_DATA&tanggal=${today}`;
        console.log('📡 Fetching absensi dari:', url);
        
        const response = await fetch(url);
        const result = await response.json();
        
        console.log('📊 Response absensi:', result);
        
        if (!result.success) {
            console.error('Error fetch absensi:', result.error);
            return [];
        }
        return result.data || [];
    } catch (error) {
        console.error('Error fetching absensi:', error);
        return [];
    }
}

// Format tanggal Indonesia
function formatTanggalIndonesia(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

// Render grid absensi
async function renderAbsensi() {
    const gridContainer = document.getElementById('absensiGrid');
    if (!gridContainer) {
        console.log('⚠️ Elemen absensiGrid tidak ditemukan');
        return;
    }

    // Tampilkan tanggal hari ini
    const today = new Date();
    const tanggalSpan = document.getElementById('tanggalAbsensi');
    if (tanggalSpan) {
        tanggalSpan.textContent = formatTanggalIndonesia(today);
    }

    gridContainer.innerHTML = '<div class="loading-absensi"><i class="fas fa-spinner fa-spin"></i> Memuat data absensi...</div>';

    try {
        // Ambil data
        const [jumlahSiswaData, absensiData] = await Promise.all([
            fetchJumlahSiswa(),
            fetchAbsensiHariIni()
        ]);

        console.log('Jumlah siswa data:', jumlahSiswaData);
        console.log('Absensi data:', absensiData);

        // Buat map jumlah siswa per kelas
        const jumlahMap = new Map();
        jumlahSiswaData.forEach(item => {
            const kelas = item.kelas || item.KELAS;
            const total = parseInt(item.total || item.TOTAL || 0);
            if (kelas && total > 0) {
                jumlahMap.set(kelas, total);
            }
        });

        // Buat map absensi per kelas berdasarkan STATUS di spreadsheet
        // STATUS: 'TEPAT WAKTU', 'TERLAMBAT', 'PULANG'
        const absensiMap = new Map();
        absensiData.forEach(item => {
            const kelas = item.KELAS;
            const status = item.STATUS;
            if (!kelas) return;
            
            if (!absensiMap.has(kelas)) {
                absensiMap.set(kelas, { tepatWaktu: 0, terlambat: 0, pulang: 0 });
            }
            const stat = absensiMap.get(kelas);
            
            // Sesuaikan dengan nilai STATUS di spreadsheet
            if (status === 'TEPAT WAKTU') {
                stat.tepatWaktu++;
            } else if (status === 'TERLAMBAT') {
                stat.terlambat++;
            } else if (status === 'PULANG') {
                stat.pulang++;
            }
        });

        // Urutan kelas
        const urutanKelas = [ '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];

        // Gabungkan data
        const kelasData = [];
        for (const kelas of urutanKelas) {
            const totalSiswa = jumlahMap.get(kelas) || 0;
            const absen = absensiMap.get(kelas) || { tepatWaktu: 0, terlambat: 0, pulang: 0 };
            
            // Hitung prosentase
            const persenTepatWaktu = totalSiswa > 0 ? Math.round((absen.tepatWaktu / totalSiswa) * 100) : 0;
            const persenTerlambat = totalSiswa > 0 ? Math.round((absen.terlambat / totalSiswa) * 100) : 0;
            const persenPulang = totalSiswa > 0 ? Math.round((absen.pulang / totalSiswa) * 100) : 0;
            
            kelasData.push({
                kelas: kelas,
                totalSiswa: totalSiswa,
                tepatWaktu: absen.tepatWaktu,
                terlambat: absen.terlambat,
                pulang: absen.pulang,
                persenTepatWaktu: persenTepatWaktu,
                persenTerlambat: persenTerlambat,
                persenPulang: persenPulang
            });
        }

        // Filter hanya kelas yang punya data jumlah siswa
        const kelasDenganData = kelasData.filter(k => k.totalSiswa > 0);
        
        if (kelasDenganData.length === 0) {
            gridContainer.innerHTML = '<div class="no-data-absensi"><i class="fas fa-exclamation-triangle"></i> Tidak ada data jumlah siswa. Periksa sheet jumlah_siswa.</div>';
            return;
        }

        // Tentukan status keseluruhan berdasarkan prosentase tepat waktu
        const getStatusClass = (persen) => {
            if (persen >= 80) return 'status-baik';
            if (persen >= 60) return 'status-cukup';
            return 'status-kurang';
        };
        
        const getStatusText = (persen) => {
            if (persen >= 80) return 'Kehadiran Sangat Baik';
            if (persen >= 60) return 'Kehadiran Cukup';
            return 'Kehadiran Perlu Perhatian';
        };

        // Render grid
        gridContainer.innerHTML = kelasDenganData.map(k => {
            const statusClass = getStatusClass(k.persenTepatWaktu);
            const statusText = getStatusText(k.persenTepatWaktu);
            
            return `
                <div class="absensi-card">
                    <div class="absensi-card-header">
                        <h3>Kelas ${k.kelas}</h3>
                        <span class="badge-kelas">${k.totalSiswa} Siswa</span>
                    </div>
                    
                    <!-- Jumlah Siswa -->
                    <div class="ringkasan-jumlah">
                        <span class="label">Jumlah Siswa</span>
                        <span class="value">${k.totalSiswa}</span>
                    </div>
                    
                    <!-- 3 Kolom Absensi: Tepat Waktu | Terlambat | Pulang -->
                    <div class="absensi-tiga-kolom">
                        <div class="absensi-item datang">
                            <div class="icon"><i class="fas fa-check-circle"></i></div>
                            <span class="label">Tepat Waktu</span>
                            <span class="value">${k.tepatWaktu}</span>
                        </div>
                        <div class="absensi-item terlambat">
                            <div class="icon"><i class="fas fa-clock"></i></div>
                            <span class="label">Terlambat</span>
                            <span class="value">${k.terlambat}</span>
                        </div>
                        <div class="absensi-item pulang">
                            <div class="icon"><i class="fas fa-home"></i></div>
                            <span class="label">Pulang</span>
                            <span class="value">${k.pulang}</span>
                        </div>
                    </div>
                    
                    <!-- Prosentase -->
                    <div class="prosentase-container">
                        <div class="prosentase-title">Prosentase</div>
                        <div class="prosentase-tiga-kolom">
                            <div class="prosentase-item datang">
                                <span class="label">Tepat Waktu</span>
                                <span class="value">${k.persenTepatWaktu}%</span>
                                <div class="progress-mini">
                                    <div class="progress-mini-bar datang" style="width: ${k.persenTepatWaktu}%"></div>
                                </div>
                            </div>
                            <div class="prosentase-item terlambat">
                                <span class="label">Terlambat</span>
                                <span class="value">${k.persenTerlambat}%</span>
                                <div class="progress-mini">
                                    <div class="progress-mini-bar terlambat" style="width: ${k.persenTerlambat}%"></div>
                                </div>
                            </div>
                            <div class="prosentase-item pulang">
                                <span class="label">Pulang</span>
                                <span class="value">${k.persenPulang}%</span>
                                <div class="progress-mini">
                                    <div class="progress-mini-bar pulang" style="width: ${k.persenPulang}%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer Status -->
                    <div class="absensi-footer ${statusClass}">
                        <i class="fas ${k.persenTepatWaktu >= 80 ? 'fa-smile-wink' : (k.persenTepatWaktu >= 60 ? 'fa-meh' : 'fa-frown')}"></i>
                        ${statusText} (${k.persenTepatWaktu}%)
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error renderAbsensi:', error);
        gridContainer.innerHTML = '<div class="no-data-absensi"><i class="fas fa-exclamation-triangle"></i> Terjadi kesalahan: ' + error.message + '</div>';
    }
}
// ============================================
// TRACKING IJAZAH SDN GAMBIRONO 01
// ============================================

// Ganti dengan Web App URL Anda
const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzRshWZcPbXfYy_60LPxNW48oQtBif2B57_LhDsZa9M4SNytKWm_9MfolVroOYXmScW/exec';

// Variabel global
let currentIjazahData = null;

// Fungsi Cek NISN
window.cekNISN = async function() {
    console.log('Fungsi cekNISN dipanggil');
    
    const nisnInput = document.getElementById('nisnInput');
    if (!nisnInput) {
        console.error('Elemen nisnInput tidak ditemukan');
        return;
    }
    
    const nisn = nisnInput.value.trim();
    
    if (!nisn) {
        alert('Mohon masukkan NISN');
        nisnInput.focus();
        return;
    }
    
    if (nisn.length < 10) {
        alert('NISN harus 10 digit');
        nisnInput.focus();
        return;
    }
    
    // Tampilkan loading
    const loginForm = document.getElementById('loginForm');
    const hasilTracking = document.getElementById('hasilTracking');
    const loadingTracking = document.getElementById('loadingTracking');
    
    if (loginForm) loginForm.style.display = 'none';
    if (hasilTracking) hasilTracking.style.display = 'none';
    if (loadingTracking) loadingTracking.style.display = 'block';
    
    try {
        // Panggil Web App
        const response = await fetch(WEBAPP_URL + '?nisn=' + encodeURIComponent(nisn));
        const data = await response.json();
        
        console.log('Response dari server:', data);
        
        if (data.status === 'found') {
            currentIjazahData = {
                nisn: data.nisn || nisn,
                nama: data.nama || '-',
                tahun: data.tahun || '-',
                link: data.link || ''
            };
            
            // Tampilkan hasil
            const resultNISN = document.getElementById('resultNISN');
            const resultNama = document.getElementById('resultNama');
            const resultTahun = document.getElementById('resultTahun');
            
            if (resultNISN) resultNISN.innerHTML = currentIjazahData.nisn;
            if (resultNama) resultNama.innerHTML = currentIjazahData.nama;
            if (resultTahun) resultTahun.innerHTML = currentIjazahData.tahun;
            
            // Buat ulang tombol link ijazah
            updateLinkButton();
            
            if (loadingTracking) loadingTracking.style.display = 'none';
            if (hasilTracking) hasilTracking.style.display = 'block';
            
            // Simpan ke session
            sessionStorage.setItem('tracking_nisn', nisn);
            
        } else {
            if (loadingTracking) loadingTracking.style.display = 'none';
            if (loginForm) loginForm.style.display = 'block';
            alert('NISN ' + nisn + ' tidak ditemukan. Silakan hubungi admin sekolah.');
        }
        
    } catch (error) {
        console.error('Error:', error);
        if (loadingTracking) loadingTracking.style.display = 'none';
        if (loginForm) loginForm.style.display = 'block';
        alert('Gagal terhubung ke server. Silakan coba lagi.\nError: ' + error.message);
    }
};

// Fungsi untuk update tombol link ijazah
function updateLinkButton() {
    const linkContainer = document.getElementById('linkContainer');
    if (!linkContainer) return;
    
    if (currentIjazahData && currentIjazahData.link && currentIjazahData.link !== '') {
        // Buat tombol link yang bisa diklik
        linkContainer.innerHTML = `
            <a href="${currentIjazahData.link}" target="_blank" class="ijazah-link" style="background: #27ae60; cursor: pointer;">
                <i class="fas fa-download"></i> Download / Lihat Ijazah
            </a>
        `;
    } else {
        // Tombol disabled
        linkContainer.innerHTML = `
            <button class="ijazah-link-disabled" style="background: #95a5a6; cursor: not-allowed; border: none; padding: 10px 24px; border-radius: 30px; color: white; font-weight: 600;">
                <i class="fas fa-clock"></i> Ijazah Belum Tersedia
            </button>
        `;
    }
}

// Fungsi Logout / Ganti NISN
window.logoutTracking = function() {
    const loginForm = document.getElementById('loginForm');
    const hasilTracking = document.getElementById('hasilTracking');
    const nisnInput = document.getElementById('nisnInput');
    
    if (hasilTracking) hasilTracking.style.display = 'none';
    if (loginForm) loginForm.style.display = 'block';
    if (nisnInput) nisnInput.value = '';
    
    sessionStorage.removeItem('tracking_nisn');
    currentIjazahData = null;
};

// Fungsi download langsung (alternatif)
window.downloadIjazah = function() {
    if (currentIjazahData && currentIjazahData.link && currentIjazahData.link !== '') {
        window.open(currentIjazahData.link, '_blank');
    } else {
        alert('Maaf, file ijazah belum tersedia. Silakan hubungi admin sekolah.');
    }
};

// Cek session saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tracking Ijazah siap digunakan');
    
    const savedNISN = sessionStorage.getItem('tracking_nisn');
    if (savedNISN) {
        const nisnInput = document.getElementById('nisnInput');
        if (nisnInput) {
            nisnInput.value = savedNISN;
            setTimeout(function() {
                window.cekNISN();
            }, 500);
        }
    }
    
    // Event Enter pada input NISN
    const nisnInput = document.getElementById('nisnInput');
    if (nisnInput) {
        nisnInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                window.cekNISN();
            }
        });
    }
});

// ============================================
// BUKU INDUK DIGITAL
// ============================================

// Ganti dengan Web App URL Anda
const BUKU_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzDBHP0w7Yyvq1PtxJuA_c51yG7T0uexW9dP_8Oo4cVBrNl-3p28JpqRALBEkug1aH8/exec';

// Fungsi Cek Buku Induk
window.cekBukuInduk = async function() {
    const nisnInput = document.getElementById('bukuNisnInput');
    if (!nisnInput) return;
    
    const nisn = nisnInput.value.trim();
    
    if (!nisn) {
        alert('Mohon masukkan NISN');
        nisnInput.focus();
        return;
    }
    
    if (nisn.length < 10) {
        alert('NISN harus 10 digit');
        nisnInput.focus();
        return;
    }
    
    // Tampilkan loading
    document.getElementById('bukuLoginForm').style.display = 'none';
    document.getElementById('hasilBukuInduk').style.display = 'none';
    document.getElementById('loadingBuku').style.display = 'block';
    
    try {
        const response = await fetch(BUKU_WEBAPP_URL + '?nisn=' + encodeURIComponent(nisn));
        const data = await response.json();
        
        console.log('Data Buku Induk:', data);
        
        if (data.status === 'found') {
            // Tampilkan biodata siswa (gunakan data.biodata)
            if (data.biodata) {
                displayBiodata(data.biodata);
            } else {
                document.getElementById('biodataSiswa').innerHTML = '<p style="padding:10px;color:#666;">Data biodata tidak tersedia</p>';
            }
            
            // Tampilkan nama dan NISN
            document.getElementById('bukuNama').innerHTML = data.nama;
            document.getElementById('bukuNISN').innerHTML = data.nisn;
            
            // Tampilkan riwayat kotak nilai
            displayRiwayatKotak(data.riwayat);
            
            document.getElementById('loadingBuku').style.display = 'none';
            document.getElementById('hasilBukuInduk').style.display = 'block';
            sessionStorage.setItem('buku_nisn', nisn);
            
        } else {
            document.getElementById('loadingBuku').style.display = 'none';
            document.getElementById('bukuLoginForm').style.display = 'block';
            alert('NISN ' + nisn + ' tidak ditemukan. Silakan hubungi admin sekolah.');
        }
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loadingBuku').style.display = 'none';
        document.getElementById('bukuLoginForm').style.display = 'block';
        alert('Gagal terhubung ke server. Silakan coba lagi.');
    }
};

// Fungsi untuk menampilkan biodata siswa
function displayBiodata(biodata) {
    const container = document.getElementById('biodataSiswa');
    if (!container) return;
    
    if (!biodata || Object.keys(biodata).length === 0) {
        container.innerHTML = `
            <div class="no-data-buku">
                <i class="fas fa-user"></i>
                <p>Data biodata tidak tersedia</p>
            </div>
        `;
        return;
    }
    
    // Format tanggal lahir
    let tglLahir = biodata.tanggalLahir || '-';
    if (tglLahir !== '-' && tglLahir !== '') {
        try {
            const date = new Date(tglLahir);
            if (!isNaN(date.getTime())) {
                tglLahir = date.toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                });
            }
        } catch (e) {
            // Jika format tanggal tidak valid, tetap tampilkan apa adanya
        }
    }
    
    // Format jenis kelamin
    let jk = biodata.jenisKelamin || '-';
    if (jk.toLowerCase() === 'l' || jk.toLowerCase() === 'laki-laki') jk = 'Laki-laki';
    else if (jk.toLowerCase() === 'p' || jk.toLowerCase() === 'perempuan') jk = 'Perempuan';
    
    const html = `
        <div class="biodata-grid">
            <!-- Kiri -->
            <div class="biodata-col">
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-user"></i> Nama</span>
                    <span class="biodata-value">${biodata.nama || '-'}</span>
                </div>
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-id-card"></i> NISN</span>
                    <span class="biodata-value">${biodata.nisn || '-'}</span>
                </div>
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-id-badge"></i> NIS</span>
                    <span class="biodata-value">${biodata.nis || '-'}</span>
                </div>
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-id-card"></i> NIK</span>
                    <span class="biodata-value">${biodata.nik || '-'}</span>
                </div>
               
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-venus-mars"></i> Jenis Kelamin</span>
                    <span class="biodata-value">${jk}</span>
                </div>
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-map-pin"></i> Tempat Lahir</span>
                    <span class="biodata-value">${biodata.tempatLahir || '-'}</span>
                </div>
            </div>
            
            <!-- Kanan -->
            <div class="biodata-col">
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-calendar-alt"></i> Tanggal Lahir</span>
                    <span class="biodata-value">${tglLahir}</span>
                </div>
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-user-tie"></i> Nama Ayah</span>
                    <span class="biodata-value">${biodata.namaAyah || '-'}</span>
                </div>
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-id-card"></i> NIK Ayah</span>
                    <span class="biodata-value">${biodata.nikAyah || '-'}</span>
                </div>
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-user"></i> Nama Ibu</span>
                    <span class="biodata-value">${biodata.namaIbu || '-'}</span>
                </div>
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-id-card"></i> NIK Ibu</span>
                    <span class="biodata-value">${biodata.nikIbu || '-'}</span>
                </div>
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-phone"></i> Nomor Telepon</span>
                    <span class="biodata-value">${biodata.nomorTelepon || '-'}</span>
                </div>
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-map-marker-alt"></i> Alamat</span>
                    <span class="biodata-value">${biodata.alamat || '-'}</span>
                </div>
            </div>
            
            <!-- Bawah Full Width: Tahun Masuk & Tahun Lulus -->
            <div class="biodata-footer">
                <div class="biodata-item tahun-item">
                    <span class="biodata-label"><i class="fas fa-calendar-plus"></i> Tahun Masuk</span>
                    <span class="biodata-value">${biodata.tahunMasuk || '-'}</span>
                </div>
                <div class="biodata-item tahun-item">
                    <span class="biodata-label"><i class="fas fa-calendar-check"></i> Tahun Lulus</span>
                    <span class="biodata-value">${biodata.tahunLulus || '-'}</span>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Tampilkan riwayat dalam bentuk kotak-kotak
function displayRiwayatKotak(riwayatList) {
    const container = document.getElementById('riwayatKotak');
    if (!container) return;
    
    if (!riwayatList || riwayatList.length === 0) {
        container.innerHTML = '<div class="no-data-buku"><i class="fas fa-folder-open"></i><p>Belum ada riwayat nilai</p></div>';
        return;
    }
    
    // Urutkan dari tahun terbaru ke terlama
    riwayatList.sort((a, b) => {
        if (a.tahun !== b.tahun) return b.tahun - a.tahun;
        return b.semester - a.semester;
    });
    
    let html = '';
    
    riwayatList.forEach((item, index) => {
        // Daftar mata pelajaran
        const mapelList = [
            { nama: 'PAI', nilai: item.pai },
            { nama: 'PP', nilai: item.pp },
            { nama: 'BIN', nilai: item.bin },
            { nama: 'MTK', nilai: item.mtk },
            { nama: 'IPAS', nilai: item.ipas },
            { nama: 'PJOK', nilai: item.pjok },
            { nama: 'SBdP', nilai: item.sbdp },
            { nama: 'BIG', nilai: item.big },
            { nama: 'B. JAWA', nilai: item.bjawa },
            { nama: 'BTA', nilai: item.bta }
        ];
        
        // Hitung rata-rata jika belum ada
        const rataRata = item.rt || (item.jml / 10).toFixed(1);
        
        // Warna rata-rata
        let rataClass = '';
        if (rataRata >= 85) rataClass = 'rata-rata-bagus';
        else if (rataRata >= 70) rataClass = '';
        else if (rataRata >= 60) rataClass = 'rata-rata-cukup';
        else rataClass = 'rata-rata-kurang';
        
        html += `
            <div class="kotak-semester">
                <div class="semester-header">
                    <h3><i class="fas fa-calendar-alt"></i> Tahun ${item.tahun}</h3>
                    <div class="semester-badge">
                        <i class="fas fa-${item.semester === 1 ? 'arrow-up' : 'arrow-down'}"></i>
                        Kelas ${item.kelas} - Semester ${item.semester}
                    </div>
                </div>
                
                <div class="nilai-grid">
        `;
        
        // Tampilkan setiap mata pelajaran
        mapelList.forEach(mapel => {
            let nilaiClass = '';
            if (mapel.nilai >= 85) nilaiClass = 'nilai-bagus';
            else if (mapel.nilai >= 70) nilaiClass = '';
            else if (mapel.nilai >= 60) nilaiClass = 'nilai-cukup';
            else nilaiClass = 'nilai-kurang';
            
            html += `
                <div class="nilai-item">
                    <span class="mapel">${mapel.nama}</span>
                    <span class="nilai ${nilaiClass}">${mapel.nilai}</span>
                </div>
            `;
        });
        
        html += `
                </div>
                
                <div class="semester-footer">
                    <div class="jml">
                        <i class="fas fa-chart-simple"></i> Jumlah Nilai: <strong>${item.jml || (mapelList.reduce((sum, m) => sum + m.nilai, 0))}</strong>
                    </div>
                    <div class="rata-rata ${rataClass}">
                        <i class="fas fa-star"></i> Rata-rata: ${rataRata}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Logout Buku Induk
window.logoutBuku = function() {
    document.getElementById('hasilBukuInduk').style.display = 'none';
    document.getElementById('bukuLoginForm').style.display = 'block';
    document.getElementById('bukuNisnInput').value = '';
    sessionStorage.removeItem('buku_nisn');
};

// Cek session
document.addEventListener('DOMContentLoaded', function() {
    const savedNISN = sessionStorage.getItem('buku_nisn');
    if (savedNISN) {
        const nisnInput = document.getElementById('bukuNisnInput');
        if (nisnInput) {
            nisnInput.value = savedNISN;
            setTimeout(() => window.cekBukuInduk(), 500);
        }
    }
});
// ============================================
// DROPDOWN - PASTI BERFUNGSI
// ============================================

// FUNGSI TOGGLE - KLIK MUNCUL/HILANG
function toggleDropdown() {
    var menu = document.getElementById('dropdownMenu');
    
    if (!menu) return;
    
    // Cek apakah sedang tampil
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
        console.log('Dropdown HILANG');
    } else {
        menu.style.display = 'block';
        console.log('Dropdown MUNCUL');
    }
}

// FUNGSI TUTUP - SAAT KLIK SUBMENU
function closeDropdown() {
    var menu = document.getElementById('dropdownMenu');
    if (!menu) return;
    
    menu.style.display = 'none';
    
    // Ambil target dari event
    var targetId = event.target.getAttribute('href');
    if (targetId && targetId !== '#') {
        var target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Tutup navbar mobile
    var navbarMenu = document.getElementById('navbarMenu');
    if (navbarMenu) {
        navbarMenu.classList.remove('active');
    }
}

// PASTIKAN DROPDOWN HIDE SAAT LOAD
document.addEventListener('DOMContentLoaded', function() {
    var menu = document.getElementById('dropdownMenu');
    if (menu) {
        menu.style.display = 'none';
    }
});

// KLIK DI LUAR UNTUK TUTUP
document.addEventListener('click', function(e) {
    var dropdown = document.getElementById('dropdownKesiswaan');
    var menu = document.getElementById('dropdownMenu');
    
    if (dropdown && menu && !dropdown.contains(e.target)) {
        menu.style.display = 'none';
    }
});

// TUTUP SAAT SCROLL
window.addEventListener('scroll', function() {
    var menu = document.getElementById('dropdownMenu');
    if (menu) {
        menu.style.display = 'none';
    }
});
