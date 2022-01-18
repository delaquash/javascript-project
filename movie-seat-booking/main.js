const container = document.querySelector(".container");
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// + is to make movieSelect whci is a string to become number.same as using parseInt(movieSelect)
let ticketPrice = +movieSelect.value

// save selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

// update total and count

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // copy selected seats into an array
    // map through array                                  // return a new array indexes
    const seatsIndex = [...selectedSeats].map((seat) => ([...seats].indexOf(seat)) )

    // localStorage to set the value
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))


    // to get the number of seat selected in the array 
    const selectedSeatCount = selectedSeats.length
    count.innerText = selectedSeatCount
    total.innerText = selectedSeatCount * ticketPrice
}

// movie select event and change of price
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})


// get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }
}



// seat click event
container.addEventListener('click', (e) => {
    // to select class of seat in html and and leave out seat-occupied
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        // to pick the selected class and toggle with the 
        e.target.classList.toggle('selected');

        updateSelectedCount()
    }

})

// initial count and total set
updateSelectedCount()