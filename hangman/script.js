const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letter');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('pop-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');
const words = ['application', 'programming', 'interface', 'wizard'];

// to get any random word from the array of words above
const randomWords = words[Math.floor(Math.random() * words.length)];

// array to store correct letters 
const correctLetters = [];
// store wrong letter
const wrongLetters = [];

// show hidden words
function showWords() {
    wordEl.innerHTML = `${randomWords
    .split('')
    .map(letter => `
        <span class="letter">
        // /* if the letter we are looking for is in the array of correctLetters, then show it or else, leave it empty */
        { correctLetters.includes(letter) ? letter : '' }
        </span>)`
    ).join('')}`
};


// to make the innerword from the correctLetters array not appear on a single line
const innerWord = wordEl.innerText.replace(/\n/g, '');

if(innerWord === randomWords) {
    finalMessage.innerText ='Congratulation, You have won!'
    popup.style.display = 'flex'
}

// update the wrong letters
function updateWrongLettersEl() {
    console.log('wrong letters');
}

// show notifications
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000);

}


// keydown letter press
window.addEventListener('keydown', e => {
    // keyCode are numbers that each  key on the laptop generate
    if(e.key >= 65 && e.key <= 90) {
        const letter = e.key;
        if(randomWords.includes(letter)){
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter)
                showWords()
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            }
        }
    }
});

showWords();