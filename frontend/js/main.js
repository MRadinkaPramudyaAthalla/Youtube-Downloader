const btnFetch = document.getElementById('btn-fetch');
const videoUrlInput = document.getElementById('video-url');
const resultBox = document.getElementById('result-box');
const loading = document.getElementById('loading');
const videoDetails = document.getElementById('video-details');

// Nanti ganti dengan URL backend Vercel kamu ya, Sya! (Contoh: https://xxx.vercel.app)
const BACKEND_URL = 'http://localhost:5000'; 

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
        // 1. Ambil info video + link download langsung dari backend makelar
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
        
        // 3. Langsung arahkan tombol download ke link matang dari API (Tanpa antre server lagi)
        document.getElementById('btn-download').href = data.downloadUrl;

        // Sembunyikan loading, tampilkan tombol download asli
        loading.classList.add('hidden');
        videoDetails.classList.remove('hidden');

    } catch (error) {
        console.error(error);
        alert('Gagal menyambung ke server backend Vercel.');
        resultBox.classList.add('hidden');
    }
});