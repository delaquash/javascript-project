const container = document.querySelector(".container");
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// + is to make movieSelect whci is a string to become number.same as using parseInt(movieSelect)
const ticketPrice = +movieSelect.value

// update total and count

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // to get the number of seat selected in the array 
    const selectedSeatCount = selectedSeats.length
    console.log(selectedSeatCount)
}

container.addEventListener('click', (e) => {
    // to select class of seat in html and and leave out seat-occupied
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        // to pick the selected class and toggle with the 
        e.target.classList.toggle('selected');

        updateSelectedCount()
    }

})