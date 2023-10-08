const mediaPlayer = document.getElementById('mediaPlayer');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');

playButton.addEventListener('click', function() {
    mediaPlayer.play();
});

pauseButton.addEventListener('click', function() {
    mediaPlayer.pause();
});

mediaPlayer.addEventListener('timeupdate', function() {
    const value = (mediaPlayer.currentTime / mediaPlayer.duration) * 100;
    progress.style.width = value + '%';
});

volume.addEventListener('input', function() {
    mediaPlayer.volume = volume.value;
});
