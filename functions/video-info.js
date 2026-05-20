// functions/video-info.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const videoURL = event.queryStringParameters.url;
    
    // Set Header CORS
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
        // Panggil API publik rahasia
        const apiResponse = await fetch(`https://api.v02.api-aries.online/api/convert/ytdl?url=${encodeURIComponent(videoURL)}`);
        const data = await apiResponse.json();

        if (!data || data.status !== 'success') {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Gagal mengambil info video dari API rahasia.' })
            };
        }

        // Kembalikan data ke frontend
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                title: data.title,
                thumbnail: data.thumbnail,
                downloadUrl: data.download_url
            })
        };
    } catch (error) {
        console.error('Error Backend:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Terjadi kesalahan pada server Netlify.' })
        };
    }
};