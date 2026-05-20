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
        // Ambil info judul asli dan thumbnail asli langsung lewat jalur resmi NoEmbed YouTube
        const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        if (!data || !data.title) {
            throw new Error('Gagal mengambil data video');
        }

        // Tampilkan judul asli dan foto asli video ke halaman web lo!
        document.getElementById('videoTitle').innerText = data.title;
        document.getElementById('videoThumbnail').src = data.thumbnail_url;

        // Trik download langsung: Kita pakai format mirror download link otomatis
        // User tetap berada di web lo, pas diklik tombol hijau baru proses download jalan murni
        let cleanUrl = videoUrl;
        if (cleanUrl.includes('youtu.be/')) {
            cleanUrl = cleanUrl.replace('youtu.be/', 'youtube.com/watch?v=');
        }
        const directDownloadUrl = cleanUrl.replace('youtube.com/', 'ssyoutube.com/');

        // Set target link ke tombol hijau tanpa membuka window.open otomatis lagi!
        document.getElementById('downloadBtn').href = directDownloadUrl;
        
        // JANGAN buka tab baru otomatis, biarkan user klik manual di tombol hijau lo sendiri
        // document.getElementById('downloadBtn').setAttribute('target', '_blank'); // Hapus atau biarkan jika ingin tab baru pas klik tombol hijau saja

        // Munculkan box hasil lo yang cantik dan rapi
        document.getElementById('result').style.display = 'block';

    } catch (error) {
        console.error(error);
        alert('Gagal memproses detail video. Pastikan link YouTube benar.');
    } finally {
        // Matikan loading animasi
        document.getElementById('loading').style.display = 'none';
    }
}