class Event {
    constructor(id,title, description, tagList, startDate, endDate) {
        this.id = id
        this.title = title;
        this.description = description;
        this.tagList = tagList;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    set changeid(newId) {this.id = newid;}
    get getid(){return this.id;}

    set changeTitle(newTitle) {this.title = newTitle;}
    get getTitle(){return this.title;}

    set changeDescription(newDescription) {this.description = newDescription;}
    get getDescription(){return this.description;}

    set changeTagList(newTaglist) {this.tagList= newTaglist;}
    get getTagList(){return this.tagList;}

    set changeStartDate(newStartDate) {this.startDate = newStartDate;}
    get getStartDate(){return this.startDate;}

    set changeEndDate(newEndDate) {this.endDate = newEndDate;}
    get getEndDate(){return this.endDate;}

}

function createEvent(id,title, description, tagList, startDate, endDate) {

    const eventBoardItem = document.createElement("button");
    eventBoardItem.className = "eventBoard__Item";

    eventBoardItem.setAttribute("onclick", "eventClick(this)");

    const itemContent = document.createTextNode(`${title} ${description} ${tagList} ${startDate} ${endDate}`);

    eventBoardItem.appendChild(itemContent);

    const EventBoard = document.getElementById("AllBoard");
    EventBoard.querySelector(".eventBoard__Item_List").appendChild(eventBoardItem);
}


if (typeof(Storage) !== "undefined") {
    // Retrieve the events from local storage
    let storedEvents = localStorage.getItem("events");

    // Check if there are previously stored events
    var events = storedEvents ? JSON.parse(storedEvents) : [];

    // Function to add a new event#
    function addEvent(addID,addTitle,addDescription,addTagsList,addStartDate,addEndDate) {
        // Create a new event object
        const id = addID;
        const title = addTitle;
        const description = addDescription;
        const tagList = addTagsList;
        const startDate = new Date (parseInt(addStartDate));
        const endDate = new Date (parseInt(addEndDate));

        const event = new Event(id,title,description,tagList,startDate,endDate);

        // Add the event to the array
        events.push(event);

        // Save the updated array to local storage
        localStorage.setItem("events", JSON.stringify(events));
        console.log(events)
    }

    function deleteEvent(index) {
        // Remove the event from the array
        events.splice(index, 1);

        // Save the updated array to local storage
        localStorage.setItem("events", JSON.stringify(events));
    }

    // Example usage:
    addId = 0;
    addTitle="add this";
    addDescription ="go and get ice";
    addTag1=true;
    addTag2=false;
    addTag3=false;
    addTag4=true;
    addStartDate=1683897922000;
    addEndDate=1683897922000;

    //addEvent(addId,addTitle,addDescription,addTag1,addTag2,addTag3,addTag4,addStartDate,addEndDate);
    //deleteEvent(0,events);
    //addEvent('Test','desc',true,true,false,false,1683897922000,1683897922000);

    //Retrieve the updated events from local storage
    storedEvents = localStorage.getItem("events");
    events = storedEvents ? JSON.parse(storedEvents) : [];


    //currentEvent = events.find(item=> item.id === 0)
    // Display the events
    //console.log(events[0].title);
    console.log(events);

    //-------------------------LOAD EVENTS --------------------------------

    for (let i = 0; i < events.length; i++) {
        createEvent(events[i].id,events[i].title,events[i].description,events[i].tagList,events[i].startDate,events[i].endDate);
    }

} else {
    console.log("Local storage is not supported.");
}


// -------------------------POPUP--------------------------------

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

function saveTagslist() {
    var option1 = document.getElementById("option1").checked;
    var option2 = document.getElementById("option2").checked;
    var option3 = document.getElementById("option3").checked;
    var option4 = document.getElementById("option4").checked;

    return [option1,option2,option3,option4]
}

//use this function to create event on page using data
function saveAll(){
    var id = events.length;

    var eventValue = [id, saveTitle(), saveTextarea(),saveTagslist(),saveDate(),saveEndDate()]
    
    createEvent(id, saveTitle(), saveTextarea(),saveTagslist(),saveDate(),saveEndDate())


    addEvent(eventValue[0],eventValue[1],eventValue[2],eventValue[3],eventValue[4],eventValue[5])

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