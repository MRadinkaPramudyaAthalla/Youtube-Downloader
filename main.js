// main.js
const BACKEND_URL = 'https://ytpocket.netlify.app';

async function prosesVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    if (!videoUrl) {
        alert('Masukkan link video YouTube terlebih dahulu!');
        return;
    }

    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    try {
        // 1. Ambil judul dan thumbnail resmi dari YouTube NoEmbed
        const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        if (!data || !data.title) {
            throw new Error('Gagal mengambil data video');
        }

        document.getElementById('videoTitle').innerText = data.title;
        document.getElementById('videoThumbnail').src = data.thumbnail_url;

        // 2. Tembak ke fungsi backend Netlify lo yang baru untuk generate direct download stream
        // Trik ini bikin user TETAP di web lo, dan pas diklik langsung ke-download otomatis!
        const directDownloadUrl = `${BACKEND_URL}/.netlify/functions/video-info?url=${encodeURIComponent(videoUrl)}`;
        
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.href = directDownloadUrl;
        
        // Hapus target _blank biar gak ngebuka tab baru yang gak jelas!
        downloadBtn.removeAttribute('target'); 
        // Paksa browser menganggap ini file unduhan
        downloadBtn.setAttribute('download', `${data.title}.mp4`); 

        document.getElementById('result').style.display = 'block';

    } catch (error) {
        console.error(error);
        alert('Gagal memproses video. Pastikan link YouTube benar.');
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}