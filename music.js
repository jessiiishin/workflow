const defaultVideo = 'https://www.youtube.com/watch?v=M7lc1UVf-VE'

let vidplayer = videojs('vidplayer', {
    techOrder: ['youtube'],
    sources: [{
        type: 'video/youtube',
        src: defaultVideo
    }]
});

function changeVideo(newVideo) {
    if (newVideo !== null) {
        vidplayer.sources().src(newVideo);
    }
}