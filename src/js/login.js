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
const email = document.getElementById('email')
const password = document.getElementById('password')

/* Defining the variables for the endpoints */
const userData = "http://localhost:3000/users"
const roleData = "http://localhost:3000/role"

/* Fix the routing variants for the header component */
const login = "./login.html"
const signup = "../auth/register.html"

/* Calling the header component for it to be printed */
Header(header, login, signup)


/* Make the event for the log in */
form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const user = await emailCheck(email)

    if (user === false) {
        errorAlert("The user doesn't exist, please check if the information is well written or Sign up!")
    } else {
        if (user.password === password.value) {
            smallAlert(`Welcome ${user.name}!`)
            if (user.roleID === 1) {
                setTimeout(() => {
                    localStorage.setItem("userOnline", JSON.stringify(user))
                    window.location.href = "./flightsManagement.html"
                }, 2000)
            } else {
                setTimeout(() => {
                    localStorage.setItem("userOnline", JSON.stringify(user))
                    window.location.href = "./flights.html"
                }, 2000)
            }
        } else {
            errorAlert("The password you entered is incorrect! Please correct the password.")
        }
    }
})

/* Function to check the existance of the user in the database */
async function emailCheck(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email.value}`)
    const users = await response.json()

    if (users.length === 1) {
        return users[0]
    } else {
        return false
    }
}