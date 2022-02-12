const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount')


const dummyTransaction = [
    {
        id: 1,
        text: 'flower',
        amount: -20
    }, 
    {
        id: 2,
        text: 'Salary',
        amount: 300
    },
    {
        id: 3,
        text: 'Book',
        amount: 10
    },
    {
        id: 4,
        text: 'Camera',
        amount: 150
    }
]

let transactions = dummyTransaction

// add transactions to DOM
const addTransactionToDom = (transactions) => {
    // declare sign
    const sign = transactions.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    // add class based on value
    item.classList.add(transactions.amount < 0 ? 'minus' : 'plus')

    item.innerHTML = `
        ${transactions.text}<span>${sign} ${Math.abs(transactions.amount)}</span>
        <button class="delete-btn">X</button>`;

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



// init app
const init = () => {
    list.innerHTML = '';
    transactions.forEach(addTransactionToDom)
    updateValues()
}

init()