// functions/video-info.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const videoURL = event.queryStringParameters.url;
    
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
    };

    if (!videoURL) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'URL wajib diisi!' })
        };
    }

    try {
        // Menggunakan API publik alternatif yang mengembalikan direct link video & audio campuran
        const apiResponse = await fetch(`https://api.cobalt.tools/api/json`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: videoURL,
                filenamePattern: 'basic'
            })
        });

        const data = await apiResponse.json();

        // Cobalt API mengembalikan objek langsung berupa { status, url, text } jika sukses
        if (data.status === 'stream' || data.status === 'redirect') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    title: "Video Berhasil Diproses",
                    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500", // Placeholder thumbnail cakep
                    downloadUrl: data.url
                })
            };
        } else {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Server penyedia video sedang sibuk.' })
            };
        }
    } catch (error) {
        console.error('Error Backend:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Gagal memproses video.' })
        };
    }
};