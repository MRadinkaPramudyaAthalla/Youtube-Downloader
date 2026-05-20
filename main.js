// main.js
const BACKEND_URL = 'https://ytpocket.netlify.app';

async function prosesVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    if (!videoUrl) {
        alert('Masukkan link video YouTube terlebih dahulu!');
        return;
    }

    // Tampilkan animasi loading sebentar biar kelihatan prosesnya
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    try {
        // TRIK ANTI-IKLAN: Ubah link youtube biasa menjadi format pintasan SaveFrom
        // Contoh: https://youtube.com/... menjadi https://ssyoutube.com/...
        let cleanUrl = videoUrl;
        if (cleanUrl.includes('youtu.be/')) {
            cleanUrl = cleanUrl.replace('youtu.be/', 'youtube.com/watch?v=');
        }
        
        const saveFromUrl = cleanUrl.replace('youtube.com/', 'ssyoutube.com/');
        
        // Setup tampilan di halaman web lo
        document.getElementById('videoTitle').innerText = "Video YouTube Siap Diunduh!";
        document.getElementById('videoThumbnail').src = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500"; 
        
        // Pasang link ke tombol hijau lo
        document.getElementById('downloadBtn').href = saveFromUrl;
        
        // Otomatis buka di tab baru ke halaman SaveFrom yang bersih
        window.open(saveFromUrl, '_blank');

        // Munculkan box hijau di web lo biar aman
        document.getElementById('result').style.display = 'block';

    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan teknis. Silakan coba lagi.');
    } finally {
        // Matikan loading animasi
        document.getElementById('loading').style.display = 'none';
    }
}