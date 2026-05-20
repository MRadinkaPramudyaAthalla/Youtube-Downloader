// functions/video-info.js
exports.handler = async (event, context) => {
    // Ambil parameter URL dari query string (?url=...)
    const videoURL = event.queryStringParameters.url;
    
    // Set Header CORS agar frontend Netlify diizinkan mengaksesnya
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
        // Panggil API publik rahasia yang super kencang
        const fetch = (await import('node-fetch')).default;
        const apiResponse = await fetch(`https://api.v02.api-aries.online/api/convert/ytdl?url=${encodeURIComponent(videoURL)}`);
        const data = await apiResponse.json();

        if (!data || data.status !== 'success') {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Gagal mengambil info video dari API rahasia.' })
            };
        }

        // Kembalikan data sukses ke frontend kamu
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
        console.error(error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Terjadi kesalahan pada server Netlify.' })
        };
    }
};