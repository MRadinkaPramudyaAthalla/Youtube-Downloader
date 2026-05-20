// main.js
const BACKEND_URL = 'https://ytpocket.netlify.app';

async function prosesVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    if (!videoUrl) {
        alert('Masukkan link video YouTube terlebih dahulu!');
        return;
    }

    // Tampilkan loading animasi
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    try {
        // 1. Ambil Judul dan Thumbnail ASLI lewat NoEmbed resmi Google
        const embedRes = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(videoUrl)}`);
        const embedData = await embedRes.json();

        if (embedData && embedData.title) {
            document.getElementById('videoTitle').innerText = embedData.title;
            document.getElementById('videoThumbnail').src = embedData.thumbnail_url;
        } else {
            document.getElementById('videoTitle').innerText = "Video YouTube Siap Diunduh!";
            document.getElementById('videoThumbnail').src = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500";
        }

        // 2. AMBIL LINK DOWNLOAD ASLI MP4 LEWAT COBALT API (ANTI-IKLAN & LANGSUNG STREAM FILE)
        const cobaltRes = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: videoUrl,
                videoQuality: '720', // Resolusi HD yang pas dan stabil
                filenamePattern: 'basic'
            })
        });

        const cobaltData = await cobaltRes.json();

        if (cobaltData && cobaltData.url) {
            const downloadBtn = document.getElementById('downloadBtn');
            
            // Masukkan direct link file video murni (.mp4 stream)
            downloadBtn.href = cobaltData.url;
            
            // Supaya browser langsung mendownload file aslinya tanpa buka tab kosong/eror site unavailable
            downloadBtn.setAttribute('download', '');
            
            // Munculkan box hasil hijau lo yang megah
            document.getElementById('result').style.display = 'block';
        } else {
            alert('Server download sedang penuh, silakan coba beberapa saat lagi.');
        }

    } catch (error) {
        console.error(error);
        alert('Gagal memproses video. Pastikan koneksi internet aman.');
    } finally {
        // Matikan loading
        document.getElementById('loading').style.display = 'none';
    }
}