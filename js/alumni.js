
const ALUMNI_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbxy1KoaJwO-uM_4bjE8DAU9lI-5YY_784LgXCT7cBNLULLMZ1sVEw5sd1UCmcOfaLaEBQ/exec';


// ============================================
// VARIABEL GLOBAL
// ============================================
var semuaDataAlumni = [];

// ============================================
// FUNGSI EKSTRAK ID DRIVE
// ============================================
function extractDriveId(url) {
    if (!url || typeof url !== 'string') return null;
    try {
        var matchId = url.match(/[?&]id=([^&]+)/);
        if (matchId) return matchId[1];
        var matchFile = url.match(/\/file\/d\/([^\/]+)/);
        if (matchFile) return matchFile[1];
        return null;
    } catch (e) {
        return null;
    }
}

function getDriveThumbnail(url, size) {
    if (!url) return null;
    var id = extractDriveId(url);
    if (!id) return null;
    return 'https://drive.google.com/thumbnail?id=' + id + '&sz=w' + (size || 200);
}

// ============================================
// 1. CEK ALUMNI
// ============================================
function cekAlumni() {
    var nisnInput = document.getElementById('alumniNisnInput');
    if (!nisnInput) return;
    
    var nisn = nisnInput.value.trim();
    
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
    
    document.getElementById('alumniLoginForm').style.display = 'none';
    document.getElementById('hasilAlumni').style.display = 'none';
    document.getElementById('loadingAlumni').style.display = 'block';
    
    var script = document.createElement('script');
    var callbackName = 'callbackAlumni_' + Date.now();
    
    window[callbackName] = function(data) {
        console.log('📦 Data Alumni:', data);
        
        try {
            if (!data || !data.success) {
                document.getElementById('loadingAlumni').style.display = 'none';
                document.getElementById('alumniLoginForm').style.display = 'block';
                alert('Gagal memuat data. Silakan coba lagi.');
                delete window[callbackName];
                return;
            }
            
            if (!data.data || data.data.length === 0) {
                document.getElementById('loadingAlumni').style.display = 'none';
                document.getElementById('alumniLoginForm').style.display = 'block';
                alert('Belum ada data alumni di database.');
                delete window[callbackName];
                return;
            }
            
            semuaDataAlumni = data.data;
            
            var found = null;
            for (var i = 0; i < semuaDataAlumni.length; i++) {
                if (semuaDataAlumni[i][1] && semuaDataAlumni[i][1].toString() === nisn) {
                    found = semuaDataAlumni[i];
                    break;
                }
            }
            
            if (!found) {
                document.getElementById('loadingAlumni').style.display = 'none';
                document.getElementById('alumniLoginForm').style.display = 'block';
                alert('NISN ' + nisn + ' tidak ditemukan.');
                delete window[callbackName];
                return;
            }
            
            displayAlumniBiodata(found);
            
            document.getElementById('loadingAlumni').style.display = 'none';
            document.getElementById('hasilAlumni').style.display = 'block';
            sessionStorage.setItem('alumni_nisn', nisn);
            
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('loadingAlumni').style.display = 'none';
            document.getElementById('alumniLoginForm').style.display = 'block';
            alert('Terjadi kesalahan: ' + error.message);
        }
        
        delete window[callbackName];
    };
    
    script.src = ALUMNI_WEBAPP_URL + '?action=getAlumni&callback=' + callbackName;
    script.onerror = function() {
        document.getElementById('loadingAlumni').style.display = 'none';
        document.getElementById('alumniLoginForm').style.display = 'block';
        alert('Gagal terhubung ke server. Silakan coba lagi.');
        delete window[callbackName];
    };
    document.body.appendChild(script);
}

// ============================================
// 2. TAMPILKAN BIODATA ALUMNI - RAPIH
// ============================================
function displayAlumniBiodata(data) {
    var nama = data[0] || '-';
    var nisn = data[1] || '-';
    var tahunMasuk = data[2] || '-';
    var tahunLulus = data[3] || '-';
    var sekolahTujuan = data[4] || '-';
    var fotoUrl = data[5] || '';
    
    // Nama + NISN
    document.getElementById('alumniNamaResult').textContent = nama;
    document.getElementById('alumniNISNResult').textContent = nisn;
    
    // FOTO
    var fotoImg = document.getElementById('alumniFotoResult');
    var noFotoDiv = document.getElementById('alumniNoFotoResult');
    
    if (fotoUrl) {
        var thumb = getDriveThumbnail(fotoUrl, 400);
        if (thumb) {
            fotoImg.src = thumb;
            fotoImg.style.display = 'block';
            noFotoDiv.style.display = 'none';
        } else {
            fotoImg.style.display = 'none';
            noFotoDiv.style.display = 'flex';
        }
    } else {
        fotoImg.style.display = 'none';
        noFotoDiv.style.display = 'flex';
    }
    
    // BIODATA DETAIL - RAPIH
    var biodataContainer = document.getElementById('biodataAlumni');
    
    var html = `
        <div class="biodata-grid">
            <div class="biodata-col">
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-user"></i> Nama</span>
                    <span class="biodata-value">${nama}</span>
                </div>
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-id-card"></i> NISN</span>
                    <span class="biodata-value">${nisn}</span>
                </div>
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-calendar-alt"></i> Tahun Masuk</span>
                    <span class="biodata-value">${tahunMasuk}</span>
                </div>
            </div>
            <div class="biodata-col">
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-calendar-check"></i> Tahun Lulus</span>
                    <span class="biodata-value">${tahunLulus}</span>
                </div>
                <div class="biodata-item">
                    <span class="biodata-label"><i class="fas fa-school"></i> Sekolah Tujuan</span>
                    <span class="biodata-value">${sekolahTujuan}</span>
                </div>
            </div>
        </div>
    `;
    
    biodataContainer.innerHTML = html;
}

// ============================================
// 3. LOGOUT ALUMNI
// ============================================
function logoutAlumni() {
    document.getElementById('hasilAlumni').style.display = 'none';
    document.getElementById('alumniLoginForm').style.display = 'block';
    document.getElementById('alumniNisnInput').value = '';
    sessionStorage.removeItem('alumni_nisn');
}

// ============================================
// 4. CEK SESSION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    var savedNISN = sessionStorage.getItem('alumni_nisn');
    if (savedNISN) {
        var nisnInput = document.getElementById('alumniNisnInput');
        if (nisnInput) {
            nisnInput.value = savedNISN;
            setTimeout(function() {
                cekAlumni();
            }, 500);
        }
    }
});
