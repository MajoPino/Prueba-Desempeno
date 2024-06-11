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
const div = document.querySelectorAll('div')

/* Defining the variables for the endpoints */
let flightData = "http://localhost:3000/flights"
let bookingData = "http://localhost:3000/booking"

/* Calling the components for them to be printed */
await allFlights()

/*  Log out event */
btnLogOut.addEventListener('click', () => {
    localStorage.removeItem('userOnline')
    showSmallAlert('success', 'User logged out')
    setTimeout(() => {
        window.location.href = "/"
    }, 2000)
  })

/* Async function that will print the available flights */
async function allFlights() {
    let response = await fetch(flightData)
    let flights = await response.json()
  
    main.innerHTML = ''
  
    flights.forEach(flight => {
        main.innerHTML += `
        
        <div class="card" style="width: 18rem;">
            <img src="${flight.image}" class="card-img-top" alt="${flight.place}">
        <div class="card-body">
        <h5 class="card-title">Flight to ${flight.place}</h5>
        <p class="card-text">${flight.date}</p>
        <p class="card-text">${flight.price}</p>
        <button type="submit" data-id="${flight.id}" class="btn btn-primary">Book now!</button>
        </div>
        </div>
        
        `
        main.addEventListener('submit', (event) => {
        event.preventDefault()
        if ((event.submit)) {
            const id = event.submit.getAttribute("data-id")
            console.log("Yay!")
            smallAlert("Button found!")
            addBooking(id)
    }
        if ((event.submit.classList.contains('btn-primary'))) {
            const id = event.submit.getAttribute("data-id")
            console.log("Yay!")
            smallAlert("Button found!")
            addBooking(id)
    }})
    
    });
  }




async function addBooking(id) {
    let response = await fetch(`${flightData}/${id}`)
    let flights = await response.json()
    let place = flights.place
    let date = flights.date
    let price = flights.price
    let image = flights.image
    let idFlight = flights.id
    let user = localStorage.getItem('userOnline')

    const flight = {
        "name": user,
        "flight": {
            "place": place,
            "date": date,
            "price": price,
            "image": image,
            "id": idFlight
        }
    }

    await fetch(bookingData, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(flight),
    })

    smallAlert("Flight addedd successfully!")
}


