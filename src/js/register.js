// Import SCSS
import '../scss/styles.scss'
// Import Bootstrap JS
import * as bootstrap from 'bootstrap'
//Import Sweetalert
import Swal from 'sweetalert2'

/* import our header component and our alerts*/
import { Header } from './components'
import { smallAlert, errorAlert } from './alerts'

/* Get elements from the document */
const header = document.querySelector('header')
const form = document.querySelector('form')
const name = document.getElementById('name')
const email = document.getElementById('email')
const birthDate = document.getElementById('date')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('password2')

/* Defining the variable for the endpoint */
const userData = "http://localhost:3000/users"

/* Calling the header component for it to be printed */
Header(header)

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const checkedEmail = await emailCheck(email)
    const validatedPassword = validatePassword(password, confirmPassword)

    if (checkedEmail === true && validatedPassword === true) {
        await addNewUser(name, email, birthDate, password)
        smallAlert("User signed up successfully!")
        setTimeout(() => {
            window.location.href = "/"
        }, 2000)
    } else if (checkedEmail === true && validatedPassword === false) {
        errorAlert("The passwords doesn't match, please check if you didn't committed any mistakes on your password!")
    } else if (checkedEmail === false) {
        errorAlert("Please check if your email isn't already signed in!")
    }

})

/* Function to check if the email is already registered in the database */
async function emailCheck(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email.value}`)
    const users = await response.json()

    if (users.length === 0) {
        return true
    } else {
        return false
    }
}

/* Function to validate the accuracy of the password */
function validatePassword(password, confirmPassword) {
    
    if (password.value === confirmPassword.value) {
        return true
    } else {
        return false
    }

}


/* Function to register the new user to the database */
async function addNewUser(name, email, birthDate, password) {
    const newUser = {
        name: name.value,
        email: email.value,
        birthDate: birthDate.value,
        password: password.value,
        roleId: 2
    }

    await fetch(userData, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
}