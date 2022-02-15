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