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

  // Log the selected date to the console
  console.log("Selected date: " + selectedDate);
}

function saveTitle() {
  var title = document.getElementById("title").value;
  console.log("Title: " + title);
}

function saveTextarea() {
  var textarea = document.getElementById("textarea").value;
  console.log("Textarea: " + textarea);
}

function saveChecklist() {
  var option1 = document.getElementById("option1").checked;
  var option2 = document.getElementById("option2").checked;
  var option3 = document.getElementById("option3").checked;
  var option4 = document.getElementById("option4").checked;
  console.log("Checklist: " + option1 + ", " + option2 + ", " + option3 + ", " + option4);
}

function saveAll(){
  saveTitle()
  saveTextarea()
  saveChecklist()
  saveDate()
}