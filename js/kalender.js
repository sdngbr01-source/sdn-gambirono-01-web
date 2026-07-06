/**
 * ========================================
 * KALENDER PENDIDIKAN - SDN Gambirono 01
 * ========================================
 * LOGIKA: Ambil dari API, kalau gagal tampilkan error
 */

const API_URL = 'https://script.google.com/macros/s/AKfycbz-mt0_A_fou5QNRKiMrmVgVEo3v9bMthMdC5541Srswufzb1bNVfLKAVLESxma022U/exec';

// ========================================
// AMBIL DATA DARI API
// ========================================

async function getAllData() {
    try {
        const url = new URL(API_URL);
        url.searchParams.append('action', 'all');
        const response = await fetch(url.toString());
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data && result.data.data) {
            console.log('✅ Data dari API berhasil:', result.data.data.length, 'data');
            return result.data.data;
        } else {
            throw new Error(result.error || 'Data kosong');
        }
    } catch (error) {
        console.error('❌ Gagal ambil data dari API:', error.message);
        return null;
    }
}

async function getMonthData(bulan, tahun) {
    try {
        const url = new URL(API_URL);
        url.searchParams.append('action', 'month');
        url.searchParams.append('bulan', bulan);
        url.searchParams.append('tahun', tahun);
        const response = await fetch(url.toString());
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
            console.log('✅ Data bulan dari API berhasil');
            return result.data;
        } else {
            throw new Error(result.error || 'Data kosong');
        }
    } catch (error) {
        console.error('❌ Gagal ambil data bulan:', error.message);
        return null;
    }
}

// ========================================
// 1. DASHBOARD
// ========================================

async function renderDashboard() {
    const container = document.getElementById('dashboardContent');
    if (!container) return;
    
    container.innerHTML = `
        <div style="text-align:center;padding:40px;">
            <i class="fas fa-spinner fa-spin" style="font-size:30px;color:#1a3a5c;"></i>
            <p style="margin-top:12px;color:#94a3b8;">Mengambil data </p>
        </div>
    `;
    
    const allData = await getAllData();
    
    if (!allData || allData.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:40px;color:#ef4444;background:#fff;border-radius:16px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
                <i class="fas fa-exclamation-circle" style="font-size:40px;"></i>
                <h3 style="margin-top:16px;">Gagal Memuat Data</h3>
                <p style="color:#64748b;max-width:400px;margin:8px auto;">
                    Tidak dapat mengambil data dari spreadsheet. Pastikan:
                    <br>1. URL API benar
                    <br>2. Spreadsheet bisa diakses
                    <br>3. Koneksi internet stabil
                </p>
                <button onclick="renderDashboard()" style="margin-top:16px;padding:10px 32px;border:none;border-radius:8px;background:#1a3a5c;color:#fff;cursor:pointer;font-weight:600;">
                    <i class="fas fa-sync"></i> Coba Lagi
                </button>
                <p style="color:#94a3b8;font-size:12px;margin-top:12px;">
                    API URL: ${API_URL}
                </p>
            </div>
        `;
        return;
    }
    
    console.log('📊 Total data dari spreadsheet:', allData.length);
    
    // === TANGGAL HARI INI ===
    const today = new Date();
    const todayStr = `${String(today.getDate()).padStart(2,'0')}-${String(today.getMonth()+1).padStart(2,'0')}-${today.getFullYear()}`;
    const hariIni = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'][today.getDay()];
    
    console.log(`📅 Mencari tanggal: ${todayStr}`);
    
    // === CARI DATA DI SPREADSHEET ===
    let dataHariIni = null;
    for (let i = 0; i < allData.length; i++) {
        if (allData[i].tanggal === todayStr) {
            dataHariIni = allData[i];
            break;
        }
    }
    
    if (!dataHariIni) {
        container.innerHTML = `
            <div style="text-align:center;padding:40px;color:#f59e0b;background:#fff;border-radius:16px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
                <i class="fas fa-calendar-times" style="font-size:40px;"></i>
                <h3 style="margin-top:16px;">Tanggal Tidak Ditemukan</h3>
                <p style="color:#64748b;">
                    Tanggal <strong>${todayStr}</strong> tidak ditemukan di spreadsheet.
                </p>
                <p style="color:#94a3b8;font-size:13px;margin-top:8px;">
                    Pastikan tanggal <strong>${todayStr}</strong> ada di kolom A spreadsheet.
                </p>
            </div>
        `;
        return;
    }
    
    console.log('✅ Data hari ini ditemukan:', dataHariIni);
    
    // === AMBIL DATA DARI KOLOM ===
    const hari = dataHariIni.hari || hariIni;
    const kode = dataHariIni.kode || '';
    const namaEvent = dataHariIni.namaEvent || 'Hari Efektif';
    const kategori = dataHariIni.kategori || 'efektif';
    const semester = dataHariIni.semester || 'Libur';
    const hariEfektifKe = dataHariIni.hariEfektifKe || 0;
    const isEfektif = (kategori === 'efektif' || hariEfektifKe > 0);
    
    // Hitung statistik
    let totalGanjil = 0, totalGenap = 0;
    allData.forEach(item => {
        if (item.kategori === 'efektif' || item.hariEfektifKe > 0) {
            if (item.semester === 'Ganjil') totalGanjil++;
            else if (item.semester === 'Genap') totalGenap++;
        }
    });
    
    const totalSemester = semester === 'Ganjil' ? (totalGanjil || 136) : (totalGenap || 123);
    
    // === RENDER ===
    let html = `
        <div class="dashboard-grid">
            <div class="dash-card ${isEfektif ? 'card-efektif' : 'card-libur'}">
                <div class="label">Status Hari Ini</div>
                <div class="value">${isEfektif ? '✅ Efektif' : '📌 Libur'}</div>
                <div class="sub-info"><strong>${hari}</strong>, ${todayStr}</div>
                <span class="badge-event ${isEfektif ? 'badge-efektif' : 'badge-libur'}">
                    ${namaEvent}
                </span>
            </div>
            
            <div class="dash-card card-efektif">
                <div class="label">Hari Efektif Ke-</div>
                <div class="value">${hariEfektifKe > 0 ? hariEfektifKe : '-'} <small>/${totalSemester}</small></div>
                <div class="sub-info">Semester ${semester}</div>
            </div>
            
            <div class="dash-card ${isEfektif ? 'card-efektif' : 'card-libur'}">
                <div class="label">Semester</div>
                <div class="value">${semester}</div>
                <div class="sub-info"></div>
            </div>
            
            <div class="dash-card card-${kategori}">
                <div class="label">Event Hari Ini</div>
                <div class="event-name">${namaEvent}</div>
                ${kode ? `<span class="badge-event badge-${kategori}">${kode}</span>` : ''}
                ${isEfektif && !kode ? `<span class="badge-event badge-efektif">Hari Efektif</span>` : ''}
            </div>
        </div>
        
        <div class="dashboard-info">
            <div class="info-box">
                <div class="num">${totalGanjil || 136}</div>
                <div class="lbl">Hari Efektif Ganjil</div>
            </div>
            <div class="info-box">
                <div class="num">${totalGenap || 123}</div>
                <div class="lbl">Hari Efektif Genap</div>
            </div>
            <div class="info-box">
                <div class="num">${(totalGanjil || 136) + (totalGenap || 123)}</div>
                <div class="lbl">Total Hari Efektif</div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// ========================================
// 2. KALENDER PENDIDIKAN (Seperti Excel) - DIPERBAIKI
// ========================================

async function renderKalenderPendidikan() {
    const container = document.getElementById('tableContent');
    if (!container) return;
    
    container.innerHTML = `
        <div style="text-align:center;padding:30px;">
            <i class="fas fa-spinner fa-spin" style="font-size:24px;color:#1a3a5c;"></i>
            <p style="margin-top:8px;color:#94a3b8;">Mengambil data dari spreadsheet...</p>
        </div>
    `;
    
    const allData = await getAllData();
    
    if (!allData || allData.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:40px;color:#ef4444;background:#fff;border-radius:16px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
                <i class="fas fa-exclamation-circle" style="font-size:30px;"></i>
                <h3 style="margin-top:12px;">Gagal Memuat Data</h3>
                <p>Tidak dapat mengambil data dari spreadsheet.</p>
                <button onclick="renderKalenderPendidikan()" style="margin-top:12px;padding:8px 24px;border:none;border-radius:8px;background:#1a3a5c;color:#fff;cursor:pointer;">Coba Lagi</button>
            </div>
        `;
        return;
    }
    
    console.log('📊 Total data dari spreadsheet:', allData.length);
    
    // === CEK DATA LS2 ===
    const ls2Data = allData.filter(d => d.kode === 'LS2');
    console.log('📊 Data LS2 ditemukan:', ls2Data.length);
    if (ls2Data.length > 0) {
        console.log('📊 Tanggal LS2:', ls2Data.map(d => d.tanggal).join(', '));
    }
    
    // === KELOMPOKKAN PER BULAN ===
    const bulanMap = {};
    const monthNames = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    
    allData.forEach(item => {
        let tanggal = item.tanggal;
        if (tanggal.includes('/')) {
            const parts = tanggal.split('/');
            if (parts.length === 3) {
                tanggal = `${parts[0]}-${parts[1]}-${parts[2]}`;
            }
        }
        
        const parts = tanggal.split('-');
        if (parts.length !== 3) {
            console.warn('⚠️ Format tanggal salah:', tanggal);
            return;
        }
        
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const year = parseInt(parts[2]);
        const bulanKey = `${year}-${String(month).padStart(2,'0')}`;
        
        if (!bulanMap[bulanKey]) {
            bulanMap[bulanKey] = {
                nama: `${monthNames[month-1]} ${year}`,
                data: {},
                bulan: month,
                tahun: year
            };
        }
        bulanMap[bulanKey].data[day] = item;
    });
    
    // === GENERATE BULAN DARI JULI 2026 SAMPAI JULI 2027 ===
    const allBulanKeys = [];
    for (let year = 2026; year <= 2027; year++) {
        const startMonth = (year === 2026) ? 7 : 1;
        const endMonth = (year === 2027) ? 7 : 12;
        for (let month = startMonth; month <= endMonth; month++) {
            const bulanKey = `${year}-${String(month).padStart(2,'0')}`;
            allBulanKeys.push(bulanKey);
        }
    }
    
    const sortedBulanKeys = allBulanKeys.sort();
    
    let html = `
        <div class="table-wrapper">
            <div class="table-scroll" style="overflow-x:auto;">
                <table style="width:100%;border-collapse:collapse;font-size:12px;min-width:900px;">
                    <thead>
                        <tr>
                            <th style="background:#1a3a5c;color:#fff;padding:8px 6px;text-align:center;border:1px solid #333;white-space:nowrap;min-width:100px;">BULAN</th>
    `;
    
    // Header tanggal 1-31
    for (let i = 1; i <= 31; i++) {
        html += `<th style="background:#1a3a5c;color:#fff;padding:8px 2px;text-align:center;border:1px solid #333;font-size:10px;min-width:28px;">${i}</th>`;
    }
    html += `</tr></thead><tbody>`;
    
    // === LOOP PER BULAN ===
    sortedBulanKeys.forEach(bulanKey => {
        const bulan = bulanMap[bulanKey];
        const bulanNama = bulan ? bulan.nama : (() => {
            const parts = bulanKey.split('-');
            const year = parseInt(parts[0]);
            const month = parseInt(parts[1]);
            return `${monthNames[month-1]} ${year}`;
        })();
        
        html += `<tr>`;
        // === INI YANG DIUBAH: warna teks menjadi biru gelap ===
        html += `<td style="padding:6px 8px;border:1px solid #ccc;font-weight:700;background:#f0f4f8;white-space:nowrap;text-align:center;color:#1a3a5c;">${bulanNama}</td>`;
        
        for (let i = 1; i <= 31; i++) {
            const item = bulan ? bulan.data[i] : null;
            let content = '';
            let bg = '#ffffff';
            let color = '#000000';
            let title = '';
            
            if (item) {
                const kode = item.kode || '';
                const namaEvent = item.namaEvent || '';
                const kategori = item.kategori || '';
                const hariEfektifKe = item.hariEfektifKe || 0;
                const isEfektif = (kategori === 'efektif' || hariEfektifKe > 0);
                
                if (kode && kode !== '-' && kode !== '') {
                    content = kode;
                    title = `${kode} - ${namaEvent}`;
                    
                    if (kode === 'LU' || kode === 'LHB' || kode === 'LHR' || kode === 'CB') {
                        bg = '#ffcccc';
                        color = '#cc0000';
                    } else if (kode === 'KTS' || kode === 'KPP') {
                        bg = '#fff3cd';
                        color = '#856404';
                    } else if (kode === 'LS1' || kode === 'LS2') {
                        bg = '#d4edda';
                        color = '#155724';
                    } else {
                        bg = '#ffcccc';
                        color = '#cc0000';
                    }
                } else if (isEfektif && hariEfektifKe > 0) {
                    content = hariEfektifKe;
                    bg = '#e6f2ff';
                    color = '#0066cc';
                    title = `Hari Efektif ke-${hariEfektifKe}`;
                } else if (kategori === 'libur' || kategori === 'keagamaan' || kategori === 'nasional') {
                    content = 'Libur';
                    bg = '#ffcccc';
                    color = '#cc0000';
                    title = 'Libur';
                } else if (kategori === 'kegiatan') {
                    content = 'Keg';
                    bg = '#fff3cd';
                    color = '#856404';
                    title = namaEvent || 'Kegiatan';
                } else {
                    content = '';
                    bg = '#ffffff';
                }
            }
            
            html += `<td style="padding:4px 2px;border:1px solid #ccc;text-align:center;background:${bg};color:${color};font-weight:${content ? 'bold' : 'normal'};font-size:11px;cursor:default;" title="${title || ''}">${content}</td>`;
        }
        html += `</tr>`;
    });
    
   // === LEGENDA ===
html += `
    <tr>
        <td colspan="32" style="padding:12px 16px;border:1px solid #ccc;background:#f8fafc;">
            <div style="display:flex;flex-wrap:wrap;gap:12px 24px;font-size:12px;color:#1a3a5c;">
                <span><span style="display:inline-block;width:16px;height:16px;background:#e6f2ff;border:1px solid #0066cc;border-radius:3px;vertical-align:middle;margin-right:4px;"></span> Hari Efektif</span>
                <span><span style="display:inline-block;width:16px;height:16px;background:#ffcccc;border:1px solid #cc0000;border-radius:3px;vertical-align:middle;margin-right:4px;"></span> Libur (LU/LHB/LHR/CB)</span>
                <span><span style="display:inline-block;width:16px;height:16px;background:#fff3cd;border:1px solid #856404;border-radius:3px;vertical-align:middle;margin-right:4px;"></span> Kegiatan Khusus (KTS/KPP)</span>
                <span><span style="display:inline-block;width:16px;height:16px;background:#d4edda;border:1px solid #155724;border-radius:3px;vertical-align:middle;margin-right:4px;"></span> Libur Semester (LS1/LS2)</span>
            </div>
        </td>
    </tr>
`;
    
    html += `</tbody></table></div></div>`;
    container.innerHTML = html;
}
// ========================================
// 3. KALENDER BULANAN
// ========================================

async function renderKalenderBulanan(bulan, tahun) {
    const container = document.getElementById('calendarContent');
    if (!container) return;
    
    container.innerHTML = `
        <div style="text-align:center;padding:30px;">
            <i class="fas fa-spinner fa-spin" style="font-size:24px;color:#1a3a5c;"></i>
            <p style="margin-top:8px;color:#94a3b8;">Mengambil data dari spreadsheet...</p>
        </div>
    `;
    
    const data = await getMonthData(bulan, tahun);
    
    if (!data || !data.data) {
        container.innerHTML = `
            <div style="text-align:center;padding:40px;color:#ef4444;background:#fff;border-radius:16px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
                <i class="fas fa-exclamation-circle" style="font-size:30px;"></i>
                <h3 style="margin-top:12px;">Gagal Memuat Data</h3>
                <p>Tidak dapat mengambil data untuk bulan ini.</p>
                <button onclick="renderKalenderBulanan(${bulan}, ${tahun})" style="margin-top:12px;padding:8px 24px;border:none;border-radius:8px;background:#1a3a5c;color:#fff;cursor:pointer;">Coba Lagi</button>
            </div>
        `;
        return;
    }
    
    const hariList = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const firstDay = new Date(tahun, bulan, 1).getDay();
    const daysInMonth = new Date(tahun, bulan + 1, 0).getDate();
    const today = new Date();
    const todayStr = `${String(today.getDate()).padStart(2,'0')}-${String(today.getMonth()+1).padStart(2,'0')}-${today.getFullYear()}`;
    
    const dataMap = {};
    data.data.forEach(item => { dataMap[item.tanggal] = item; });
    
    let html = `
        <div class="bulan-nav">
            <div class="nav-title">
                <i class="fas fa-calendar-alt"></i> ${data.namaBulan} ${data.tahun}
                <span style="font-size:14px;font-weight:400;color:#94a3b8;margin-left:12px;">(${data.totalEfektif} Efektif / ${data.totalLibur} Libur)</span>
            </div>
            <div class="nav-buttons">
                <button onclick="changeMonth(-1)"><i class="fas fa-chevron-left"></i></button>
                <button class="btn-today" onclick="goToToday()"><i class="fas fa-calendar-day"></i> Hari Ini</button>
                <button onclick="changeMonth(1)"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
        <div class="kalender-grid-wrapper">
            <div class="kalender-grid">
    `;
    
    hariList.forEach((h, i) => {
        html += `<div class="header-hari ${i === 0 ? 'minggu' : ''}">${h}</div>`;
    });
    
    for (let i = 0; i < firstDay; i++) {
        html += `<div class="tanggal-cell empty"></div>`;
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(tahun, bulan, i);
        const dateStr = `${String(date.getDate()).padStart(2,'0')}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`;
        const isToday = dateStr === todayStr;
        const isMinggu = date.getDay() === 0;
        
        const item = dataMap[dateStr];
        const isEfektif = item && (item.kategori === 'efektif' || item.hariEfektifKe > 0);
        const isLibur = item && !isEfektif;
        
        let cellClass = 'tanggal-cell';
        if (isToday) cellClass += ' today';
        if (isLibur && !isMinggu) cellClass += ' libur';
        
        let numClass = 'tgl-num';
        if (isMinggu) numClass += ' minggu';
        if (isEfektif) numClass += ' tgl-num-efektif';
        if (isLibur && !isMinggu) numClass += ' tgl-num-libur';
        
        let eventHtml = '';
        if (item && item.kode && item.kode !== '-' && !isEfektif) {
            eventHtml = `<span class="tgl-event"><span class="badge-mini ${item.kategori}">${item.kode}</span> ${item.namaEvent}</span>`;
        } else if (isEfektif && item && item.hariEfektifKe > 0) {
            eventHtml = `<span class="tgl-event" style="color:#16a34a;">Efektif #${item.hariEfektifKe}</span>`;
        } else if (isMinggu) {
            eventHtml = `<span class="tgl-event" style="color:#ef4444;">Libur Minggu</span>`;
        }
        
        html += `
            <div class="${cellClass}" title="${item ? item.namaEvent : (isMinggu ? 'Libur Minggu' : '')}">
                <span class="${numClass}">${i}</span>
                ${eventHtml}
            </div>
        `;
    }
    
    html += `
            </div>
        </div>
        <div class="kalender-legend">
            <span class="legend-item"><span class="color-box efektif"></span> Efektif</span>
            <span class="legend-item"><span class="color-box libur"></span> Libur</span>
            <span class="legend-item"><span class="color-box keagamaan"></span> Keagamaan</span>
            <span class="legend-item"><span class="color-box nasional"></span> Nasional</span>
            <span class="legend-item"><span class="color-box kegiatan"></span> Kegiatan</span>
            <span class="legend-item"><span class="color-box semester"></span> Semester</span>
            <span class="legend-item"><span style="background:#facc15;width:16px;height:16px;border-radius:4px;border:2px solid #facc15;"></span> Hari Ini</span>
        </div>
    `;
    
    container.innerHTML = html;
    window._currentBulan = bulan;
    window._currentTahun = tahun;
}

function changeMonth(delta) {
    let bulan = window._currentBulan || new Date().getMonth();
    let tahun = window._currentTahun || new Date().getFullYear();
    bulan += delta;
    if (bulan < 0) { bulan = 11; tahun--; }
    if (bulan > 11) { bulan = 0; tahun++; }
    renderKalenderBulanan(bulan, tahun);
}

function goToToday() {
    const today = new Date();
    renderKalenderBulanan(today.getMonth(), today.getFullYear());
}

// ========================================
// TAB NAVIGATION
// ========================================

function switchTab(tabName) {
    document.querySelectorAll('.kalender-tab').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.kalender-tab-nav button').forEach(el => el.classList.remove('active'));
    
    document.getElementById(`tab-${tabName}`).classList.add('active');
    document.querySelector(`.kalender-tab-nav button[data-tab="${tabName}"]`).classList.add('active');
    
    switch(tabName) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'table':
            renderKalenderPendidikan();
            break;
        case 'calendar':
            const today = new Date();
            renderKalenderBulanan(today.getMonth(), today.getFullYear());
            break;
    }
}

// ========================================
// INIT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📅 Kalender Pendidikan loaded');
    console.log('📡 API URL:', API_URL);
    
    document.querySelectorAll('.kalender-tab-nav button').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    switchTab('dashboard');
});
