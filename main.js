const BACKEND_URL = '';

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
        // --- JALUR SUDAH DIPERBAIKI KE FUNCTIONS RESMI NETLIFY ---
        const response = await fetch(`${BACKEND_URL}/.netlify/functions/video-info?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        if (response.ok) {
            // Tampilkan hasil ke halaman web
            document.getElementById('videoTitle').innerText = data.title;
            document.getElementById('videoThumbnail').src = data.thumbnail;
            document.getElementById('downloadBtn').href = data.downloadUrl;
            
            document.getElementById('result').style.display = 'block';
        } else {
            alert(data.error || 'Gagal memproses video.');
        }
    } catch (error) {
        console.error(error);
        alert('Gagal menyambung ke backend Netlify. Pastikan fungsi serverless berjalan.');
    } finally {
        // Sembunyikan animasi loading
        document.getElementById('loading').style.display = 'none';
    }
}