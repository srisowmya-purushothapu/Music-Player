let currentmusic = 0;
const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');
playBtn.addEventListener('click', () => {
    if (playBtn.classList.contains('pause')) {
        music.play();
    } else {
        music.pause();
    }
    playBtn.classList.toggle('pause');
});
music.addEventListener('timeupdate', () => {
    const { currentTime, duration } = music;
    seekBar.value = currentTime;
    currentTime.innerHTML = formatTime(currentTime);

    const minutesCurrentTime = Math.floor(currentTime / 60);
    const secondsCurrentTime = Math.floor(currentTime % 60);
    currentTime.textContent = `${minutesCurrentTime < 10 ? '0' : ''}${minutesCurrentTime}:${secondsCurrentTime < 10 ? '0' : ''}${secondsCurrentTime}`;

    const minutesDuration = Math.floor(duration / 60);
    const secondsDuration = Math.floor(duration % 60);
    musicDuration.textContent = `${minutesDuration < 10 ? '0' : ''}${minutesDuration}:${secondsDuration < 10 ? '0' : ''}${secondsDuration}`;
});
seekBar.addEventListener('input', () => {
    const { value } = seekBar;
    music.currentTime = value;
});
forwardBtn.addEventListener('click', () => {
    music.currentTime += 10;
});
backwardBtn.addEventListener('click', () => {
    music.currentTime -= 10;
});
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
};
music.addEventListener('loadedmetadata', () => {
    seekBar.max = music.duration;
    currentTime.innerHTML = formatTime(music.currentTime);
});
setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
}, 500);