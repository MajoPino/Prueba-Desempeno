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

/* import our header component*/
import { secondHeader } from "./components";

/* Get elements from the document */
const header = document.querySelector('header')
const main = document.querySelector('main')

/* Defining the variable for the endpoint */
let flightData = "http://localhost:3000/flights"

/* Fix the routing variants for the header component */
let anchorFlights = "./flights.html"
let anchorBooking = "./booking.html"

/* Calling the components for them to be printed */
secondHeader(header, anchorFlights, anchorBooking)
await allFlights()



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
        <a href="./src/pages/login.html" class="btn btn-primary">Book now!</a>
        </div>
        </div>
        
        `});
  }

main.addEventListener('target', (event) => {
    
})