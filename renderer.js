console.log('renderer')

const root = document.getElementById('root');

function setUpVideo(key) {
  const elem = document.createElement('elem');
  elem.classList.add('elem');
  const video = document.createElement('video');
  video.id = 'video' + key;
  const span = document.createElement('span');
  span.id = 'status' + key;
  span.innerText = '00:00';

  elem.appendChild(span);
  elem.appendChild(video);

  root.appendChild(elem);
}

const videoCount = 3;
const videoPaths = [
  '/Users/ryought/mep-terminal/data/playlist/6035aabb80b6631127953a7b/free-play/20211108_164336/raw/movie.mp4',
];

function setUpAllVideos() {
  for (let key = 0; key < videoCount; key++) {
    setUpVideo(key);
  }
}

setUpAllVideos();

window.electronApi.getLocalFileContent(videoPaths[0])
  .then((buffer) => {
    console.log('mp4 loaded!', buffer);
    for (let key = 0; key < videoCount; key++) {
      const video = document.getElementById('video' + key);
      const url = URL.createObjectURL(new Blob([buffer]));
      video.src = url;
      video.load();
      video.play();
    }
  });
