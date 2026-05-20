// functions/video-info.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const videoURL = event.queryStringParameters.url;
    
    if (!videoURL) {
        return { statusCode: 400, body: 'URL wajib diisi!' };
    }

    try {
        // Konversi link youtube biasa ke format stream download global
        let cleanUrl = videoURL;
        if (cleanUrl.includes('youtu.be/')) {
            cleanUrl = cleanUrl.replace('youtu.be/', 'youtube.com/watch?v=');
        }
        const streamTarget = cleanUrl.replace('youtube.com/', 'ssyoutube.com/');

        // Kita paksa server Netlify merespons dengan instruksi ATTACHMENT (Langsung Download)
        // Jadi browser gak bakal berani ngebuka halaman web, melainkan langsung nge-save file!
        return {
            statusCode: 302,
            headers: {
                'Location': streamTarget,
                'Content-Disposition': 'attachment; filename="video.mp4"',
                'Access-Control-Allow-Origin': '*'
            },
            body: ''
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: 'Gagal mengeksekusi download langsung.'
        };
    }
};