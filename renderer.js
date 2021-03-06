console.log('renderer')

const randomSeekInterval = 500;

const root = document.getElementById('root');

function getRandomTimePoint(duration) {
  return Math.random() * duration
}

function startRandomSeeker(key) {
  const video = document.getElementById('video' + key);
  setInterval(() => {
    if (video.duration) {
      const time = getRandomTimePoint(video.duration);
      console.log('seek requesting', time);
      video.currentTime = time;
    }
  }, randomSeekInterval);
}

function setUpVideoElement(key) {
  const elem = document.createElement('elem');
  elem.classList.add('elem');
  const video = document.createElement('video');
  video.id = 'video' + key;
  video.setAttribute('controls', true);
  const span = document.createElement('span');
  span.id = 'status' + key;

  elem.appendChild(span);
  elem.appendChild(video);

  // add video event handler
  const timeRangesFormatter = (timeRanges) => {
    let ret = '';
    for (let i = 0; i < timeRanges.length; i++) {
      const start = timeRanges.start(i);
      const end = timeRanges.end(i);
      if (i !== 0) ret += ',';
      ret += `${start}-${end}`;
    }
    return ret
  }
  const handler = () => {
    span.innerText = `time=${video.currentTime}\nbuffered=${timeRangesFormatter(video.buffered)}\nseekable=${timeRangesFormatter(video.seekable)}`
  }
  video.addEventListener('loadstart', (event) => { console.log('loadstart', video.buffered, video.seekable) });
  video.addEventListener('progress', (event) => { console.log('progress', video.buffered, video.seekable) });
  video.addEventListener('canplay', (event) => { console.log('canplay', video.buffered, video.seekable) });
  video.addEventListener('canplaythrough', (event) => { console.log('canplaythrough', video.buffered, video.seekable) });
  video.addEventListener('stalled', (event) => { console.log('stalled', video.buffered, video.seekable) });
  video.addEventListener('timeupdate', (event) => { handler(); console.log('timeupdate', video.currentTime) });
  video.addEventListener('seeked', (event) => { handler(); console.log('seeked', video.currentTime) });
  video.addEventListener('seeking', (event) => { handler(); console.log('seeking', video.currentTime) });
  video.addEventListener('pause', (event) => { handler(); console.log('pause', video.currentTime) });
  video.addEventListener('play', (event) => { handler(); console.log('play', video.currentTime) });
  video.addEventListener('playing', (event) => { handler(); console.log('playing', video.currentTime) });

  root.appendChild(elem);
}

function loadVideo(key) {
  return window.electronApi.getLocalFileContent(videoPaths[key])
    .then((buffer) => {
      console.log('mp4 loaded!', buffer);
      const video = document.getElementById('video' + key);
      const url = URL.createObjectURL(new Blob([buffer]));
      video.src = url;
      video.load();
      video.play();
    });
}

const videoPaths = [
  '/Users/ryought/mep-terminal/data/playlist/6035aabb80b6631127953a7b/free-play/20211108_164336/raw/movie.mp4',
  '/Users/ryought/mep-terminal/data/playlist/6035aabb80b6631127953a7b/free-play/20211108_164336/raw/movie.mp4',
  '/Users/ryought/mep-terminal/data/playlist/6035aabb80b6631127953a7b/free-play/20211108_164336/raw/movie.mp4',
];
const videoCount = videoPaths.length;

function setUpAllVideos() {
  for (let key = 0; key < videoCount; key++) {
    setUpVideoElement(key);
    loadVideo(key)
      .then(() => startRandomSeeker(key));
  }
}

setUpAllVideos();
