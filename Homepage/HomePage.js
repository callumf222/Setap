// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var AddItemBtn = document.getElementById("AddItemBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var selectedEvent = null;

// When the user clicks on the button, open the modal
AddItemBtn.onclick = function() {
    modal.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Get the date input element
const dateInput = document.getElementById("dateSelecter");

// Get the value of the date input element and save it as a variable
const selectedDate = dateInput.value;

// Log the selected date to the console


function saveDate() {
    // Get the date input element
    const dateInput = document.getElementById("dateSelecter");

    // Get the value of the date input element and save it as a variable
    const selectedDate = dateInput.value;

    return  Date.parse(selectedDate)

}

function saveEndDate() {
    // Get the date input element
    const dateInput = document.getElementById("endDateSelecter");

    // Get the value of the date input element and save it as a variable
    const selectedEndDate = dateInput.value;

    return Date.parse(selectedEndDate)
}

function saveTitle() {
    var title = document.getElementById("title").value;
    return String(title)
}

function saveTextarea() {
    var textarea = document.getElementById("textarea").value;
    return String(textarea)
}

function saveChecklist() {
    var option1 = document.getElementById("option1").checked;
    var option2 = document.getElementById("option2").checked;
    var option3 = document.getElementById("option3").checked;
    var option4 = document.getElementById("option4").checked;

    return [option1,option2,option3,option4]
}

//use this function to create event on page using data
function saveAll(){
    var eventValue = [saveTitle(), saveTextarea(),saveChecklist(),saveDate(),saveEndDate()]
    
    //console.log(eventValue)

    // Create a new event board item with the collected data
    const eventBoardItem = document.createElement("button");
    eventBoardItem.className = "eventBoard__Item";

    eventBoardItem.setAttribute("onclick", "eventClick(this)");


    const popup = document.createElement("div");



    const itemContent = document.createTextNode(`${eventValue[0]} ${eventValue[1]} ${eventValue[2]} ${eventValue[3]} ${eventValue[4]}`);

    eventBoardItem.appendChild(itemContent);

    const EventBoard = document.getElementById("AllBoard");
    EventBoard.querySelector(".eventBoard__Item_List").appendChild(eventBoardItem);

    modal.style.display = "none";
}




function eventDel() {
    selectedEvent.remove();
    const EventBoard = document.getElementById("DelBoard");
    EventBoard.querySelector(".eventBoard__Item_List").appendChild(selectedEvent);
}


function eventPin() {
    selectedEvent.remove();
    const EventBoard = document.getElementById("PinBoard");
    EventBoard.querySelector(".eventBoard__Item_List").appendChild(selectedEvent);
}

function eventClick(eventBoardItem) {
    if (selectedEvent === eventBoardItem) {
        selectedEvent.style.backgroundColor = "white";
        selectedEvent = null;
    } else if (selectedEvent !== null) {
        selectedEvent.style.backgroundColor = "white";
        selectedEvent = eventBoardItem;
        selectedEvent.style.backgroundColor = "3b4ca8";
    } else {
        selectedEvent = eventBoardItem;
        selectedEvent.style.backgroundColor = "#3b4ca8";
    }
}