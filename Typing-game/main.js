const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
  ];
  
  // Init word
  let randomWord;
  
  // Init score
  let score = 0;
  
  // Init time
  let time = 10;

//   get random words from words

function getRandomWords() {
    return words[Math.floor(Math.random() * words.length)]
}

// add word to DOM
function addWordToDom() {
    randomWord = getRandomWords();
    word.innerHTML = randomWord
}

// function to update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}


addWordToDom();

// event listeners to make typed words bring out words alike in getRandomWords
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if(insertedText ===  randomWord) {
        addWordToDom();
        updateScore()

        // to clear input field
        e.target.value = '';
    }
})