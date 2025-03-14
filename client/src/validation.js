export function getSignupFormErrors(name, email, password, confirmPassword) {
    let errors = [];
    const name_input = document.getElementById('name-input');
    const email_input = document.getElementById('email-input');
    const password_input = document.getElementById('password-input');
    const confirm_password_input = document.getElementById('confirm-password-input');

    if (!name || name.trim() === '') {
        errors.push('Name is required');
        name_input.parentElement.classList.add('incorrect');
    }

    if (!email || email.trim() === '') {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
        email_input.parentElement.classList.add('incorrect');
    }

    if (!password || password.trim() === '') {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    } else if (password.length < 8) {
        errors.push('Password must have at least 8 characters');
        password_input.parentElement.classList.add('incorrect');
    }

    if (password !== confirmPassword) {
        errors.push('Password does not match confirm password');
        password_input.parentElement.classList.add('incorrect');
        confirm_password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

export function getLoginFormErrors(email, password) {
    let errors = [];
    const email_input = document.getElementById('email-input');
    const password_input = document.getElementById('password-input');

    if (!email || email.trim() === '') {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
        email_input.parentElement.classList.add('incorrect');
    }

    if (!password || password.trim() === '') {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
    //const form = document.getElementById('form');
    const error_message = document.getElementById('error-message');
    
    // only add input event listeners 
    // don't add submit handler here because it's in auth.js
    const inputs = [
        document.getElementById('name-input'),
        document.getElementById('email-input'),
        document.getElementById('password-input'),
        document.getElementById('confirm-password-input')
    ].filter(input => input !== null);

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.parentElement.classList.contains('incorrect')) {
                input.parentElement.classList.remove('incorrect');
                if (error_message) {
                    error_message.innerText = '';
                }
            }
        });
    });
});