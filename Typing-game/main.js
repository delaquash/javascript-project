const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
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

//   initial difficulty level to be the value in localStorage or medium
let difficulty =localStorage.getItem('difficulty') !== null ?localStorage.getItem('difficulty') :'medium'
  
// set difficulty select mode
difficultySelect.value = localStorage.getItem('difficulty') !== null ?localStorage.getItem('difficulty') :'medium'

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

// updateTime function
function updateTime() {
    time--;
    timeEl.innerHTML = time;

    if(time === 0) {
        // time stops here
        clearInterval(timeInterval)
        // when times stops, game should be over
        gameOver()
    }
}

// engame or game over function
function gameOver() {
    endgameEl.innerHTML = `
     <h1>You ran out of time</h1>
     <p>Your score is ${score}</p>
     <button onclick='location.reload()'>Reload</button>
    `
    // this overrides the display set in css
    endgameEl.style.display ="flex";
}

// focus on text input area on start or page reload
text.focus()

// start time countdown from 1milliseconds which is same as 1000
const timeInterval = setInterval(updateTime, 1000)


addWordToDom();

// event listeners to make typed words bring out words alike in getRandomWords
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if(insertedText ===  randomWord) {
        addWordToDom();
        updateScore()

        // to clear input field
        e.target.value = '';
        // setting timer according to difficulty level
        if(difficulty === 'hard') {
            time += 2
        } else if(difficulty === 'medium') {
            time += 3
        }else {
            time += 5
        }

        // {difficulty === 'hard' ? time += 2 : difficulty === 'medium' ? time +3 : difficulty === 'easy' ? time +5}

        // update the new added time to initial time
        updateTime()
    }
})

// setting btn click for difficulty level
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide')
})

// setting selection of difficulty level
settingsForm.addEventListener('change', (e) => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty)
})