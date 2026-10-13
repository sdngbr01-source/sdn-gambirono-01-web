/* ============================================
   BREADCRUMB HELPER — v3 (Fix Path Kesiswaan)
   ============================================ */

(function() {
    'use strict';
    
    const script = document.currentScript;
    if (!script) return;
    
    const base = script.getAttribute('data-base') || '../';
    const breadcrumbData = script.getAttribute('data-breadcrumb') || '';
    const categoryUrl = script.getAttribute('data-category-url') || '';
    const hideNavbar = script.getAttribute('data-hide-navbar') === 'true';
    const section = script.getAttribute('data-section') || '';
    const sectionActive = script.getAttribute('data-section-active') || '';
    
    // ============================================
    // DETEKSI PATH — apakah kita di folder kesiswaan?
    // ============================================
    const currentPath = window.location.pathname;
    const isInKesiswaanFolder = currentPath.includes('/kesiswaan/');
    
    // Prefix yang aman untuk link kesiswaan
    // - Kalau di folder kesiswaan: pakai nama file langsung (data-siswa.html)
    // - Kalau di luar (spmb/, alumni/): pakai ../kesiswaan/data-siswa.html
    const kesiswaanPrefix = isInKesiswaanFolder ? '' : base + 'kesiswaan/';
    
    // Prefix untuk SPMB & Alumni
    // - Kalau di folder kesiswaan: ../spmb/spmb.html
    // - Kalau di folder spmb/alumni sendiri: ../spmb/spmb.html juga
    const spmbPrefix = base + 'spmb/';
    const alumniPrefix = base + 'alumni/';
    
    console.log('🚀 Breadcrumb Helper v3');
    console.log('   section:', section);
    console.log('   inKesiswaanFolder:', isInKesiswaanFolder);
    console.log('   kesiswaanPrefix:', kesiswaanPrefix || '(langsung)');
    
    // ============================================
    // KONFIGURASI SECTION
    // ============================================
    const SECTIONS = {
        profil: {
            label: 'Profil Sekolah',
            icon: 'fa-school',
            layout: 'sidebar',
            menus: [
                { key: 'profil', href: 'profil.html', icon: 'fa-school', label: 'Profil Sekolah' },
                { key: 'visi-misi', href: 'profil.html#visi-misi', icon: 'fa-bullseye', label: 'Visi & Misi' },
                { key: 'sambutan', href: 'profil.html#sambutan', icon: 'fa-user-tie', label: 'Sambutan Kepsek' },
                { key: 'fasilitas', href: 'profil.html#fasilitas', icon: 'fa-building', label: 'Fasilitas' }
            ]
        },
        guru: {
            label: 'Guru & Tendik',
            icon: 'fa-chalkboard-teacher',
            layout: 'sidebar',
            menus: [
                { key: 'semua', href: 'guru.html', icon: 'fa-users', label: 'Semua Guru' },
                { key: 'kepsek', href: 'guru.html#kepsek', icon: 'fa-user-tie', label: 'Kepala Sekolah' },
                { key: 'guru-kelas', href: 'guru.html#guru-kelas', icon: 'fa-chalkboard', label: 'Guru Kelas' },
                { key: 'guru-mapel', href: 'guru.html#guru-mapel', icon: 'fa-book', label: 'Guru Mapel' },
                { key: 'tendik', href: 'guru.html#tendik', icon: 'fa-user-cog', label: 'Tenaga Kependidikan' }
            ]
        },
        prestasi: {
            label: 'Prestasi Siswa',
            icon: 'fa-trophy',
            layout: 'sidebar',
            menus: [
                { key: 'semua', href: 'prestasi.html', icon: 'fa-trophy', label: 'Semua Prestasi' },
                { key: 'akademik', href: 'prestasi.html#akademik', icon: 'fa-graduation-cap', label: 'Akademik' },
                { key: 'non-akademik', href: 'prestasi.html#non-akademik', icon: 'fa-futbol', label: 'Non-Akademik' },
                { key: 'olahraga', href: 'prestasi.html#olahraga', icon: 'fa-running', label: 'Olahraga' },
                { key: 'seni', href: 'prestasi.html#seni', icon: 'fa-palette', label: 'Seni' }
            ]
        },
        jurnal: {
            label: 'Jurnal Siswa',
            icon: 'fa-book-open',
            layout: 'sidebar',
            menus: [
                { key: 'semua', href: 'jurnal.html', icon: 'fa-book-open', label: 'Semua Jurnal' },
                { key: 'kaih', href: 'jurnal.html#kaih', icon: 'fa-star', label: '7 Kebiasaan Anak Hebat' },
                { key: 'ramadhan', href: 'jurnal.html#ramadhan', icon: 'fa-mosque', label: 'Jurnal Ramadhan' }
            ]
        },
        assessment: {
            label: 'Assessment',
            icon: 'fa-clipboard-check',
            layout: 'sidebar',
            menus: [
                { key: 'semua', href: 'assessment.html', icon: 'fa-clipboard-list', label: 'Semua Assessment' },
                { key: 'tryout', href: 'assessment.html#tryout', icon: 'fa-graduation-cap', label: 'Tryout TKA' },
                { key: 'asa6', href: 'assessment.html#asa6', icon: 'fa-clipboard-list', label: 'ASA Kelas 6' },
                { key: 'asa4', href: 'assessment.html#asa4', icon: 'fa-users', label: 'ASA Kelas 4' },
                { key: 'asa5', href: 'assessment.html#asa5', icon: 'fa-user-astronaut', label: 'ASA Kelas 5' },
                { key: 'asaj', href: 'assessment.html#asaj', icon: 'fa-star-of-life', label: 'ASAJ' }
            ]
        },
        kalender: {
            label: 'Kalender Pendidikan',
            icon: 'fa-calendar-alt',
            layout: 'sidebar',
            menus: [
                { key: 'semua', href: 'kalender.html', icon: 'fa-calendar-alt', label: 'Kalender 2026/2027' },
                { key: 'dashboard', href: 'kalender.html#dashboard', icon: 'fa-chart-simple', label: 'Dashboard' },
                { key: 'kaldik', href: 'kalender.html#kaldik', icon: 'fa-table', label: 'Kaldik' },
                { key: 'bulanan', href: 'kalender.html#bulanan', icon: 'fa-calendar-days', label: 'Kalender Bulanan' }
            ]
        },
        galeri: {
            label: 'Galeri',
            icon: 'fa-images',
            layout: 'sidebar',
            menus: [
                { key: 'semua', href: 'galeri.html', icon: 'fa-images', label: 'Semua Galeri' },
                { key: 'upacara', href: 'galeri.html#upacara', icon: 'fa-flag', label: 'Upacara' },
                { key: 'belajar', href: 'galeri.html#belajar', icon: 'fa-book-reader', label: 'Kegiatan Belajar' },
                { key: 'olahraga', href: 'galeri.html#olahraga', icon: 'fa-futbol', label: 'Olahraga' },
                { key: 'ekstra', href: 'galeri.html#ekstra', icon: 'fa-puzzle-piece', label: 'Ekstrakurikuler' },
                { key: 'lomba', href: 'galeri.html#lomba', icon: 'fa-medal', label: 'Lomba' }
            ]
        },
        kontak: {
            label: 'Kontak',
            icon: 'fa-address-book',
            layout: 'sidebar',
            menus: [
                { key: 'semua', href: 'kontak.html', icon: 'fa-address-book', label: 'Kontak & Sosmed' }
            ]
        },
        surat: {
            label: 'Surat Menyurat',
            icon: 'fa-envelope',
            layout: 'sidebar',
            menus: [
                { key: 'surat', href: 'surat.html', icon: 'fa-envelope', label: 'Dashboard Surat' },
                { key: 'buat', href: 'surat1.html', icon: 'fa-pen-fancy', label: 'Buat Surat' }
            ]
        },
        kesiswaan: {
            label: 'Kesiswaan',
            icon: 'fa-users',
            layout: 'sidebar',
            menus: [
                { key: 'dashboard', href: kesiswaanPrefix + 'kesiswaan.html', icon: 'fa-th-large', label: 'Dashboard' },
                { key: 'data-siswa', href: kesiswaanPrefix + 'data-siswa.html', icon: 'fa-users', label: 'Data Siswa' },
                { key: 'mutasi', href: kesiswaanPrefix + 'mutasi-siswa.html', icon: 'fa-exchange-alt', label: 'Mutasi Siswa' },
                { key: 'absensi', href: kesiswaanPrefix + 'absensi.html', icon: 'fa-fingerprint', label: 'E-Absensi' },
                { key: 'buku-induk', href: kesiswaanPrefix + 'buku-induk.html', icon: 'fa-book', label: 'Buku Induk' },
                { key: 'arsip-ijazah', href: kesiswaanPrefix + 'arsip-ijazah.html', icon: 'fa-search', label: 'Arsip Ijazah' },
                { divider: true },
                { key: 'spmb', href: spmbPrefix + 'spmb.html', icon: 'fa-user-graduate', label: 'SPMB' },
                { key: 'alumni', href: alumniPrefix + 'alumni.html', icon: 'fa-history', label: 'History Alumni' }
            ]
        }
    };
    
    // ============================================
    // BUILD NAVBAR HTML
    // ============================================
    function buildNavbarHTML() {
        if (hideNavbar) return '';
        
        if (section && SECTIONS[section]) {
            const sectionData = SECTIONS[section];
            
            let menusHTML = '';
            sectionData.menus.forEach(m => {
                if (m.divider) {
                    menusHTML += '<li class="nav-divider"></li>';
                    return;
                }
                const isActive = m.key === sectionActive ? 'active' : '';
                menusHTML += `<li><a href="${m.href}" class="${isActive}"><i class="fas ${m.icon}"></i><span>${m.label}</span></a></li>`;
            });
            
            return `
            <nav class="navbar navbar-section" data-section="${section}" data-layout="${sectionData.layout || 'sidebar'}">
                <div class="container">
                    <a href="${base}index.html" class="navbar-logo">
                        <img src="${base}images/logo/sdn.png" alt="Logo SDN Gambirono 01" class="logo-img">
                        <div class="logo-text">
                            <h1>SDN GAMBIRONO 01</h1>
                            <p>Smart School</p>
                        </div>
                    </a>
                    <div class="navbar-menu" id="navbarMenu">
                        <ul>
                            <li><a href="${base}index.html" class="nav-home"><i class="fas fa-home"></i><span> Beranda</span></a></li>
                            <li class="nav-divider"></li>
                            <li class="nav-section-label">
                                <i class="fas ${sectionData.icon}"></i>
                                <span>${sectionData.label}</span>
                            </li>
                            ${menusHTML}
                        </ul>
                    </div>
                    <button class="navbar-toggle" onclick="toggleMenu()" aria-label="Menu">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </nav>
            `;
        }
        
        return `
        <nav class="navbar">
            <div class="container">
                <a href="${base}index.html" class="navbar-logo">
                    <img src="${base}images/logo/sdn.png" alt="Logo SDN Gambirono 01" class="logo-img">
                    <div class="logo-text">
                        <h1>SDN GAMBIRONO 01</h1>
                        <p>Smart School</p>
                    </div>
                </a>
                <div class="navbar-menu" id="navbarMenu">
                    <ul>
                        <li><a href="${base}index.html">Beranda</a></li>
                        <li><a href="${base}profil/profil.html">Profil Sekolah</a></li>
                        <li><a href="${base}guru/guru.html">Guru & Tendik</a></li>
                        <li><a href="${base}prestasi/prestasi.html">Prestasi Siswa</a></li>
                        <li><a href="${base}jurnal/jurnal.html">Jurnal Siswa</a></li>
                        <li><a href="${base}assessment/assessment.html">Assesment</a></li>
                        <li class="nav-parent">
                            <a href="javascript:void(0)" class="nav-parent-link">Kesiswaan <i class="fas fa-chevron-down"></i></a>
                            <ul class="nav-submenu">
                                <li><a href="${base}kesiswaan/kesiswaan.html"><i class="fas fa-th-large"></i> Dashboard</a></li>
                                <li><a href="${base}kesiswaan/data-siswa.html"><i class="fas fa-users"></i> Data Siswa</a></li>
                                <li><a href="${base}kesiswaan/mutasi-siswa.html"><i class="fas fa-exchange-alt"></i> Mutasi Siswa</a></li>
                                <li><a href="${base}kesiswaan/absensi.html"><i class="fas fa-fingerprint"></i> E-Absensi</a></li>
                                <li><a href="${base}kesiswaan/buku-induk.html"><i class="fas fa-book"></i> Buku Induk</a></li>
                                <li><a href="${base}kesiswaan/arsip-ijazah.html"><i class="fas fa-search"></i> Arsip Ijazah</a></li>
                                <li><a href="${base}spmb/spmb.html"><i class="fas fa-user-graduate"></i> SPMB</a></li>
                                <li><a href="${base}alumni/alumni.html"><i class="fas fa-history"></i> History Alumni</a></li>
                            </ul>
                        </li>
                        <li><a href="${base}kalender/kalender.html">Kalender</a></li>
                        <li><a href="${base}galeri/galeri.html">Galeri</a></li>
                        <li><a href="${base}surat/surat.html">Surat</a></li>
                        <li><a href="${base}kontak/kontak.html">Kontak</a></li>
                    </ul>
                </div>
                <button class="navbar-toggle" onclick="toggleMenu()" aria-label="Menu">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </nav>
        `;
    }
    
    // ============================================
    // BUILD FOOTER HTML
    // ============================================
    function buildFooterHTML() {
        return `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-logo">
                        <img src="${base}images/logo/sdn.png" alt="Logo SDN Gambirono 01">
                        <h3>SDN Gambirono 01</h3>
                        <p>Smart School</p>
                    </div>
                    <div class="footer-links">
                        <h4>Link Cepat</h4>
                        <ul>
                            <li><a href="${base}index.html">Beranda</a></li>
                            <li><a href="${base}profil/profil.html">Profil Sekolah</a></li>
                            <li><a href="${base}guru/guru.html">Guru & Tendik</a></li>
                            <li><a href="${base}kesiswaan/data-siswa.html">Data Siswa</a></li>
                            <li><a href="${base}galeri/galeri.html">Galeri</a></li>
                        </ul>
                    </div>
                    <div class="footer-jurnal">
                        <h4>Akses Jurnal</h4>
                        <ul>
                            <li><a href="https://7-kaih-baru-2026.vercel.app/" target="_blank"><i class="fas fa-external-link-alt"></i> 7 Kebiasaan Anak Hebat</a></li>
                            <li><a href="https://jurnal-ramadhan-1447-h.vercel.app/index.html" target="_blank"><i class="fas fa-external-link-alt"></i> Jurnal Ramadhan 1447 H</a></li>
                        </ul>
                    </div>
                    <div class="footer-sosmed">
                        <h4>Media Sosial</h4>
                        <div class="sosmed-icons">
                            <a href="https://www.tiktok.com/@sdn.gambirono.01" target="_blank"><i class="fab fa-tiktok"></i></a>
                            <a href="https://www.instagram.com/sdngambirono_01" target="_blank"><i class="fab fa-instagram"></i></a>
                            <a href="https://youtube.com/@sdngambirono01" target="_blank"><i class="fab fa-youtube"></i></a>
                            <a href="https://www.facebook.com/GAMBIRONOSATU" target="_blank"><i class="fab fa-facebook-f"></i></a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2026 SDN Gambirono 01. All rights reserved.</p>
                </div>
            </div>
        </footer>
        <button id="backToTop" class="back-to-top" onclick="scrollToTop()">
            <i class="fas fa-arrow-up"></i>
        </button>
        `;
    }
    
    // ============================================
    // BUILD BREADCRUMB HTML
    // ============================================
    function buildBreadcrumbHTML() {
        if (!breadcrumbData) return '';
        
        let categoryName = '';
        let pageName = '';
        
        if (breadcrumbData.includes('|')) {
            const parts = breadcrumbData.split('|').map(s => s.trim());
            categoryName = parts[0];
            pageName = parts[1] || parts[0];
        } else {
            pageName = breadcrumbData.trim();
        }
        
        let html = '<nav class="breadcrumb-big" aria-label="Breadcrumb">';
        html += `<a href="${base}index.html" class="bc-item bc-home"><i class="fas fa-home"></i><span>Beranda</span></a>`;
        
        if (categoryName) {
            html += `<span class="bc-separator"><i class="fas fa-chevron-right"></i></span>`;
            if (categoryUrl) {
                html += `<a href="${base}${categoryUrl}" class="bc-item">${categoryName}</a>`;
            } else {
                html += `<span class="bc-item">${categoryName}</span>`;
            }
        }
        
        html += `<span class="bc-separator"><i class="fas fa-chevron-right"></i></span>`;
        html += `<span class="bc-item bc-active">${pageName}</span>`;
        html += '</nav>';
        
        return html;
    }
    
    // ============================================
    // INJECT
    // ============================================
    function injectAll() {
        const navPlaceholder = document.getElementById('navbar-placeholder');
        if (navPlaceholder) navPlaceholder.innerHTML = buildNavbarHTML();
        
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) footerPlaceholder.innerHTML = buildFooterHTML();
        
        const breadcrumbContainer = document.getElementById('breadcrumb-placeholder');
        if (breadcrumbContainer) breadcrumbContainer.innerHTML = buildBreadcrumbHTML();
        
        if (hideNavbar) document.body.classList.add('no-navbar');
        
        if (section) {
            document.body.classList.add('section-' + section);
            
            const sectionData = SECTIONS[section];
            const layout = sectionData ? (sectionData.layout || 'sidebar') : 'sidebar';
            
            if (layout === 'sidebar') {
                document.body.classList.add('section-mode');
            } else {
                document.body.classList.add('no-sidebar-mode');
            }
            
            console.log('✅ Layout:', layout, '| Section:', section);
        }
    }
    
    window.toggleMenu = function() {
        const menu = document.getElementById('navbarMenu');
        if (menu) menu.classList.toggle('active');
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectAll);
    } else {
        injectAll();
    }
})();