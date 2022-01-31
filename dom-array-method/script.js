const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortbtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
getRandomUser()
getRandomUser()
getRandomUser()

// fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json()

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

// double everyones money 
function doubleMoney() {
    // user contain name and money
    data = data.map((user) => {
        return {...user, money: user.money * 2};
    })
    updateDOM()
}

// sort by richest
function sortByRichest() {
    // sort from highest to lowest
    data.sort((a, b) => b.money - a.money);
    updateDOM()
}

show only millionaires
function showMillionaires() {
    // filter or remove those with figures less than one million 
   data = data.filter((user) => user.money > 1000000);
    updateDOM()
}


// add new obj to the data array
function addData(obj) {
    data.push(obj)

    updateDOM();
}

// updating DOM
function updateDOM ( providedData = data ) {
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'

    providedData.forEach((item) => {
        // create new div
        const element = document.createElement('div');
        // create a new class with the new div
        element.classList.add('person');
        // pass in html and add to numberToCurrencyStrings to make it appear as monetary value
        element.innerHTML = `<strong>${item.name}</strong> ${numberToCurrencyStrings(item.money)}`;
        // to append a child element which is the element we just constructed
        main.appendChild(element)
    })
}

// convert number to currency strings
const numberToCurrencyStrings=(number) => {
 return `₦` + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



// eventlistener to add more user
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortbtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', showMillionaires)