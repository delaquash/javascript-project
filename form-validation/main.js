const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// to show input error message
const showError=(input, message) => {
    // to pick the parent div
    const formControl = input.parentElement;
    // to use the DOM to manipulate the error message
    formControl.className = 'form-control error';
    // to select the small attribute in html
    const small = formControl.querySelector('small')
    // to view the error message and color the borderline
    small.innerText = message
}

const showSuccess =(input, message)=> {
    // selecting the parent div in html
    const formControl = input.parentElement
    // sending the required message
    formControl.className = 'form-control success'

}

// function that loops through each input and checks the validity
function checkRequired(inputArr) {
    // loop through each of the input field
    inputArr.forEach(function(input){
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
        
    })
}

// fuction to get the field name
const getFieldName=(input)=>{
    // To get the first value of the input field as capital letter during error message
    return input.id.charAt(0).toUpperCase() 
    // This will get the remaining input value and join with the other one
    + input.id.slice(1)
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    // required information fields in an array
    checkRequired([username, email, password, confirmPassword])
})