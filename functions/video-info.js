const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const videoURL = event.queryStringParameters.url;
    
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
    };

    if (!videoURL) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'URL wajib diisi!' }) };
    }

    try {
        // Kita tembak API pihak ketiga yang handal lewat method POST
        const res = await fetch("https://api.v02.api-aries.online/api/convert/ytdl", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: videoURL })
        });

        const data = await res.json();

        // Jika API sukses merespons
        if (data && data.download_url) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    title: data.title || "YouTube Video",
                    thumbnail: data.thumbnail || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500",
                    downloadUrl: data.download_url
                })
            };
        }

        // Jalur alternatif kedua jika API pertama gagal mengembalikan download_url
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                title: "Video Siap Diunduh",
                thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500",
                downloadUrl: `https://twdown.tools/download?url=${encodeURIComponent(videoURL)}`
            })
        };

    } catch (error) {
        // Jalur darurat (Fallback) jika internet API mati total, kita direct ke web pihak ketiga secara instan
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                title: "Klik Tombol Hijau Di Bawah Untuk Mengunduh",
                thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500",
                downloadUrl: `https://9xbuddy.xyz/process?url=${encodeURIComponent(videoURL)}`
            })
        };
    }
};  