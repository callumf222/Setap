class Event {
    constructor(id,title, description, tagList, startDate, endDate) {
        this.id = id
        this.title = title;
        this.description = description;
        this.tagList = tagList;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    set changeid(newId) {this.id = newId;}
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

function convertTimestamp(timestamp) {
    var d = new Date(timestamp), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    // ie: 2014-03-24, 3:00 PM
    time = yyyy + '-' + mm + '-' + dd;
    return time;
}

function convertTagList(tagList) {
    let result = "";
    
    if (tagList[0]) {
      result += "Work ";
    }
    
    if (tagList[1]) {
      result += "Social ";
    }
    
    if (tagList[2]) {
      result += "Chores ";
    }
    
    if (tagList[3]) {
      result += "Reminders";
    }
    
    return result.trim();
  }
  

function createEventBoard(id,title, description, tagList, startDate, endDate) {

    if (startDate == null) {
        startDate = new Date();
    }
    if (endDate == null) {
        endDate = new Date();
    }
    const eventBoardItem = document.createElement("button");
    eventBoardItem.className = "eventBoard__Item";

    eventBoardItem.setAttribute("id", id);
    eventBoardItem.setAttribute("onclick", "eventClick(this)");

    const itemContent = document.createTextNode(`Title: ${title} | Description: ${description} | Tags: ${convertTagList(tagList)} | StartDate: ${convertTimestamp(startDate)} | EndDate: ${convertTimestamp(endDate)}`);

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
    function addEventArray(addID,addTitle,addDescription,addTagsList,addStartDate,addEndDate) {


        // Create a new event object
        const id = addID;
        const title = addTitle;
        const description = addDescription;
        const tagList = addTagsList;
        const startDate = new Date (parseInt(addStartDate)); //if im passing a date object here, this should make errors but it isnt somehow?
        const endDate = new Date (parseInt(addEndDate));

        const event = new Event(id,title,description,tagList,startDate,endDate);

        // Add the event to the array
        events.push(event);

        // Save the updated array to local storage
        localStorage.setItem("events", JSON.stringify(events));

        console.log(events[events.length - 1]);
    }



    function deleteEvent() {
        // Remove the event from the array


        events.splice(selectedEvent.id, 1);

        events.forEach((event, newIndex) => {

            //change id of the event in html
            let eventHtml = document.getElementById(String(event.id));

            eventHtml.id = String(newIndex);

            event.id = newIndex;
        })


        let eventHtml = document.getElementById(selectedEvent.id);

        eventHtml.remove();



        // Save the updated array to local storage
        localStorage.setItem("events", JSON.stringify(events));



        updateNextEvent();
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

    //addEventArray(addId,addTitle,addDescription,addTag1,addTag2,addTag3,addTag4,addStartDate,addEndDate);
    //deleteEvent(0,events);
    //addEventArray('Test','desc',true,true,false,false,1683897922000,1683897922000);

    //Retrieve the updated events from local storage
    storedEvents = localStorage.getItem("events");
    events = storedEvents ? JSON.parse(storedEvents) : [];


    // currentEvent = events.find(item=> item.id === 0)
    // Display the events
    // console.log(events[0].title);

    console.log("loaded " + events.length + " events");
    console.log(events);
    updateNextEvent();

    function submitting() {
        var userInput = document.getElementById("pasteshare").value;
        const submitArray = userInput.split(",");
        const tagsList = [submitArray[2],submitArray[3],submitArray[4],submitArray[5]];
        if (submitArray.length != 8) {
            document.getElementById("feedback").innerText = "Invalid import string";
            return;
        }

        let id = correctId();

        console.log(submitArray[6]);
        console.log(submitArray[7]);

        //addEvent(addId,addTitle,addDescription,addStartDate,addEndDate);
        addEventArray(id,submitArray[0],submitArray[1],submitArray[2],tagsList,submitArray[6],submitArray[7]);



        document.getElementById("pasteshare").value = "";
        document.getElementById("feedback").innerText = "Event imported";
        // Save the updated array to local storage
        localStorage.setItem("events", JSON.stringify(events));
        createEventBoard(id,submitArray[0],submitArray[1],submitArray[2],tagsList,submitArray[6],submitArray[7]);
    }
    console.log(events);
    let idArray = [];
    function correctId() {
        events.forEach((i) => {
            idArray.push(i.id);
        })
        const maxId = Math.max(...idArray);
        //console.log(maxId);
        return maxId+1;
    }
    function copyToClipboard(index) {
        //console.log(events[0]);


        const startDate = new Date(selectedEvent.startDate);
        const endDate = new Date(selectedEvent.endDate);

        const values = [selectedEvent.title, selectedEvent.description, selectedEvent.tagList, startDate.valueOf(), endDate.valueOf()]

        const outputStr = values.join(",");

        navigator.clipboard.writeText(outputStr).value;

    }

    //-------------------------LOAD EVENTS --------------------------------

    for (let i = 0; i < events.length; i++) {
        createEventBoard(events[i].id,events[i].title,events[i].description,events[i].tagList,events[i].startDate,events[i].endDate);
    }

} else {
    console.log("Local storage is not supported.");
}


// -------------------------CREATE POPUP--------------------------------

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var AddItemBtn = document.getElementById("AddItemBtn");

// Get the <span> element that closes the modal
var span = document.getElementById("Span1");

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
    if (Date.parse(selectedDate) < Date.now() || selectedDate == "") {
        return Date.now()
    }

    return  Date.parse(selectedDate)
}

function saveEndDate() {
    // Get the date input element
    const dateInput = document.getElementById("endDateSelecter");

    // Get the value of the date input element and save it as a variable
    const selectedEndDate = dateInput.value;

    if (Date.parse(selectedEndDate) < Date.now() || selectedEndDate == "") {
        return Date.now()
    }

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


    let id = events.length;

    var eventValue = [id, saveTitle(), saveTextarea(),saveTagslist(),saveDate(),saveEndDate()]
    
    createEventBoard(id, saveTitle(), saveTextarea(),saveTagslist(),saveDate(),saveEndDate())



    addEventArray(eventValue[0],eventValue[1],eventValue[2],eventValue[3],eventValue[4],eventValue[5])

    modal.style.display = "none";

    updateNextEvent();

}

//-------------------------EDIT POPUP--------------------------------

// Get the modal
const editModal = document.getElementById("editModal");

// Get the <span> element that closes the modal
const editSpan = document.getElementById("editSpan");



function eventClick(eventBoardItem) {


    let editModal = document.getElementById("editModal");
    editModal.style.display = "block";

    console.log()

    events.forEach(event => { if (event.id === parseInt(eventBoardItem.id)) { selectedEvent = event } })


    //put values into edit modal



    let editTitle = document.getElementById("edit-title");
    if (selectedEvent.title) {
        editTitle.value = selectedEvent.title;
    } else {
        editTitle.value = "";
    }

    let editTextarea = document.getElementById("edit-textarea");
    if (selectedEvent.description) {
        editTextarea.value = selectedEvent.description;
    } else {
        editTextarea.value = "";
    }

    let editOption1 = document.getElementById("edit-option1");
    if (selectedEvent.tagList && selectedEvent.tagList[0]) {
        editOption1.checked = selectedEvent.tagList[0];
    } else {
        editOption1.checked = false;
    }

    let editOption2 = document.getElementById("edit-option2");
    if (selectedEvent.tagList && selectedEvent.tagList[1]) {
        editOption2.checked = selectedEvent.tagList[1];
    } else {
        editOption2.checked = false;
    }

    let editOption3 = document.getElementById("edit-option3");
    if (selectedEvent.tagList && selectedEvent.tagList[2]) {
        editOption3.checked = selectedEvent.tagList[2];
    } else {
        editOption3.checked = false;
    }

    let editOption4 = document.getElementById("edit-option4");
    if (selectedEvent.tagList && selectedEvent.tagList[3]) {
        editOption4.checked = selectedEvent.tagList[3];
    } else {
        editOption4.checked = false;
    }

    let editDateSelecter = document.getElementById("edit-dateSelecter");
    if (selectedEvent.startDate) {

        let startDate = new Date(selectedEvent.startDate);


        let day = ("0" + startDate.getDate()).slice(-2);
        let month = ("0" + (startDate.getMonth() + 1)).slice(-2);

        let startDateFormat = startDate.getFullYear()+"-"+(month)+"-"+(day) ;


        editDateSelecter.value = startDateFormat;
    } else {
        editDateSelecter.value = "";
    }

    let editEndDateSelecter = document.getElementById("edit-endDateSelecter");
    if (selectedEvent.endDate) {

        let endDate = new Date(selectedEvent.endDate);


        let day = ("0" + endDate.getDate()).slice(-2);
        let month = ("0" + (endDate.getMonth() + 1)).slice(-2);

        let endDateFormat = endDate.getFullYear()+"-"+(month)+"-"+(day) ;


        editEndDateSelecter.value = endDateFormat;
    } else {
        editEndDateSelecter.value = "";
    }



}

// When the user clicks on <span> (x), close the modal
editSpan.onclick = function() {
    editModal.style.display = "none";
}

// When the user clicks anywhere outside of the editModal, close it
window.onclick = function(event) {
    if (event.target == editModal) {
        editModal.style.display = "none";
    }
}









// Get the date input element
const editDateInput = document.getElementById("edit-dateSelecter");

// Get the value of the date input element and save it as a variable
const editSelectedDate = editDateInput.value;

// Log the selected date to the console


function editSaveDate() {
    // Get the date input element
    const editDateInput = document.getElementById("edit-dateSelecter");

    // Get the value of the date input element and save it as a variable
    const editSelectedDate = editDateInput.value;

    return  Date.parse(editSelectedDate)

}

function editSaveEndDate() {
    // Get the date input element
    const editDateInput = document.getElementById("edit-endDateSelecter");

    // Get the value of the date input element and save it as a variable
    const selectedEndDate = editDateInput.value;

    return Date.parse(selectedEndDate)
}

function editSaveTitle() {
    let title = document.getElementById("edit-title").value;
    return String(title)
}

function editSaveTextarea() {
    let textarea = document.getElementById("edit-textarea").value;
    return String(textarea)
}

function editSaveTagslist() {
    let option1 = document.getElementById("edit-option1").checked;
    let option2 = document.getElementById("edit-option2").checked;
    let option3 = document.getElementById("edit-option3").checked;
    let option4 = document.getElementById("edit-option4").checked;

    return [option1,option2,option3,option4]
}

//use this function to create event on page using data
function saveEdit(){

    let id = events.length;

    deleteEvent(selectedEvent.id)


    let eventValue = [id, editSaveTitle(), editSaveTextarea(),editSaveTagslist(),editSaveDate(),editSaveEndDate()]

    createEventBoard(id, editSaveTitle(), editSaveTextarea(),editSaveTagslist(),editSaveDate(),editSaveEndDate())


    addEventArray(eventValue[0],eventValue[1],eventValue[2],eventValue[3],eventValue[4],eventValue[5])

    editModal.style.display = "none";

    updateNextEvent();

}


var closestEvent = null;


function createNextEvent() {
    let nextEvent = document.createElement("div");
    nextEvent.className = "eventBoard__Item";
    nextEvent.id = "nextEvent";

    // search through events for the next event

    const now = new Date();

    let closestDate = null;
    let minDifference = Infinity;

    events.forEach(event => {
        let eventDate = new Date(event.startDate);
        let difference = eventDate - now;

        if (difference < minDifference) {
            minDifference = difference;
            closestDate = eventDate;
            closestEvent = event;

        }
    })

    const itemContent = document.createTextNode(`Title: ${closestEvent.title} | Description: ${closestEvent.description} | Tags: ${convertTagList(closestEvent.tagList)} | StartDate: ${convertTimestamp(closestEvent.startDate)} | EndDate: ${convertTimestamp(closestEvent.endDate)}`);


    nextEvent.appendChild(itemContent);

    const EventBoard = document.getElementById("nextBoard");
    EventBoard.querySelector(".eventNext__Item-input").appendChild(nextEvent);

}

function updateNextEvent() {

    if (events.length > 0) {

        if (document.getElementById("nextEvent") === null) {
            createNextEvent();


        } else {
            document.getElementById("nextEvent").remove();
            createNextEvent();


        }
    }
}


function eventArch() {

    let eventBoardItem = document.getElementById(selectedEvent.id);

    eventBoardItem.remove();
    const EventBoard = document.getElementById("ArchiveBoard");
    EventBoard.querySelector(".eventBoard__Item_List").appendChild(eventBoardItem);
}


function eventPin() {

    //maybe just update the tag which gets checked on saveedit

    let eventBoardItem = document.getElementById(selectedEvent.id);

    eventBoardItem.remove();
    const EventBoard = document.getElementById("PinBoard");
    EventBoard.querySelector(".eventBoard__Item_List").appendChild(eventBoardItem);
}

// Get the modal
const delModal = document.getElementById("delModal");

// Get the <span> element that closes the modal
const delSpan = document.getElementById("delSpan");
function delConfirm() {

    let delModal = document.getElementById("delModal");
    delModal.style.display = "block";

}

delSpan.onclick = function() {
    delModal.style.display = "none";
}

// When the user clicks anywhere
window.onclick = function(event) {
    if (event.target == delModal) {
        delModal.style.display = "none";
}
}


//------------------------------------FILTERS----------------------------------

const filterWorkButton = document.getElementById("eventBoard__WorkButton");
const filterSocialButton = document.getElementById("eventBoard__SocialButton");
const filterChoresButton = document.getElementById("eventBoard__ChoresButton");
const filterReminderButton = document.getElementById("eventBoard__ReminderButton");

function deleteYes() {
    delModal.style.display = "none";
    editModal.style.display = "none";
    deleteEvent();
}

function deleteNo() {
    delModal.style.display = "none";
}

var filterWorkOn = false;
function filterWork() {
    if (filterWorkOn === false) {

        filterWorkButton.classList.add("active")

        events.forEach(event => {
            let eventBoardItem = document.getElementById(event.id);

            if (event.tagList[0] === false) {
                eventBoardItem.style.display = "none";
            } else {
                eventBoardItem.style.display = "block";
            }
        })
        filterWorkOn = true;

    } else {
        filterWorkButton.classList.remove("active")
        events.forEach(event => {
            let eventBoardItem = document.getElementById(event.id);

            if (event.tagList[0] === false) {
                eventBoardItem.style.display = "block";
            }
        })
        filterWorkOn = false;
    }
}

var filterSocialOn = false;
function filterSocial() {
    if (filterSocialOn === false) {

        filterSocialButton.classList.add("active")
        events.forEach(event => {
            let eventBoardItem = document.getElementById(event.id);

            if (event.tagList[1] === false) {
                eventBoardItem.style.display = "none";
            } else {
                eventBoardItem.style.display = "block";
            }
        })
        filterSocialOn = true;

    } else {
        filterSocialButton.classList.remove("active")
        events.forEach(event => {
            let eventBoardItem = document.getElementById(event.id);

            if (event.tagList[1] === false) {
                eventBoardItem.style.display = "block";
            }
        })
        filterSocialOn = false;
    }

}

var filterChoresOn = false;
function filterChores() {
    if (filterChoresOn === false) {

        filterChoresButton.classList.add("active")
        events.forEach(event => {
            let eventBoardItem = document.getElementById(event.id);

            if (event.tagList[2] === false) {
                eventBoardItem.style.display = "none";
            } else {
                eventBoardItem.style.display = "block";
            }
        })
        filterChoresOn = true;

    } else {
        filterChoresButton.classList.remove("active")
        events.forEach(event => {
            let eventBoardItem = document.getElementById(event.id);

            if (event.tagList[2] === false) {
                eventBoardItem.style.display = "block";
            }
        })
        filterChoresOn = false;
    }

}

var filterReminderOn = false;
function filterReminder() {

    if (filterReminderOn === false) {

        filterReminderButton.classList.add("active")
        events.forEach(event => {
            let eventBoardItem = document.getElementById(event.id);

            if (event.tagList[3] === false) {
                eventBoardItem.style.display = "none";
            } else {
                eventBoardItem.style.display = "block";
            }
        })
        filterReminderOn = true;

    } else {
        filterReminderButton.classList.remove("active")

        events.forEach(event => {
            let eventBoardItem = document.getElementById(event.id);

            if (event.tagList[3] === false) {
                eventBoardItem.style.display = "block";
            }
        })
        filterReminderOn = false;
    }
}