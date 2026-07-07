// ============ KONFIGURASI PRESTASI ============
const PRESTASI_CONFIG = {
    IMAGE_PATH: 'images/prestasi/',
    DEFAULT_IMAGE: 'images/prestasi/default.jpg'
};

// ============ DATA PRESTASI (HARDCODE) ============
const dataPrestasi = [
    { tahun: '2026', nama: 'M. Ferdy Firmasnsyah', lomba: 'Juara Harapan 2 O2SN Atletik Kids', foto: '2026_ferdi.jpg' },
    { tahun: '2026', nama: 'Siti Nuraini', lomba: 'Juara 3 O2SN Atletik Kids', foto: '2026_siti.jpg' },

];

// ============ FLAG CEGAH LOAD ULANG ============
let isRendered = false;

// ============ RENDER PRESTASI ============
function renderPrestasi(data) {
    const container = document.getElementById('prestasiContainer');
    if (!container) {
        console.warn('⚠️ Elemen prestasiContainer tidak ditemukan');
        return;
    }

    // CEGAH RENDER ULANG
    if (isRendered) {
        console.log('ℹ️ Prestasi sudah dirender, skip');
        return;
    }

    // Jika data kosong
    if (!data || data.length === 0) {
        container.innerHTML = `
            <div class="prestasi-empty">
                <i class="fas fa-trophy"></i>
                <p>Belum ada data prestasi</p>
            </div>
        `;
        isRendered = true;
        return;
    }

    // Sort berdasarkan tahun terbaru
    const sortedData = [...data].sort((a, b) => parseInt(b.tahun) - parseInt(a.tahun));

    // Generate HTML
    let html = '';
    sortedData.forEach((item, index) => {
        const tahun = item.tahun || '----';
        const nama = item.nama || 'Tidak Diketahui';
        const lomba = item.lomba || 'Lomba';
        const foto = item.foto || 'default.jpg';

        // Path gambar
        const imagePath = `${PRESTASI_CONFIG.IMAGE_PATH}${foto}`;

        html += `
            <div class="prestasi-card" data-index="${index}" data-tahun="${tahun}">
                <div class="card-image">
                    <img src="${imagePath}" 
                         alt="${nama} - ${lomba} ${tahun}"
                         onerror="this.onerror=null; this.src='${PRESTASI_CONFIG.DEFAULT_IMAGE}';"
                         loading="lazy">
                    <div class="card-year">
                        <i class="fas fa-calendar-alt"></i> ${tahun}
                    </div>
                    <div class="card-badge">
                        <i class="fas fa-medal"></i> ${lomba.split(' ').slice(0, 2).join(' ')}
                    </div>
                </div>
                <div class="card-body">
                    <p class="student-name">${nama}</p>
                    <p class="lomba-name">
                        <i class="fas fa-trophy"></i> ${lomba}
                    </p>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    isRendered = true;
    console.log(`✅ Prestasi rendered: ${sortedData.length} cards (hanya sekali)`);
}

// ============ RENDER FILTER TAHUN ============
function renderFilterButtons() {
    const container = document.getElementById('filterButtons');
    if (!container) return;

    const years = getUniqueYears();

    if (years.length === 0) {
        container.innerHTML = '';
        return;
    }

    let html = `
        <button class="filter-btn active" data-year="all" onclick="filterPrestasiByYear('all')">
            Semua
        </button>
    `;
    years.forEach(year => {
        html += `
            <button class="filter-btn" data-year="${year}" onclick="filterPrestasiByYear('${year}')">
                ${year}
            </button>
        `;
    });

    container.innerHTML = html;
}

// ============ GET UNIQUE YEARS ============
function getUniqueYears() {
    const years = dataPrestasi.map(item => item.tahun).filter(Boolean);
    return [...new Set(years)].sort((a, b) => b - a);
}

// ============ FILTER PRESTASI BY TAHUN ============
function filterPrestasiByYear(tahun) {
    const container = document.getElementById('prestasiContainer');
    if (!container) return;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.year === tahun) {
            btn.classList.add('active');
        }
    });

    if (!tahun || tahun === 'all') {
        renderPrestasi(dataPrestasi);
        return;
    }

    const filtered = dataPrestasi.filter(item => String(item.tahun) === String(tahun));
    
    // Reset flag agar bisa render ulang saat filter
    isRendered = false;
    renderPrestasi(filtered);
}

// ============ INIT PRESTASI ============
function initPrestasi() {
    console.log('🏆 Init prestasi...');

    // Cegah init ulang
    if (isRendered) {
        console.log('ℹ️ Prestasi sudah di-init, skip');
        return;
    }

    // Render
    renderPrestasi(dataPrestasi);
    renderFilterButtons();

    console.log('✅ Prestasi selesai di-init (sekali saja)');
}

// ============ AUTO INIT (HANYA SEKALI) ============
let isInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    if (!isInitialized) {
        isInitialized = true;
        initPrestasi();
    }
});

// ============ EXPORT ============
window.initPrestasi = initPrestasi;
window.filterPrestasiByYear = filterPrestasiByYear;
window.getUniqueYears = getUniqueYears;
window.dataPrestasi = dataPrestasi;