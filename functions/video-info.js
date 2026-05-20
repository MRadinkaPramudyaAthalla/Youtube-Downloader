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
        // MENGGUNAKAN API BARU YANG JAUH LEBIH STABIL & CEPAT
        const apiResponse = await fetch(`https://api.sandipbgt.com/download?url=${encodeURIComponent(videoURL)}`);
        const data = await apiResponse.json();

        // Cek apakah data dari API baru ini valid
        if (!data || !data.type === 'video') {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Gagal mengambil info video dari API server.' })
            };
        }

        // Ambil link kualitas terbaik (biasanya ada di indeks pertama atau terakhir)
        const videoData = data.links[0]; 

        // Kembalikan data sukses ke frontend
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                title: data.title,
                thumbnail: data.thumbnail,
                downloadUrl: videoData.link
            })
        };
    } catch (error) {
        console.error('Error Backend:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Gagal memproses video.' })
        };
    }
};