const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount')


// const dummyTransaction = [
//     {
//         id: 1,
//         text: 'flower',
//         amount: -20
//     }, 
//     {
//         id: 2,
//         text: 'Salary',
//         amount: 300
//     },
//     {
//         id: 3,
//         text: 'Book',
//         amount: 10
//     },
//     {
//         id: 4,
//         text: 'Camera',
//         amount: 150
//     }
// ]

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : []

const addTransaction=(e) => {
    e.preventDefault()

    if(amount.value.trim() && text.value.trim() === '') {
        alert('Please add amount and value')
    } else {
        const transaction = {
            id: generateID,
            text: text.value,
            // the + sign is to make amount which is a string to become a number
            amount: +amount.value
        }
        transactions.push(transaction)
        addTransactionToDom(transaction)
        updateValues()
        updateLocalStorage()
        // to clear the input form after submission of values
        text.value ='';
        amount.value='';
    }

}

// generate random ID

function generateID() {
    return Math.floor(Math.random() * 100000000)
}

// add transactions to DOM
const addTransactionToDom = (transaction) => {
    // declare sign
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    // add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

    item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
        <button 
            onclick="removeTransaction(${transaction.id})
        class="delete-btn">
        x
        </button>`;

        list.appendChild(item)
}

// update the balance, income and expense
function updateValues () {
    const amounts = transactions.map( transaction => transaction.amount);
    // total money in both expenses and income
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
    // money received
    const income = amounts  
                        .filter(item => item > 0)
                        .reduce((acc, item) => (acc += item), 0)
                        .toFixed(2);
// expenditure or money spent
    const expenses = (amounts
                        .filter(item => item < 0)
                        .reduce((acc, item) => (acc += item), 0)
                        .toFixed(2)

    )

    balance.innerHTML = `$${total}`;
    money_plus.innerHTML= `$${income}`
    money_minus.innerHTML = `$${expenses}`
}

// remove a particular transaction via ID
const removeTransaction = (id) => {
    transactions = transactions.filter(transaction => transaction.id !== id)
    updateLocalStorage();
    init()
}

// update localStorage to set value
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}



// init app
const init = () => {
    list.innerHTML = '';
    transactions.forEach(addTransactionToDom)
    updateValues()
}

init()

form.addEventListener('submit', addTransaction)