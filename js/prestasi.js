// ============================================
// PRESTASI SISWA — DATA & RENDER
// ============================================

// Path ke folder foto prestasi (relatif dari halaman prestasi/)
const FOTO_PRESTASI_PATH = '../images/prestasi/';

// ============ DATA PRESTASI (HARDCODE) ============
const dataPrestasi = [
    { 
        tahun: '2026', 
        nama: 'M. Ferdy Firmansyah', 
        lomba: 'Juara Harapan 2 O2SN Atletik Kids', 
        foto: '2026_ferdi.jpg' 
    },
    { 
        tahun: '2026', 
        nama: 'Siti Nuraini', 
        lomba: 'Juara 3 O2SN Atletik Kids', 
        foto: '2026_siti.jpg' 
    },
{ 
        tahun: '2026', 
        nama: 'Nomor Dada 63', 
        lomba: 'Juara 2 Gerak Jalan', 
        foto: '2026_63.jpg' 
    },
{ 
        tahun: '2026', 
        nama: 'Nomor Dada 124', 
        lomba: 'Juara 3 Gerak Jalan', 
        foto: '2026_124.jpg' 
    },
{ 
        tahun: '2026', 
        nama: 'Nomor Dada 164', 
        lomba: 'Juara Harapan 2 Gerak Jalan', 
        foto: '2026_164.jpg' 
    },
    // Tambahkan data lain di sini
];

// ============================================
// RENDER PRESTASI
// ============================================
function renderPrestasi(filterTahun = 'all') {
    const container = document.getElementById('prestasiContainer');
    if (!container) return;
    
    // Filter berdasarkan tahun
    let data = dataPrestasi;
    if (filterTahun && filterTahun !== 'all') {
        data = dataPrestasi.filter(p => p.tahun === filterTahun);
    }
    
    // Kosongkan container
    container.innerHTML = '';
    
    if (data.length === 0) {
        container.innerHTML = `
            <div class="empty-prestasi">
                <i class="fas fa-trophy"></i>
                <p>Belum ada prestasi untuk tahun ini</p>
            </div>
        `;
        return;
    }
    
    // Render kartu prestasi
    data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'prestasi-card';
        card.innerHTML = `
            <div class="prestasi-foto-wrapper">
                <img src="${FOTO_PRESTASI_PATH}${item.foto}" 
                     alt="${item.nama}" 
                     class="prestasi-foto"
                     onerror="this.onerror=null; this.src='${FOTO_PRESTASI_PATH}default.jpg'; this.parentElement.classList.add('no-image');">
                <div class="prestasi-badge">
                    <i class="fas fa-trophy"></i> ${item.tahun}
                </div>
            </div>
            <div class="prestasi-info">
                <h3 class="prestasi-nama">${item.nama}</h3>
                <p class="prestasi-lomba">${item.lomba}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// ============================================
// FILTER TAHUN
// ============================================
function renderFilterButtons() {
    const filterContainer = document.getElementById('filterButtons');
    if (!filterContainer) return;
    
    // Ambil tahun unik
    const tahunSet = new Set(dataPrestasi.map(p => p.tahun));
    const tahuns = Array.from(tahunSet).sort((a, b) => b - a); // Terbaru dulu
    
    // Kosongkan
    filterContainer.innerHTML = '';
    
    // Tombol "Semua"
    const btnAll = document.createElement('button');
    btnAll.className = 'prestasi-filter-btn active';
    btnAll.textContent = 'Semua';
    btnAll.dataset.tahun = 'all';
    btnAll.onclick = () => setFilter('all', btnAll);
    filterContainer.appendChild(btnAll);
    
    // Tombol per tahun
    tahuns.forEach(tahun => {
        const btn = document.createElement('button');
        btn.className = 'prestasi-filter-btn';
        btn.textContent = tahun;
        btn.dataset.tahun = tahun;
        btn.onclick = () => setFilter(tahun, btn);
        filterContainer.appendChild(btn);
    });
}

function setFilter(tahun, btn) {
    // Update active
    document.querySelectorAll('.prestasi-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Render dengan filter
    renderPrestasi(tahun);
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    renderFilterButtons();
    renderPrestasi('all');
});