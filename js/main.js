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

// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    tampilkanJumlahSiswa();
    setupRealTimeSearch();
    
    if (APPS_SCRIPT_URL === 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec') {
        console.warn('⚠️ PERHATIAN: APPS_SCRIPT_URL belum diatur!');
        console.log('📝 Langkah setup:');
        console.log('1. Buat Google Apps Script baru');
        console.log('2. Copy kode Apps Script yang sudah disediakan');
        console.log('3. Deploy sebagai Web App');
        console.log('4. Copy URL deployment dan ganti APPS_SCRIPT_URL');
    } else {
        console.log('✅ Apps Script URL sudah diatur');
    }
});
