const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".currentDate"),
    prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
        && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}

renderCalendar();
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) {

            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});



function addEvent() {
   const title = document.getElementById('eventTitle').value,
   desc = document.getElementById('eventDesc').value,
   date = document.getElementById('eventDate').value,

   eventHolder = document.getElementById('printText');
   
   /* This could be used to add more detail to the calendar for when events are being displayed on certain days
   lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
   let liTag = "";
   const dateArray = date.split("-");
    for(let i = 1; i <= lastDateofMonth; i++){
        if (i == dateArray[2]){
            liTag += `<li class="testAdd">${"99"}</li>`;
        }
    }
    */
    

    //Prints the Event data to the page, can be used to save in a database.
   eventHolder.innerHTML += `<li> ${title + " " + desc + " " + date} </li>`
}