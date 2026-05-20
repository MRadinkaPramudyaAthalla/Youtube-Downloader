const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 1. Endpoint Ambil Info Video & Link Download Langsung
app.get('/api/video-info', async (req, res) => {
    const videoURL = req.query.url;
    if (!videoURL) {
        return res.status(400).json({ error: 'URL wajib diisi!' });
    }

    try {
        // Kita pakai API publik gratisan rahasia yang super kencang
        const fetch = (await import('node-fetch')).default;
        const apiResponse = await fetch(`https://api.v02.api-aries.online/api/convert/ytdl?url=${encodeURIComponent(videoURL)}`);
        const data = await apiResponse.json();

        if (!data || data.status !== 'success') {
            return res.status(500).json({ error: 'Gagal mengambil info video dari API rahasia.' });
        }

        // Lempar hasilnya ke frontend kamu
        res.json({
            title: data.title,
            thumbnail: data.thumbnail,
            downloadUrl: data.download_url // Ini link download mp4 langsung
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server makelar.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server makelar aktif di port ${PORT}`));