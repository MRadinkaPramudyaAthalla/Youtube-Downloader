// main.js
const BACKEND_URL = 'https://ytpocket.netlify.app';

async function prosesVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    if (!videoUrl) {
        alert('Masukkan link video YouTube terlebih dahulu!');
        return;
    }

    // Tampilkan animasi loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    try {
        // KITA GANTI KE ENGINE SAVETUBE YANG JAUH LEBIH BERSIH DAN STABIL
        const cleanDownloadUrl = `https://mytube.zyx/download?url=${encodeURIComponent(videoUrl)}`;
        const backupDownloadUrl = `https://ssyoutube.com/en74/youtube-video-downloader?url=${encodeURIComponent(videoUrl)}`;
        
        // Setup tampilan di halaman web lo
        document.getElementById('videoTitle').innerText = "Video YouTube Siap Diunduh!";
        document.getElementById('videoThumbnail').src = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500"; 
        
        // Kita pakai ssyoutube yang paling legendaris dan stabil link-nya
        document.getElementById('downloadBtn').href = backupDownloadUrl;
        
        // Otomatis buka di tab baru ke halaman download yang asli
        window.open(backupDownloadUrl, '_blank');

        // Munculkan box hijau biar user bisa klik manual
        document.getElementById('result').style.display = 'block';

    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan teknis. Silakan coba lagi.');
    } finally {
        // Matikan loading animasi
        document.getElementById('loading').style.display = 'none';
    }
}