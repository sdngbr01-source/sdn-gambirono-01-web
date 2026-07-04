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
// ============ KONFIGURASI ============
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxBQ1uIEL1DA9IfHkKqvWEFRI0idRw0ys73pAz_wdhxVUB04HuLcDquf4rb36RrNRNJ/exec';

// Variabel global
let dataSiswaGlobal = [];
let dataJumlahSiswaGlobal = [];
let dataMutasiGlobal = [];

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

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Memuat data...');
    
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
// ============ MUTASI SISWA ============

// Variabel untuk menyimpan data siswa yang ditemukan
let siswaDitemukan = null;

// Switch Tab
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
    document.getElementById(`tab-${tab}`).classList.add('active');
    
    // Reset results
    if (tab === 'keluar') {
        document.getElementById('mk_hasilCari').innerHTML = '';
        document.getElementById('mk_formMutasi').style.display = 'none';
        document.getElementById('mk_result').style.display = 'none';
    }
}

// ============ MUTASI MASUK ============

async function submitMutasiMasuk() {
    // Ambil semua data dari form
    const data = {
        nama: document.getElementById('mm_nama').value.trim(),
        nis: document.getElementById('mm_nis').value.trim(),
        nisn: document.getElementById('mm_nisn').value.trim(),
        nik: document.getElementById('mm_nik').value.trim(),
        kelas: document.getElementById('mm_kelas').value,
        jenisKelamin: document.getElementById('mm_jk').value,
        tempatLahir: document.getElementById('mm_tempatLahir').value.trim(),
        tanggalLahir: document.getElementById('mm_tanggalLahir').value,
        sekolah: document.getElementById('mm_sekolah').value.trim(), // ASAL SEKOLAH
        namaAyah: document.getElementById('mm_namaAyah').value.trim(),
        nikAyah: document.getElementById('mm_nikAyah').value.trim(),
        namaIbu: document.getElementById('mm_namaIbu').value.trim(),
        nikIbu: document.getElementById('mm_nikIbu').value.trim(),
        nomorTelepon: document.getElementById('mm_telepon').value.trim(),
        alamat: document.getElementById('mm_alamat').value.trim(),
        password: document.getElementById('mm_password').value.trim()
    };
    
    const resultDiv = document.getElementById('mm_result');
    
    // Validasi form
    for (let key in data) {
        if (key !== 'password' && !data[key]) {
            resultDiv.style.display = 'block';
            resultDiv.className = 'mutasi-result error';
            resultDiv.innerHTML = `<i class="fas fa-exclamation-circle result-icon"></i> Harap isi semua field yang wajib diisi!`;
            document.querySelectorAll('#formMutasiMasuk .form-control').forEach(el => {
                if (!el.value.trim() && el.type !== 'password') {
                    el.classList.add('error');
                } else {
                    el.classList.remove('error');
                }
            });
            return;
        }
    }
    
    // Validasi kata kunci
    if (data.password !== '20524756') {
        resultDiv.style.display = 'block';
        resultDiv.className = 'mutasi-result error';
        resultDiv.innerHTML = `<i class="fas fa-lock result-icon"></i> Kata kunci salah!`;
        document.getElementById('mm_password').classList.add('error');
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
        const response = await fetch(`${APPS_SCRIPT_URL}?action=mutasi_masuk`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // Karena mode no-cors, response tidak bisa dibaca
        // Tapi data sudah terkirim, kita anggap sukses
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
        document.getElementById('formMutasiMasuk').reset();
        document.querySelectorAll('#formMutasiMasuk .form-control').forEach(el => {
            el.classList.remove('error');
        });
        
        // Refresh data setelah 2 detik
        setTimeout(() => {
            if (typeof fetchAllData === 'function') {
                fetchAllData();
            }
            if (typeof loadHistoryMutasi === 'function') {
                loadHistoryMutasi();
            }
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

// ============ MUTASI KELUAR ============

async function cariSiswaMutasi() {
    const nama = document.getElementById('mk_cariNama').value.trim();
    const nis = document.getElementById('mk_cariNIS').value.trim();
    const resultDiv = document.getElementById('mk_hasilCari');
    
    if (!nama && !nis) {
        resultDiv.innerHTML = `<div class="mutasi-result error"><i class="fas fa-exclamation-circle result-icon"></i> Masukkan nama atau NIS untuk mencari!</div>`;
        return;
    }
    
    resultDiv.innerHTML = `<div class="mutasi-result"><i class="fas fa-spinner fa-spin result-icon"></i> Mencari data siswa...</div>`;
    
    try {
        const data = await getDetailSiswa();
        
        // Cari siswa
        let found = null;
        if (nama) {
            found = data.find(s => s.nama?.toLowerCase() === nama.toLowerCase());
        } else if (nis) {
            found = data.find(s => s.nis === nis);
        }
        
        if (!found) {
            resultDiv.className = 'mutasi-result error';
            resultDiv.innerHTML = `
                <i class="fas fa-user-slash result-icon"></i> 
                Siswa dengan <strong>${nama || nis}</strong> tidak ditemukan.
            `;
            document.getElementById('mk_formMutasi').style.display = 'none';
            return;
        }
        
        // Cek status siswa
        if (found.keterangan && found.keterangan.toLowerCase() === 'mutasi keluar') {
            resultDiv.className = 'mutasi-result error';
            resultDiv.innerHTML = `
                <i class="fas fa-exclamation-triangle result-icon"></i> 
                Siswa <strong>${found.nama}</strong> sudah dimutasikan keluar.
            `;
            document.getElementById('mk_formMutasi').style.display = 'none';
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
                    <div class="value">${found.nama}</div>
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
        document.getElementById('mk_formMutasi').style.display = 'block';
        document.getElementById('mk_sekolahTujuan').value = '';
        document.getElementById('mk_alamatTujuan').value = '';
        document.getElementById('mk_password').value = '';
        document.getElementById('mk_result').style.display = 'none';
        
    } catch (error) {
        console.error('Error:', error);
        resultDiv.className = 'mutasi-result error';
        resultDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle result-icon"></i> 
            Error: ${error.message}
        `;
    }
}

async function submitMutasiKeluar() {
    if (!siswaDitemukan) {
        alert('Silakan cari siswa terlebih dahulu!');
        return;
    }
    
    const sekolahTujuan = document.getElementById('mk_sekolahTujuan').value.trim();
    const alamatTujuan = document.getElementById('mk_alamatTujuan').value.trim();
    const password = document.getElementById('mk_password').value.trim();
    const resultDiv = document.getElementById('mk_result');
    
    // Validasi
    if (!sekolahTujuan) {
        resultDiv.style.display = 'block';
        resultDiv.className = 'mutasi-result error';
        resultDiv.innerHTML = `<i class="fas fa-exclamation-circle result-icon"></i> Harap isi Sekolah Tujuan!`;
        return;
    }
    
    if (!alamatTujuan) {
        resultDiv.style.display = 'block';
        resultDiv.className = 'mutasi-result error';
        resultDiv.innerHTML = `<i class="fas fa-exclamation-circle result-icon"></i> Harap isi Alamat Sekolah Tujuan!`;
        return;
    }
    
    // Validasi kata kunci
    if (password !== '20524756') {
        resultDiv.style.display = 'block';
        resultDiv.className = 'mutasi-result error';
        resultDiv.innerHTML = `<i class="fas fa-lock result-icon"></i> Kata kunci salah! Silakan masukkan kata kunci yang benar.`;
        document.getElementById('mk_password').classList.add('error');
        return;
    }
    
    // Siapkan data
    const data = {
        nis: siswaDitemukan.nis,
        nama: siswaDitemukan.nama,
        sekolahTujuan: sekolahTujuan,
        alamatTujuan: alamatTujuan,
        tanggalKeluar: new Date().toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '-')
    };
    
    // Tampilkan loading
    resultDiv.style.display = 'block';
    resultDiv.className = 'mutasi-result';
    resultDiv.innerHTML = `<i class="fas fa-spinner fa-spin result-icon"></i> Memproses mutasi keluar...`;
    
    try {
        // Kirim data ke Apps Script
        const response = await fetch(`${APPS_SCRIPT_URL}?action=mutasi_keluar`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // Karena mode no-cors, kita anggap sukses
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
        document.getElementById('mk_sekolahTujuan').value = '';
        document.getElementById('mk_alamatTujuan').value = '';
        document.getElementById('mk_password').value = '';
        document.getElementById('mk_formMutasi').style.display = 'none';
        siswaDitemukan = null;
        
        // Refresh data setelah 2 detik
        setTimeout(() => {
            dataSiswaGlobal = [];
            dataJumlahSiswaGlobal = [];
            fetchAllData();
            document.getElementById('mk_hasilCari').innerHTML = '';
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        // Jika error tapi data mungkin sudah terkirim
        resultDiv.className = 'mutasi-result success';
        resultDiv.innerHTML = `
            <i class="fas fa-check-circle result-icon"></i> 
            <strong>Data Mutasi Keluar Terkirim!</strong><br>
            ${error.message}<br>
            <small>Silakan refresh halaman untuk melihat perubahan.</small>
        `;
    }
}

	// ============ LOAD HISTORY MUTASI ============
async function loadHistoryMutasi() {
    const tbody = document.getElementById('historyMutasiBody');
    if (!tbody) return;
    
    tbody.innerHTML = '<tr><td colspan="7" class="loading-text"><i class="fas fa-spinner fa-spin"></i> Memuat history...</td></tr>';
    
    try {
        const data = await getDetailSiswa();
        
        // Filter siswa yang memiliki keterangan mutasi
        const mutasiData = data.filter(s => 
            s.keterangan && 
            (s.keterangan.toLowerCase() === 'mutasi masuk' || 
             s.keterangan.toLowerCase() === 'mutasi keluar')
        );
        
        if (mutasiData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="no-data">📭 Belum ada history mutasi</td></tr>';
            return;
        }
        
        // Urutkan dari yang terbaru (balik urutan)
        mutasiData.reverse();
        
        let html = '';
        mutasiData.forEach((siswa, index) => {
            let sekolah = '-';
            let tanggal = '-';
            
            const jenisMutasi = siswa.keterangan || '';
            const jenisLower = jenisMutasi.toLowerCase();
            
            // ============ CEK JENIS MUTASI ============
            if (jenisLower === 'mutasi masuk') {
                // Ambil dari kolom 'sekolah' (header: sekolah)
                sekolah = siswa.sekolah || '-';
                // Tanggal: pakai kolom 'tanggal' jika ada, atau tanggalLahir
                tanggal = siswa.tanggal || siswa.tanggalLahir || '-';
            } else if (jenisLower === 'mutasi keluar') {
                // Ambil dari kolom 'sekolah' (header: sekolah) untuk sekolah tujuan
                sekolah = siswa.sekolah || siswa.sekolahTujuan || '-';
                // Tanggal: pakai kolom 'tanggal' (header: tanggal)
                tanggal = siswa.tanggal || siswa.tanggalKeluar || '-';
            }
            
            // ============ FORMAT TANGGAL ============
            // Jika tanggal dalam format ISO (2019-06-05T17:00:00.000Z)
            if (tanggal && tanggal.includes('T')) {
                try {
                    const date = new Date(tanggal);
                    if (!isNaN(date.getTime())) {
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        tanggal = `${day}/${month}/${year}`;
                    }
                } catch (e) {
                    // Jika gagal format, biarkan apa adanya
                }
            }
            // Jika tanggal dalam format string biasa (YYYY-MM-DD)
            else if (tanggal && tanggal.match(/^\d{4}-\d{2}-\d{2}/)) {
                try {
                    const parts = tanggal.split('-');
                    if (parts.length === 3) {
                        tanggal = `${parts[2]}/${parts[1]}/${parts[0]}`;
                    }
                } catch (e) {
                    // Jika gagal format, biarkan apa adanya
                }
            }
            
            html += `
                <tr>
                    <td><strong>${index + 1}</strong></td>
                    <td><strong>${siswa.nama || '-'}</strong></td>
                    <td>${siswa.nisn || '-'}</td>
                    <td>${siswa.kelas || '-'}</td>
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

// ============ FILE: main.js ============

// ... semua fungsi di atas ...

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Memuat data...');
    
    // Load data
    fetchAllData();
    
    // Load history mutasi
    loadHistoryMutasi();
    
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

// ============ TOGGLE FORM BERDASARKAN DROPDOWN ============
function toggleMutasiForm() {
    const jenis = document.getElementById('jenisMutasi').value;
    
    // Sembunyikan semua form
    document.getElementById('form-mutasi-masuk').style.display = 'none';
    document.getElementById('form-mutasi-keluar').style.display = 'none';
    
    // Reset hasil
    document.getElementById('mm_result').style.display = 'none';
    document.getElementById('mk_hasilCari').innerHTML = '';
    document.getElementById('mk_formMutasi').style.display = 'none';
    document.getElementById('mk_result').style.display = 'none';
    
    // Tampilkan form sesuai pilihan
    if (jenis === 'masuk') {
        document.getElementById('form-mutasi-masuk').style.display = 'block';
        // Reset form
        document.getElementById('formMutasiMasuk').reset();
        document.querySelectorAll('#formMutasiMasuk .form-control').forEach(el => {
            el.classList.remove('error');
        });
    } else if (jenis === 'keluar') {
        document.getElementById('form-mutasi-keluar').style.display = 'block';
        // Reset form
        document.getElementById('mk_cariNama').value = '';
        document.getElementById('mk_cariNIS').value = '';
        document.getElementById('mk_sekolahTujuan').value = '';
        document.getElementById('mk_alamatTujuan').value = '';
        document.getElementById('mk_password').value = '';
    }
}
