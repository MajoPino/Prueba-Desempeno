/* 
Mariajose Pino Ortega
Clan Gates
Tuesday June/11/2024 */


// Import SCSS
import '../scss/styles.scss'
// Import Bootstrap JS
import * as bootstrap from 'bootstrap'
//Import Sweetalert
import Swal from 'sweetalert2'

/* import our alerts*/
import { smallAlert, errorAlert } from './alerts'

/* Get elements from the document */
const header = document.querySelector('header')
const main = document.querySelector('main')
const btnLogOut = document.getElementById('btn-log-out')
const tbody = document.querySelector('tbody')
const form = document.querySelector('form')


/* Defining the variables for the endpoints */
let flightData = "http://localhost:3000/flights"
let bookingData = "http://localhost:3000/booking"

/*  Log out event */
btnLogOut.addEventListener('click', () => {
    localStorage.removeItem('userOnline')
    showSmallAlert('success', 'User logged out')
    setTimeout(() => {
        window.location.href = "/"
    }, 2000)
  })

/* Read function */
async function getFlights(tbody) {
    let response = await fetch(bookingData)
    let flights = await response.json()
  
    tbody.innerHTML = ''

    flights.forEach(flight => {
        tbody.innerHTML += `
        <tr>
            <td>${flight.place}</td>
            <td>${flight.date}</td>
            <td>${flight.price}</td>
            <td>
            <img src="${flight.image}" alt="${flight.place}" width="200px">
            </td>
            <td>
                <button class="btn btn-warning" data-id=${flight.id}>edit</button>
                <button class="btn btn-danger" data-id=${flight.id}>delete</button>
            </td>
        </tr>
        `})
}

getFlights(tbody)

tbody.addEventListener('click', async function (event) {
    if (event.target.classList.contains('btn-danger')) {
        console.log("yay")
        const id = event.target.getAttribute("data-id")
        deleteData(id)
    }
    if (event.target.classList.contains('btn-warning')) {
        const id = event.target.getAttribute("data-id")

    }
})

/* Delete function */
async function deleteData(id) {
    await fetch(`${bookingData}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    await getFlights(tbody)
}



