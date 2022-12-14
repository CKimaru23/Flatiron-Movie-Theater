const movieUrl = "http://localhost:3000/films";

document.addEventListener('DOMContentLoaded',()=>{
    //function that fetches a movie
    function fetchMovie(){
        fetch(movieUrl)
        .then(response =>response.json())
        .then(data =>{

            //variable declaration
            const onScreen = data[0]; //the first index

            const movieImg = document.getElementById("poster");
            const filmTitle = document.getElementById("filmTitle");
            const movieDescription = document.getElementById("movieDescription");
            const runTime = document.getElementById("runtime");
            const showTime = document.getElementById("showtime");
            const ticketsAvailable =document.getElementById("ticketsAvailable");

            //putting data on the DOM
            movieImg.src = onScreen.poster;
            filmTitle.innerText = onScreen.title;
            movieDescription.innerText = onScreen.description;
            runTime.innerText =`Runtime: ${onScreen.runtime} minutes `;
            showTime.innerText =`Showtime: ${onScreen.showtime} `;
            ticketsAvailable.innerText =`Available Tickets: ${onScreen.capacity - onScreen.tickets_sold} `;


            const buyTicket = document.getElementById("buyTicket");
            let ticketBal = parseInt(onScreen.capacity - onScreen.tickets_sold);

            //adding event listenet to button 'Buy Ticket'
            buyTicket.addEventListener('click',()=>{
                ticketBal--; //decrement

                //If the remaining tickets are less than or equal to zero
                if(ticketBal <= 0){
                    const movie1 = document.getElementById("1");
                    movie1.innerHTML=`${onScreen.title}  <span class="badge bg-danger me-1">SOLD OUT</span>`; //Shows 'SOLD OUT' in red

                    ticketsAvailable.innerHTML = `Available Tickets:  <span class="badge bg-danger">SOLD OUT</span>`
                }else{ //else
                    ticketsAvailable.innerText = `Available Tickets: ${ticketBal}`;
                }
            })
        })
    }

    function movieData() {
        fetch(movieUrl)
        .then(response=>response.json())
        .then(data=>{
            data.map((item) => {
                const li = document.createElement("li");
                const list = document.getElementById("onScreen");

                li.classList.add("list-group-item", "border", "movie"); //adding some of the classes from bootstrap

                li.setAttribute('id',`${item.id}`); //setting an id attribute
                li.innerText = item.title;

                list.appendChild(li) //appending li to ul with id 'onScreen'

                //adding event listener to the list of movies on the left
                li.addEventListener('click',()=>{

                    //declaring variables
                    const movieImg = document.getElementById("poster");
                    const filmTitle = document.getElementById("filmTitle");
                    const movieDescription = document.getElementById("movieDescription");
                    const runTime = document.getElementById("runtime");
                    const showTime = document.getElementById("showtime");
                    const availableTickets =document.getElementById("ticketsAvailable");

                    //putting data on the DOM
                    movieImg.src = item.poster;
                    filmTitle.innerText = item.title;
                    movieDescription.innerText = item.description;
                    runTime.innerHTML =`Runtime: <span>${item.runtime}</span> `;
                    showTime.innerText =`Showtime: ${item.showtime} `;
                    availableTickets.innerText =`Available Tickets: ${item.capacity - item.tickets_sold} `;

                    const ticketsBuy = document.getElementById("buyTicket");
                    let ticketBal = parseInt(item.capacity - item.tickets_sold);

                    //Adding Event Listeners to 'Buy Ticket' button
                    ticketsBuy.addEventListener('click',()=>{

                        ticketBal -- //decrementing the tickets once 'Buy Ticket' is clicked.
                        if(ticketBal <= 0){
                            li.innerHTML =`${item.title} <span class="badge bg-danger">SOLD OUT</span> `; //shows 'SOLD OUT' in red that spans

                            availableTickets.innerHTML = `Available Tickets: <span class="badge bg-danger">SOLD OUT</span> `;

                        }else{ //else

                            availableTickets.innerText = `Available Tickets: ${ticketBal} `;
                        }

                    });
                });
            });
        });
    }

    //calling the functions
    movieData();
    fetchMovie();
})