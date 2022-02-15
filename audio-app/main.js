const musicContainer = document.getElementById('music-container')
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextbtn = document.getElementById('next');
const audio = document.getElementById('audio')
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// song titles
const songs = ['hey', 'summer', 'ukulele']

// keep track of song
let songIndex = 2;

// initially load song details
loadSong(songs[songIndex])

// update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `image/${song}.jpg`
}

// play song
function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}
// pause song
function pauseSong(){
    musicContainer.classList.remove('pause')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause()

}

// event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong()
    } else {
        playSong()
    }
})

// play previous song 
function prevSong() {
    // decrease song by -1 from the songIndex
    songIndex--

    if(songIndex < 0 ){
        // settings song to the last song in the array
        songIndex = songs.length -1
    }

    // load song with index and last song array
    loadSong(songs[songIndex]);
    playSong();
}

// update progress bar
function updateTimeProgress(e){
    // destructuring duration and currentTime away from e.srcElement
    const { duration, currentTime } = e.srcElement
    const currentProgress = (currentTime/duration) * 100
    // pass the currentprogress into progress div
    progress.style.width = `${currentProgress}%`
}

// set progress bar
function setProgressBar(e) {
    const width = this.clientWidth
    // console.log(width);
    const clickX = e.offsetX
    // console.log(clickX);
    const duration = audio.duration;

    audio.currentTime = (clickX/width) * duration;
}


// play next song
function nextSong() {
    // increase song by +1
    songIndex++
    if(songIndex > songs.length - 1) {
        songIndex=0;
    }
        loadSong(songs[songIndex])
        playSong()
    }


// change songs
prevBtn.addEventListener('click', prevSong)
nextbtn.addEventListener('click', nextSong)

// time/song update
audio.addEventListener('timeupdate', updateTimeProgress);

// click on progress bar
progressContainer.addEventListener('click', setProgressBar)

// to move to next song when the song ends
audio.addEventListener('ended', nextSong);