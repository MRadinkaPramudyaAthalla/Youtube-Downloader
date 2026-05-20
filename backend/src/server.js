const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Server akan otomatis pakai perintah 'yt-dlp' bawaan Linux jika di hosting, 
// tapi tetap pakai yt-dlp.exe lokal jika kamu jalankan di laptop.
const ytdlpPath = process.env.RENDER ? 'yt-dlp' : path.resolve(__dirname, 'yt-dlp.exe');

// 1. Endpoint Info Video
app.get('/api/video-info', (req, res) => {
    const videoURL = req.query.url;
    if (!videoURL) {
        return res.status(400).json({ error: 'URL wajib diisi!' });
    }

    // Eksekusi yt-dlp lokal dengan membungkus path di dalam tanda kutip tunggal-ganda
    exec(`"${ytdlpPath}" --dump-json "${videoURL}"`, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
        if (error) {
            console.error("EROR UTAMA:", stderr || error.message);
            return res.status(500).json({ error: 'Gagal mengambil informasi video', detail: stderr });
        }
        try {
            const info = JSON.parse(stdout.trim());
            res.json({
                title: info.title,
                thumbnail: info.thumbnail
            });
        } catch (e) {
            res.status(500).json({ error: 'Gagal membaca data dari YouTube' });
        }
    });
});

// 2. Endpoint Download MP4
// 2. Endpoint Download MP4 (Versi Auto-Download)
app.get('/api/download', (req, res) => {
    const videoURL = req.query.url;
    if (!videoURL) return res.status(400).send('URL wajib diisi');

    // Kita paksa browser untuk mendownload file, bukan memutarnya langsung
    res.header('Content-Disposition', 'attachment; filename="video_youtube.mp4"');
    res.header('Content-Type', 'video/mp4');
    
    // Jalankan yt-dlp untuk langsung mengalirkan video
    const process = exec(`"${ytdlpPath}" -f "best[ext=mp4]/best" -o - "${videoURL}"`);
    
    process.stdout.pipe(res);
    
    process.stderr.on('data', (data) => {
        console.log(`Log download: ${data}`);
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server Backend sukses menyala di http://localhost:${PORT}`);
    console.log(`📍 Lokasi yt-dlp yang dibaca: ${ytdlpPath}`);
});