const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// play and pause video
function toggleVideoStatus (){
    if(video.paused){
        video.play()
    } else {
        video.paused()
    }
}

// update play and pause icon
function updatePlayIcon(){
    if(video.paused){
        play.innerHTML='<i class="fa fa-play fa-2x"></i>';
    } else {
        play.innerHTML='<i class="fa fa-pause fa-2x"></i>';
    }
}

// update progress and timestamp
function updateProgress() {
    progress.value = (video.currentTime/video.duration) * 100;

    // get video minutes
    let min = Math.floor(video.currentTime/60);
    if(min < 10) {
        min = '0' + String(min)
    }

    // get video secs
    let secs = Math.floor(video.currentTime % 60 );
    if(secs < 10){
        secs = '0' + String(sec)s
    }

    timestamp.innerHTML = `${min}:${secs}`
}

// set video time to progress
function setVideoProgress() {
    video.currentTime = parseInt(progress.value * video.duration)/100;


}



// stop video
function updateStop(){
    video.currentTime = 0;
    video.pause()
}

// event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProress)