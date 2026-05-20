const btnFetch = document.getElementById('btn-fetch');
const videoUrlInput = document.getElementById('video-url');
const resultBox = document.getElementById('result-box');
const loading = document.getElementById('loading');
const videoDetails = document.getElementById('video-details');

// Ganti alamat localhost dengan alamat link dari Render kamu ya!
const BACKEND_URL = 'https://nama-service-kamu.onrender.com';
btnFetch.addEventListener('click', async () => {
    const url = videoUrlInput.value.trim();

    if (!url) {
        alert('Tolong masukkan URL YouTube terlebih dahulu!');
        return;
    }

    // Tampilkan box hasil dan efek loading
    resultBox.classList.remove('hidden');
    loading.classList.remove('hidden');
    videoDetails.classList.add('hidden');

    try {
        // 1. Ambil info video dari backend terlebih dahulu
        const response = await fetch(`${BACKEND_URL}/api/video-info?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.error) {
            alert(data.error);
            resultBox.classList.add('hidden');
            return;
        }

        // 2. Pasang data info ke HTML
        document.getElementById('video-thumb').src = data.thumbnail;
        document.getElementById('video-title').innerText = data.title;
        
        // 3. Arahkan tombol download ke endpoint file streaming backend
        document.getElementById('btn-download').href = `${BACKEND_URL}/api/download?url=${encodeURIComponent(url)}`;

        // Sembunyikan loading, tampilkan tombol download asli
        loading.classList.add('hidden');
        videoDetails.classList.remove('hidden');

    } catch (error) {
        console.error(error);
        alert('Gagal menyambung ke server backend. Pastikan backend kamu sudah dijalankan.');
        resultBox.classList.add('hidden');
    }
});