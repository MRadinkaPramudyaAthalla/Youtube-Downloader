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
        // Trik Ekstrak ID Video YouTube untuk mengambil thumbnail asli dari server Google
        let videoId = '';
        if (videoUrl.includes('youtu.be/')) {
            videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
        } else if (videoUrl.includes('v=')) {
            videoId = videoUrl.split('v=')[1].split('&')[0];
        } else if (videoUrl.includes('embed/')) {
            videoId = videoUrl.split('embed/')[1].split('?')[0];
        }

        if (!videoId) {
            alert('Format link YouTube tidak dikenali!');
            return;
        }

        // 1. KITA KEMBALIKAN FOTO THUMBNAIL ASLI VIDEONYA DARI YOUTUBE (HQ)
        document.getElementById('videoThumbnail').src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        
        // 2. KITA SET JUDULNYA BIAR RELEVAN
        document.getElementById('videoTitle').innerText = "Video YouTube Siap Diunduh!";

        // 3. TRIK ANTI-IKLAN: Arahkan tombol download ke widget converter bersih tanpa pop-up luar
        const cleanWidgetUrl = `https://y2mate.tools/en/convert?url=${encodeURIComponent(videoUrl)}`;
        document.getElementById('downloadBtn').href = cleanWidgetUrl;

        // Buka widget download resmi di tab baru yang auto-load videonya
        window.open(cleanWidgetUrl, '_blank');

        // Munculkan kembali box hasil hijau lo yang cantik itu
        document.getElementById('result').style.display = 'block';

    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan teknis. Silakan coba lagi.');
    } finally {
        // Matikan loading animasi
        document.getElementById('loading').style.display = 'none';
    }
}