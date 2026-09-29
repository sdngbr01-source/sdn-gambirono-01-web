// ============================================
// MAIN JAVASCRIPT - SDN GAMBIRONO 01
// ============================================

// ============================================
// 1. TOGGLE MOBILE MENU
// ============================================
function toggleMenu() {
    const menu = document.getElementById('navbarMenu');
    menu.classList.toggle('active');
    
    const icon = document.querySelector('.navbar-toggle i');
    if (menu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// ============================================
// 2. SCROLL TO TOP
// ============================================
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// 3. CHANGE PROFIL IMAGE
// ============================================
function changeImage(src) {
    const mainImage = document.getElementById('mainProfilImage');
    mainImage.src = src;
    
    const thumbs = document.querySelectorAll('.profil-thumbnails .thumb');
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    event.target.classList.add('active');
}

// ============================================
// 4. FILTER GURU
// ============================================
function filterGuru(kategori) {
    const cards = document.querySelectorAll('.guru-card');
    const buttons = document.querySelectorAll('.guru-filters .filter-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    cards.forEach(card => {
        if (kategori === 'all' || card.dataset.kategori === kategori) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ============================================
// 5. FILTER GALERI
// ============================================
function filterGaleri(kategori) {
    const items = document.querySelectorAll('.galeri-item');
    const buttons = document.querySelectorAll('.galeri-filters .filter-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    items.forEach(item => {
        if (kategori === 'all' || item.dataset.kategori === kategori) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// ============================================
// 6. LIGHTBOX
// ============================================
function openLightbox(src, caption) {
    document.getElementById('lightbox').style.display = 'block';
    document.getElementById('lightboxImage').src = src;
    document.getElementById('lightboxCaption').innerHTML = caption;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// ============================================
// 7. DOM READY - SEMUA EVENT LISTENER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('SDN Gambirono 01 website loaded');
    
    // ---- Close menu when clicking a link ----
    document.querySelectorAll('.navbar-menu a').forEach(link => {
        link.addEventListener('click', function() {
            const menu = document.getElementById('navbarMenu');
            if (menu) menu.classList.remove('active');
            
            const icon = document.querySelector('.navbar-toggle i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // ---- Active link on scroll ----
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-menu a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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
        if (backToTop) {
            backToTop.style.display = (window.pageYOffset > 300) ? 'flex' : 'none';
        }
    });
    
    // ---- Galeri click → Lightbox ----
    document.querySelectorAll('.galeri-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img').src;
            const caption = this.querySelector('.galeri-overlay h4').innerHTML;
            openLightbox(img, caption);
        });
    });
    
    // ---- Escape key → close lightbox ----
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });
    
    // ---- Tryout observer ----
    const tryoutSection = document.querySelector('.tryout-tka');
    if (tryoutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('fade-in');
            });
        }, { threshold: 0.1 });
        observer.observe(tryoutSection);
    }
    
    // ---- Panggil fungsi absensi ----
    if (typeof tampilkanJumlahSiswa === 'function') tampilkanJumlahSiswa();
    if (typeof setupRealTimeSearch === 'function') setupRealTimeSearch();
    if (typeof renderAbsensi === 'function') renderAbsensi();
});


// ============================================
// ABSENSI SISWA - SESUAI SPREADSHEET
// ============================================

const APPS_SCRIPT_URL_SISWA = 'https://script.google.com/macros/s/AKfycbyILi1afr5ghuHoBJaPflne-m3ZiWw7zLds6s9WaLcfFl0szVrCSEEdYODkwkK8Kk9o/exec';
const APPS_SCRIPT_URL_ABSENSI = 'https://script.google.com/macros/s/AKfycbxFB9fvp9y2P2BIJeqEdiY7wJm9DUdQ_3D74vrBXxFcpCrYUbq1JaNwk-WPBdPj6MNR/exec';

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

async function fetchAbsensiHariIni() {
    try {
        const today = new Date().toISOString().split('T')[0];
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

function formatTanggalIndonesia(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

async function renderAbsensi() {
    const gridContainer = document.getElementById('absensiGrid');
    if (!gridContainer) {
        console.log('⚠️ Elemen absensiGrid tidak ditemukan');
        return;
    }

    const today = new Date();
    const tanggalSpan = document.getElementById('tanggalAbsensi');
    if (tanggalSpan) {
        tanggalSpan.textContent = formatTanggalIndonesia(today);
    }

    gridContainer.innerHTML = '<div class="loading-absensi"><i class="fas fa-spinner fa-spin"></i> Memuat data absensi...</div>';

    try {
        const [jumlahSiswaData, absensiData] = await Promise.all([
            fetchJumlahSiswa(),
            fetchAbsensiHariIni()
        ]);

        console.log('Jumlah siswa data:', jumlahSiswaData);
        console.log('Absensi data:', absensiData);

        const jumlahMap = new Map();
        jumlahSiswaData.forEach(item => {
            const kelas = item.kelas || item.KELAS;
            const total = parseInt(item.total || item.TOTAL || 0);
            if (kelas && total > 0) {
                jumlahMap.set(kelas, total);
            }
        });

        const absensiMap = new Map();
        absensiData.forEach(item => {
            const kelas = item.KELAS;
            const status = item.STATUS;
            if (!kelas) return;
            
            if (!absensiMap.has(kelas)) {
                absensiMap.set(kelas, { tepatWaktu: 0, terlambat: 0, pulang: 0 });
            }
            const stat = absensiMap.get(kelas);
            
            if (status === 'TEPAT WAKTU') stat.tepatWaktu++;
            else if (status === 'TERLAMBAT') stat.terlambat++;
            else if (status === 'PULANG') stat.pulang++;
        });

        const urutanKelas = ['3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];

        const kelasData = [];
        for (const kelas of urutanKelas) {
            const totalSiswa = jumlahMap.get(kelas) || 0;
            const absen = absensiMap.get(kelas) || { tepatWaktu: 0, terlambat: 0, pulang: 0 };
            
            const persenTepatWaktu = totalSiswa > 0 ? Math.round((absen.tepatWaktu / totalSiswa) * 100) : 0;
            const persenTerlambat = totalSiswa > 0 ? Math.round((absen.terlambat / totalSiswa) * 100) : 0;
            const persenPulang = totalSiswa > 0 ? Math.round((absen.pulang / totalSiswa) * 100) : 0;
            
            kelasData.push({
                kelas, totalSiswa,
                tepatWaktu: absen.tepatWaktu,
                terlambat: absen.terlambat,
                pulang: absen.pulang,
                persenTepatWaktu, persenTerlambat, persenPulang
            });
        }

        const kelasDenganData = kelasData.filter(k => k.totalSiswa > 0);
        
        if (kelasDenganData.length === 0) {
            gridContainer.innerHTML = '<div class="no-data-absensi"><i class="fas fa-exclamation-triangle"></i> Tidak ada data jumlah siswa.</div>';
            return;
        }

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

        gridContainer.innerHTML = kelasDenganData.map(k => {
            const statusClass = getStatusClass(k.persenTepatWaktu);
            const statusText = getStatusText(k.persenTepatWaktu);
            
            return `
                <div class="absensi-card">
                    <div class="absensi-card-header">
                        <h3>Kelas ${k.kelas}</h3>
                        <span class="badge-kelas">${k.totalSiswa} Siswa</span>
                    </div>
                    <div class="ringkasan-jumlah">
                        <span class="label">Jumlah Siswa</span>
                        <span class="value">${k.totalSiswa}</span>
                    </div>
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
                    <div class="prosentase-container">
                        <div class="prosentase-title">Prosentase</div>
                        <div class="prosentase-tiga-kolom">
                            <div class="prosentase-item datang">
                                <span class="label">Tepat Waktu</span>
                                <span class="value">${k.persenTepatWaktu}%</span>
                                <div class="progress-mini"><div class="progress-mini-bar datang" style="width: ${k.persenTepatWaktu}%"></div></div>
                            </div>
                            <div class="prosentase-item terlambat">
                                <span class="label">Terlambat</span>
                                <span class="value">${k.persenTerlambat}%</span>
                                <div class="progress-mini"><div class="progress-mini-bar terlambat" style="width: ${k.persenTerlambat}%"></div></div>
                            </div>
                            <div class="prosentase-item pulang">
                                <span class="label">Pulang</span>
                                <span class="value">${k.persenPulang}%</span>
                                <div class="progress-mini"><div class="progress-mini-bar pulang" style="width: ${k.persenPulang}%"></div></div>
                            </div>
                        </div>
                    </div>
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

const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzRshWZcPbXfYy_60LPxNW48oQtBif2B57_LhDsZa9M4SNytKWm_9MfolVroOYXmScW/exec';

let currentIjazahData = null;

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
    
    const loginForm = document.getElementById('loginForm');
    const hasilTracking = document.getElementById('hasilTracking');
    const loadingTracking = document.getElementById('loadingTracking');
    
    if (loginForm) loginForm.style.display = 'none';
    if (hasilTracking) hasilTracking.style.display = 'none';
    if (loadingTracking) loadingTracking.style.display = 'block';
    
    try {
        const response = await fetch(WEBAPP_URL + '?nisn=' + encodeURIComponent(nisn));
        const data = await response.json();
        
        console.log('Response dari server:', data);
        
        if (data.status === 'found') {
            currentIjazahData = {
                nisn: data.nisn || nisn,
                nama: data.nama || '-',
                tahun: data.tahun || '-',
                link: data.link || '',
                nomorIjazah: data.nomorIjazah || '-',
                nomorTranskrip: data.nomorTranskrip || '-'
            };
            
            const resultNISN = document.getElementById('resultNISN');
            const resultNama = document.getElementById('resultNama');
            const resultTahun = document.getElementById('resultTahun');
            const resultNomorIjazah = document.getElementById('resultNomorIjazah');
            const resultNomorTranskrip = document.getElementById('resultNomorTranskrip');
            
            if (resultNISN) resultNISN.innerHTML = currentIjazahData.nisn;
            if (resultNama) resultNama.innerHTML = currentIjazahData.nama;
            if (resultTahun) resultTahun.innerHTML = currentIjazahData.tahun;
            if (resultNomorIjazah) resultNomorIjazah.innerHTML = currentIjazahData.nomorIjazah;
            if (resultNomorTranskrip) resultNomorTranskrip.innerHTML = currentIjazahData.nomorTranskrip;
            
            updateLinkButton();
            
            if (loadingTracking) loadingTracking.style.display = 'none';
            if (hasilTracking) hasilTracking.style.display = 'block';
            
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

function updateLinkButton() {
    const linkContainer = document.getElementById('linkContainer');
    if (!linkContainer) return;
    
    if (currentIjazahData && currentIjazahData.link && currentIjazahData.link !== '') {
        linkContainer.innerHTML = `
            <a href="${currentIjazahData.link}" target="_blank" class="ijazah-link">
                <i class="fas fa-download"></i> Download / Lihat Ijazah
            </a>
        `;
    } else {
        linkContainer.innerHTML = `
            <button class="ijazah-link-disabled">
                <i class="fas fa-clock"></i> Ijazah Belum Tersedia
            </button>
        `;
    }
}

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

window.downloadIjazah = function() {
    if (currentIjazahData && currentIjazahData.link && currentIjazahData.link !== '') {
        window.open(currentIjazahData.link, '_blank');
    } else {
        alert('Maaf, file ijazah belum tersedia. Silakan hubungi admin sekolah.');
    }
};

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

const BUKU_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzDBHP0w7Yyvq1PtxJuA_c51yG7T0uexW9dP_8Oo4cVBrNl-3p28JpqRALBEkug1aH8/exec';

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
    
    document.getElementById('bukuLoginForm').style.display = 'none';
    document.getElementById('hasilBukuInduk').style.display = 'none';
    document.getElementById('loadingBuku').style.display = 'block';
    
    try {
        const response = await fetch(BUKU_WEBAPP_URL + '?nisn=' + encodeURIComponent(nisn));
        const data = await response.json();
        
        console.log('Data Buku Induk:', data);
        
        if (data.status === 'found') {
            if (data.biodata) {
                displayBiodata(data.biodata);
            } else {
                document.getElementById('biodataSiswa').innerHTML = '<p style="padding:10px;color:#666;">Data biodata tidak tersedia</p>';
            }
            
            document.getElementById('bukuNama').innerHTML = data.nama;
            document.getElementById('bukuNISN').innerHTML = data.nisn;
            
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
    
    let tglLahir = biodata.tanggalLahir || '-';
    if (tglLahir !== '-' && tglLahir !== '') {
        try {
            const date = new Date(tglLahir);
            if (!isNaN(date.getTime())) {
                tglLahir = date.toLocaleDateString('id-ID', {
                    day: '2-digit', month: 'long', year: 'numeric'
                });
            }
        } catch (e) {}
    }
    
    let jk = biodata.jenisKelamin || '-';
    if (jk.toLowerCase() === 'l' || jk.toLowerCase() === 'laki-laki') jk = 'Laki-laki';
    else if (jk.toLowerCase() === 'p' || jk.toLowerCase() === 'perempuan') jk = 'Perempuan';
    
    container.innerHTML = `
        <div class="biodata-grid">
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
}

function displayRiwayatKotak(riwayatList) {
    const container = document.getElementById('riwayatKotak');
    if (!container) return;
    
    if (!riwayatList || riwayatList.length === 0) {
        container.innerHTML = '<div class="no-data-buku"><i class="fas fa-folder-open"></i><p>Belum ada riwayat nilai</p></div>';
        return;
    }
    
    // ✅ SORT: Kelas ASC → Semester ASC
    riwayatList.sort((a, b) => {
        const kelasA = parseInt(a.kelas) || 0;
        const kelasB = parseInt(b.kelas) || 0;
        
        // Urutkan berdasarkan kelas dulu
        if (kelasA !== kelasB) return kelasA - kelasB;
        
        // Kalau kelas sama, urutkan berdasarkan semester
        const semA = parseInt(a.semester) || 0;
        const semB = parseInt(b.semester) || 0;
        return semA - semB;
    });
    
    let html = '';
    
    riwayatList.forEach((item) => {
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
        
        const rataRata = item.rt || (item.jml / 10).toFixed(1);
        
        let rataClass = '';
        if (rataRata >= 85) rataClass = 'rata-rata-bagus';
        else if (rataRata >= 70) rataClass = '';
        else if (rataRata >= 60) rataClass = 'rata-rata-cukup';
        else rataClass = 'rata-rata-kurang';
        
        html += `
            <div class="kotak-semester">
                <div class="semester-header">
                    <h3><i class="fas fa-calendar-alt"></i> Kelas ${item.kelas} - Semester ${item.semester}</h3>
                    <div class="semester-badge">
                        <i class="fas fa-calendar"></i>
                        Tahun ${item.tahun}
                    </div>
                </div>
                <div class="nilai-grid">
        `;
        
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

window.logoutBuku = function() {
    document.getElementById('hasilBukuInduk').style.display = 'none';
    document.getElementById('bukuLoginForm').style.display = 'block';
    document.getElementById('bukuNisnInput').value = '';
    sessionStorage.removeItem('buku_nisn');
};

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
