console.log('renderer')

const videoPaths = [
  '/Users/ryought/mep-terminal/data/playlist/6035aabb80b6631127953a7b/free-play/20211108_164336/raw/movie.mp4',
]

window.electronApi.getLocalFileContent(videoPaths[0])
  .then((buffer) => {
    console.log('mp4 loaded!', buffer);

    ['1', '2', '3'].forEach((key) => {
      const video_id = 'video' + key;
      console.log('video id', video_id);
      const video = document.getElementById(video_id);
      const url = URL.createObjectURL(new Blob([buffer]));
      video.src = url;
      video.load();
      video.play();
    })
  })
