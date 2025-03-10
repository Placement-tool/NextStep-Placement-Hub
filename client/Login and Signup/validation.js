const form = document.getElementById('form')
const name_input = document.getElementById('name-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const confirm_password_input = document.getElementById('confirm-password-input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) =>{
    let errors = []

    if(name_input){
        // if there is a name input, then the user is using the sign up form
        errors = getSignupFormErrors(name_input.ariaValueMax, email_input.ariaValueMax, password_input.ariaValueMax, confirm_password_input.value)
    }
    else{
        // if there is no name input, then the user is using the log in form
        errors = getLoginFormErrors(email_input.value, password_input.value)
    }

    if(errors.length > 0){
        // if there are any errors
        e.preventDefault()
        error_message.innerText = errors.join(". ")
    }
})

function getSignupFormErrors(name, email, password, confirmPassword){
    let errors = []

    if (name == '' || name == null){
        errors.push('Name is required')
        name_input.parentElement.classList.add('incorrect')
    }

    if (email == '' || email == null){
        errors.push('Email is required')
        name_input.parentElement.classList.add('incorrect')
    }

    if (password == '' || password == null){
        errors.push('Password is required')
        name_input.parentElement.classList.add('incorrect')
    }

    if(password.length < 8){
        errors.push('Password must have at least 8 characters')
        password_input.parentElement.classList.add('incorrect')
    }

    if(password !== confirm_password_input){
        errors.push('Password does not match confirm password')
        password_input.parentElement.classList.add('incorrect')
        confirm_password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}

function getLoginFormErrors(email, password){
    let errors = []

    if (email == '' || email == null){
        errors.push('Email is required')
        name_input.parentElement.classList.add('incorrect')
    }

    if (password == '' || password == null){
        errors.push('Password is required')
        name_input.parentElement.classList.add('incorrect')

    return errors;
}


const allInputs = [name_input, email_input, password_input, confirm_password_input].filter(input => input != null)

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect')
            error_message,innerText = ''
        }
    })
})
}
