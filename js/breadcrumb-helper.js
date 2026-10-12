/* ============================================
   NAVBAR AUTO-GENERATOR UNTUK HALAMAN ANAK
   Gunakan: <script src="../js/breadcrumb-helper.js" data-base="../"></script>
   ============================================ */
(function() {
    const script = document.currentScript;
    const base = script.getAttribute('data-base') || '../';
    
    const navbarHTML = `
    <nav class="navbar">
        <div class="container">
            <div class="navbar-logo">
                <a href="${base}index.html" style="display:flex; align-items:center; gap:12px; text-decoration:none; color:inherit;">
                    <img src="${base}images/logo/sdn.png" alt="Logo SDN Gambirono 01" class="logo-img">
                    <div class="logo-text">
                        <h1>SDN GAMBIRONO 01</h1>
                        <p>Smart School</p>
                    </div>
                </a>
            </div>
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
                            <li><a href="${base}kesiswaan/kesiswaan.html"><i class="fas fa-th-large"></i> Dashboard Kesiswaan</a></li>
                            <li><a href="${base}kesiswaan/data-siswa.html"><i class="fas fa-users"></i> Data Siswa</a></li>
                            <li><a href="${base}kesiswaan/mutasi-siswa.html"><i class="fas fa-exchange-alt"></i> Mutasi Siswa</a></li>
                            <li><a href="${base}kesiswaan/absensi.html"><i class="fas fa-fingerprint"></i> E-Absensi</a></li>
                            <li><a href="${base}kesiswaan/buku-induk.html"><i class="fas fa-book"></i> Buku Induk</a></li>
                            <li><a href="${base}kesiswaan/arsip-ijazah.html"><i class="fas fa-search"></i> Arsip Ijazah</a></li>
                            <li><a href="${base}spmb/spmb.html"><i class="fas fa-user-graduate"></i> SPMB</a></li>
                            <li><a href="${base}alumni/alumni.html"><i class="fas fa-history"></i> History Alumni</a></li>
                        </ul>
                    </li>
                    <li><a href="${base}kalender/kalender.html">Kalender Pendidikan</a></li>
                    <li><a href="${base}galeri/galeri.html">Galeri</a></li>
                    <li><a href="${base}surat/surat.html">Surat Menyurat</a></li>
                    <li><a href="${base}kontak/kontak.html">Kontak</a></li>
                </ul>
            </div>
            <div class="navbar-toggle" onclick="toggleMenu()">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </nav>
    `;
    
    const footerHTML = `
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
                <p>&copy; 2026 SDN Gambirono 01. All rights reserved. | Smart School</p>
            </div>
        </div>
    </footer>
    <button id="backToTop" class="back-to-top" onclick="scrollToTop()">
        <i class="fas fa-arrow-up"></i>
    </button>
    `;
    
    // Inject navbar
    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (navPlaceholder) navPlaceholder.innerHTML = navbarHTML;
    
    // Inject footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;
})();