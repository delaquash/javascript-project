const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

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

// regex for email validation 
function checkEmail (input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(",+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-z\-0-9]+\.)+[a-zA-z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input)
    } else {
        showError(input, 'Email is required')
    }
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

// to check the length of input field
const checkLength = (input, min, max)=> {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must at least ${min} characters`)
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else{
        showSuccess(input)
    }
}

// to make sure the 2 password matches
function checkPasswordMatch (input1, input2){
    if(input1.value !== input2.value) {
        showError(input2, 'Password do not match')
    }
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
    checkRequired([username, email, password, password2])
    // to check the length(minimum and maximum)
    checkLength(username, 3, 15)
    checkLength(password, 8, 15)
    checkEmail(email)
    checkPasswordMatch(password, password2)
})