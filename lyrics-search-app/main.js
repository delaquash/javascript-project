const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// fetch songs
async function searchSongs(term) {
   const res = await fetch (`${apiURL}/suggest/${term}`);
   const data = await res.json();
   showData(data)
}

// to search for song
function showData(data) {
    
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

