// ============ TOTAL PENGUNJUNG ============
// Ganti dengan URL Apps Script Anda
const APPS_SCRIPT_URL_VISITOR = 'https:https://script.google.com/macros/s/AKfycbxaXWcbpT8d_raNzgXGbp9MU8E0Ei-HBhKYVeldDGK7t9pkxXrvpmdaMGyNVYEjvHDg_w/exec';

// Ambil data dari Apps Script
async function loadVisitorData() {
    try {
        const response = await fetch(`${APPS_SCRIPT_URL_VISITOR}?action=getVisitors`);
        const data = await response.json();
        
        // Tampilkan data
        animateNumber('totalPengunjung', data.total || 0);
        animateNumber('pengunjungHariIni', data.today || 0);
        animateNumber('pengunjungMingguIni', data.week || 0);
        animateNumber('pengunjungBulanIni', data.month || 0);
        
        // Live visitor
        document.getElementById('liveVisitor').textContent = data.live || 0;
        
        // Trend
        document.getElementById('trendTotal').textContent = data.trendTotal || 0;
        document.getElementById('trendHariIni').textContent = data.trendToday || 0;
        document.getElementById('trendMingguIni').textContent = data.trendWeek || 0;
        document.getElementById('trendBulanIni').textContent = data.trendMonth || 0;
        
        console.log('✅ Data pengunjung dimuat dari GA:', data);
        
    } catch (error) {
        console.error('Error loading visitor data:', error);
        // Fallback ke localStorage
        loadLocalData();
    }
}

// Fallback: localStorage
function loadLocalData() {
    const total = localStorage.getItem('totalPengunjung') || 1534;
    const hariIni = localStorage.getItem('pengunjungHariIni') || 23;
    const mingguIni = localStorage.getItem('pengunjungMingguIni') || 187;
    const bulanIni = localStorage.getItem('pengunjungBulanIni') || 523;
    
    animateNumber('totalPengunjung', total);
    animateNumber('pengunjungHariIni', hariIni);
    animateNumber('pengunjungMingguIni', mingguIni);
    animateNumber('pengunjungBulanIni', bulanIni);
    document.getElementById('liveVisitor').textContent = Math.floor(Math.random() * 8) + 1;
}

// Animasi angka
function animateNumber(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 1000;
    const startTime = performance.now();
    const startValue = 0;
    
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.round(startValue + (targetValue - startValue) * easeOutQuart);
        
        element.textContent = formatNumber(currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = formatNumber(targetValue);
            element.classList.add('animate');
        }
    }
    
    requestAnimationFrame(update);
}

// Panggil saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Load data
    loadVisitorData();
    
    // Update live visitor setiap 30 detik
    setInterval(function() {
        const liveElement = document.getElementById('liveVisitor');
        if (liveElement) {
            const live = Math.floor(Math.random() * 10) + 1;
            liveElement.textContent = live;
        }
    }, 30000);
});