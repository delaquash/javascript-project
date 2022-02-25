const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh'

// fetch songs
async function searchSongs(term) {
   const res = await fetch (`${apiURL}/suggest/${term}`);
   const data = await res.json();
   showData(data)
}

// to search for song
function showData(data) {
  
    result.innerHTML = `
    <ul class="songs>
        ${data.data.map(song => 
            `<li>
                <span><strong>${song.artist.name}</strong> -${song.title}</span>
                <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">
                    Get Lyrics                
                </button>            
            </li>`
            // to turn from array to a string
        ).join('')}
    </ul>
    `;

    // pagination----previous and next
    if(data.prev || data.next) {
        more.innerHTML = `
        ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')")>Prev</button>`:''}
        ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.prev}')")>Next</button>`:''}
        `
    } else{
        more.innerHTML ='';
    }
}

// prev and next song
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${apiURL}`)
    const data = await res.json();

    showData(data)
}

// get lyrics for song
async function getLyrics(artist, songTitle){
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`)

    const data = res.json();
    console.log(data)
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = `<h2><strong> ${artist}</strong> -${songTitle}</h2><span>${lyrics}</span>`;

    more.innerHTML = '';
}

// event listeners
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim();
    
    if(!searchTerm){
        alert('Please enter a value to search with');
    } else {
        searchSongs(searchTerm);
    }
})

// get lyrics from button
result.addEventListener('click', e => {
    const clickedEl = e.target;

    if(clickedEl.tagName === 'BUTTON'){
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songtitle'); 
        
        getLyrics(artist, songTitle)
    }
})