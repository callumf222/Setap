// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
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
console.log("Selected date: " + selectedDate);

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

//THIS CREATES 2 NEW ITEMS IN ONE COLUMN
function saveAll() {
    // Get the values of the form inputs
    const title = document.querySelector(".title").value;
    const description = document.querySelector(".description").value;
    const tags = [];
    document.querySelectorAll('input[type=checkbox]:checked').forEach(tag => {
        tags.push(tag.value);
    });
    const startDate = document.querySelector("#dateSelecter").value;
    const endDate = document.querySelector("#endDateSelecter").value;

    // Create a new event board item with the collected data
    const eventBoardItem = document.createElement("div");
    eventBoardItem.classList.add("eventBoard__Item-input");

    const itemContent = document.createTextNode(`${title}: ${description}`);
    eventBoardItem.appendChild(itemContent);

    // Find the first event board and add the new item to it
    const firstEventBoard = document.querySelector(".eventBoard");
    firstEventBoard.querySelector(".eventBoard__Items").appendChild(eventBoardItem);

    // Close the modal dialog
    modal.style.display = "none";
}


const saveButton = document.querySelector(".modal-content button");
saveButton.addEventListener("click", saveAll);
