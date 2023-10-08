const mediaFileInput = document.getElementById('mediaFile');
const mediaPlayerWrapper = document.getElementById('mediaPlayerWrapper');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeControl = document.getElementById('volumeControl');
const progressBar = document.getElementById('progressBar');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const speedControl = document.getElementById('speedControl');
const loopButton = document.getElementById('loopButton');

let mediaElement;

mediaFileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const objectURL = URL.createObjectURL(file);

        // 根据文件类型选择合适的媒体元素
        if (file.type.startsWith('audio')) {
            mediaElement = document.createElement('audio');
        } else if (file.type.startsWith('video')) {
            mediaElement = document.createElement('video');
        } else {
            console.error('不支持的文件格式');
            return;
        }

        mediaElement.src = objectURL;
        mediaPlayerWrapper.innerHTML = ''; // 清空容器中的旧媒体元素
        mediaPlayerWrapper.appendChild(mediaElement); // 将新的媒体元素添加到容器中
        mediaElement.load();

        mediaElement.addEventListener('timeupdate', updateProgressBar);
        mediaElement.addEventListener('ended', resetPlayerControls);
        mediaElement.addEventListener('loadedmetadata', function() {
            duration.textContent = formatTime(mediaElement.duration);
        });

        // 更新播放器控制器
        playPauseBtn.textContent = '播放';
        volumeControl.value = mediaElement.volume;
        progressBar.value = 0;
        speedControl.value = 1;
        mediaElement.playbackRate = 1;
        mediaElement.loop = false;
    }
});

playPauseBtn.addEventListener('click', function() {
    if (mediaElement) {
        if (mediaElement.paused) {
            mediaElement.play();
            playPauseBtn.textContent = '暂停';
        } else {
            mediaElement.pause();
            playPauseBtn.textContent = '播放';
        }
    }
});

volumeControl.addEventListener('input', function() {
    if (mediaElement) {
        mediaElement.volume = volumeControl.value;
    }
});

speedControl.addEventListener('change', function() {
    if (mediaElement) {
        mediaElement.playbackRate = parseFloat(speedControl.value);
    }
});

loopButton.addEventListener('click', function() {
    if (mediaElement) {
        mediaElement.loop = !mediaElement.loop;
        loopButton.textContent = mediaElement.loop ? '取消循环' : '循环';
    }
});

function updateProgressBar() {
    if (mediaElement) {
        progressBar.value = mediaElement.currentTime;
        currentTime.textContent = formatTime(mediaElement.currentTime);
    }
}

function resetPlayerControls() {
    playPauseBtn.textContent = '播放';
    progressBar.value = 0;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${(remainingSeconds < 10 ? '0' : '')}${remainingSeconds}`;
}
