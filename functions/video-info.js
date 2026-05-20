// functions/video-info.js
const ytdl = require('ytdl-core');

exports.handler = async (event, context) => {
    const videoURL = event.queryStringParameters.url;
    
    // Header CORS biar gak diblokir browser
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
        // Validasi apakah beneran link youtube
        if (!ytdl.validateURL(videoURL)) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Link YouTube tidak valid!' })
            };
        }

        // Ambil info detail video langsung dari YouTube
        const info = await ytdl.getInfo(videoURL);
        
        // Cari format video MP4 yang punya audio (kualitas campuran/highest)
        const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo', filter: 'audioandvideo' });
        
        // Ambil thumbnail kualitas terbaik
        const thumbnail = info.videoDetails.thumbnails.pop().url;

        // Kembalikan data rapi ke frontend main.js kamu
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                title: info.videoDetails.title,
                thumbnail: thumbnail,
                downloadUrl: format.url
            })
        };
    } catch (error) {
        console.error('Error Mandiri Backend:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Gagal memproses video. Coba link video lainnya.' })
        };
    }
};