const main = document.querySelector('main');
const voiceSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const closeBtn = document.getElementById('close');
const toggleBtn = document.getElementById('toggle')


const data = [
    {
      image: './img/drink.jpg',
      text: "I'm Thirsty"
    },
    {
      image: './img/food.jpg',
      text: "I'm Hungry"
    },
    {
      image: './img/tired.jpg',
      text: "I'm Tired"
    },
    {
      image: './img/hurt.jpg',
      text: "I'm Hurt"
    },
    {
      image: './img/happy.jpg',
      text: "I'm Happy"
    },
    {
      image: './img/angry.jpg',
      text: "I'm Angry"
    },
    {
      image: './img/sad.jpg',
      text: "I'm Sad"
    },
    {
      image: './img/scared.jpg',
      text: "I'm Scared"
    },
    {
      image: './img/outside.jpg',
      text: 'I Want To Go Outside'
    },
    {
      image: './img/home.jpg',
      text: 'I Want To Go Home'
    },
    {
      image: './img/school.jpg',
      text: 'I Want To Go To School'
    },
    {
      image: './img/grandma.jpg',
      text: 'I Want To Go To Grandmas'
    }
  ];

  data.forEach(createBox);

//   create speech boxes
function createBox(item) {
    const box = document.createElement('div');

const { image, text } = item;

box.classList.add('box');
box.innerHTML = `
  <img src="${image}" alt="${text}"  />
  <p class="info">${text}</p>
`
//
box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // add active class css effect
    box.classList.add('active');
    // set timeouit to remove active css function
    setTimeout(() => {
        box.classList.remove('active')
    }, 800);
})
// @todo - speak event
main.appendChild(box);
}

// init speech synth
const message = new SpeechSynthesisUtterance()

// set text
function setTextMessage(text){
    message.text = text;
}
// speak text
function speakText() {
    speechSynthesis.speak(message)
}

// set voices
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value)
}

// store voices
let voices =[];
function getVoices() {
    voices = speechSynthesis.getVoices();

    // create a div element for each voices
    voices.forEach(voice => {
        const option = document.createElement('option')
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`
        voiceSelect.appendChild(option)
    })
}
// toggle text box open
toggleBtn.addEventListener('click', () => {
    // show is a css class activated by this code
    document.getElementById('text-box').classList.toggle('show')
})

// close text box
closeBtn.addEventListener('click', () => {
    document.getElementById('text-box').classList.remove('show')
})

// voice changed
speechSynthesis.addEventListener('voiceschanged', getVoices)
voiceSelect.addEventListener('change', setVoice)

// read text button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText()
})

getVoices()