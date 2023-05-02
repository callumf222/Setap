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


function pickDate() {
    const monthInput = document.querySelector('input[type="month"]');
    const [year, month] = monthInput.value.split('-').map(Number);
    
    currYear = year;
    currMonth = month - 1;

    renderCalendar();
  }
  
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

function saveAll(){
  var eventValue = [saveTitle(), saveTextarea(),saveChecklist(),saveDate(),saveEndDate()]
  console.log(eventValue)
}