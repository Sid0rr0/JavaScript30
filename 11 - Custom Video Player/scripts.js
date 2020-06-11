const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
    video.paused ? video.play() : video.pause();
}

function updateButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);


function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach( button => button.addEventListener('click', skip) );


function handleRangeUpdate() {
    video[this.name] = this.value;
}

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate) );
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate) );

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);



function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

let mouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);