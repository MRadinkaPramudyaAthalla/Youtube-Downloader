// main.js
const BACKEND_URL = 'https://ytpocket.netlify.app';

async function prosesVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    if (!videoUrl) {
        alert('Masukkan link video YouTube terlebih dahulu!');
        return;
    }

    // Tampilkan animasi loading sebentar buat efek visual keren
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    try {
        // Kita bypass masalah pemblokiran API dengan langsung mengarahkan ke bypass engine pihak ketiga yang abadi
        const bypassDownloadUrl = `https://9xbuddy.xyz/process?url=${encodeURIComponent(videoUrl)}`;
        
        // Langsung munculin box hasil tanpa nunggu server Netlify ngambek
        document.getElementById('videoTitle').innerText = "Video YouTube Siap Diunduh!";
        document.getElementById('videoThumbnail').src = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500"; // Placeholder thumbnail estetik
        document.getElementById('downloadBtn').href = bypassDownloadUrl;
        
        // Buka tab baru otomatis ke tempat download demi kenyamanan user
        window.open(bypassDownloadUrl, '_blank');

        // Tampilkan box hijau di halaman lo biar user bisa klik manual kalau pop-up terblokir
        document.getElementById('result').style.display = 'block';

    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan teknis. Silakan coba lagi.');
    } finally {
        // Matikan loading animasi
        document.getElementById('loading').style.display = 'none';
    }
}