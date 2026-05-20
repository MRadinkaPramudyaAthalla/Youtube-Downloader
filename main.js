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
        // MENGGUNAKAN RACIKAN FORMAT Y2MATE YANG JAUH LEBIH STABIL DAN DIJAMIN PAS
        const y2mateUrl = `https://www.y2mate.com/id/download?url=${encodeURIComponent(videoUrl)}`;
        
        // Setup tampilan di halaman web lo
        document.getElementById('videoTitle').innerText = "Video YouTube Siap Diunduh!";
        document.getElementById('videoThumbnail').src = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500"; 
        
        // Pasang link ke tombol hijau lo
        document.getElementById('downloadBtn').href = y2mateUrl;
        
        // Otomatis buka di tab baru ke halaman download Y2Mate yang asli
        window.open(y2mateUrl, '_blank');

        // Munculkan box hijau biar user bisa klik manual jika pop-up terblokir
        document.getElementById('result').style.display = 'block';

    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan teknis. Silakan coba lagi.');
    } finally {
        // Matikan loading animasi
        document.getElementById('loading').style.display = 'none';
    }
}