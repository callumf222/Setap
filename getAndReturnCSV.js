
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
  
  
//   function addEvent(addTitle,addDescription,addTag1,addTag2,addTag3,addTag4,addStartDate,addEndDate) {
// 	// Create a new event object
// 	const title = addTitle;
// 	const description = addDescription;
// 	const tagList = [
// 	  addTag1,addTag2,addTag3,addTag4
// 	];
// 	const startDate = addStartDate;
// 	const endDate = addEndDate;
	
// 	const event = new Event(title,description,tagList,startDate,endDate);
  
// 	// Add the event to the array
// 	events.push(event);
  
// 	// Save the updated array to local storage
// 	localStorage.setItem("events", JSON.stringify(events));
//   }
  
  
  if (typeof(Storage) !== "undefined") {
	// Retrieve the events from local storage
	let storedEvents = localStorage.getItem("events");
  
	// Check if there are previously stored events
	let events = storedEvents ? JSON.parse(storedEvents) : [];
  
	// Function to add a new event#
	function addEvent(addID,addTitle,addDescription,addTag1,addTag2,addTag3,addTag4,addStartDate,addEndDate) {
	  // Create a new event object
	  const id = addID;
	  const title = addTitle;
	  const description = addDescription;
	  const tagList = [
		addTag1,addTag2,addTag3,addTag4
	  ];
	  const startDate = new Date (parseInt(addStartDate));
	  const endDate = new Date (parseInt(addEndDate));
	  
	  const event = new Event(id,title,description,tagList,startDate,endDate);
  
	  // Add the event to the array
	  events.push(event);
  
	  // Save the updated array to local storage
	  localStorage.setItem("events", JSON.stringify(events));
	}
  
	function deleteEvent(index) {
	  // Remove the event from the array
	  events.splice(index, 1);
  
	  // Save the updated array to local storage
	  localStorage.setItem("events", JSON.stringify(events));
	}
  
	// Example usage:
	// addId = 0;
	// addTitle="test 1 using variables";
	// addDescription ="go and get ice";
	// addTag1=true;
	// addTag2=false;
	// addTag3=false;
	// addTag4=true;
	// addStartDate=1683897922000;
	// addEndDate=1683897922000;
  
	//addEvent(addId,addTitle,addDescription,addTag1,addTag2,addTag3,addTag4,addStartDate,addEndDate);
	// addEvent(1,'Test 2 with description','desc',true,true,false,false,1683897922000,1683897922000);
	// addEvent(2,'Test 3 no description of ','',true,true,false,false,1683897922000,1683897922000);
	
	//Retrieve the updated events from local storage
	storedEvents = localStorage.getItem("events");
	events = storedEvents ? JSON.parse(storedEvents) : [];
	//console.log(events);
  	//deleteEvent(0,events);
	
	// Display the events
	// console.log("Event title ="+events[0].title);
	// console.log("Event description ="+events[0].description);
	// console.log("Event tagList ="+events[0].tagList);
	// console.log("Event start date ="+events[0].startDate);
	// console.log("Event end date ="+events[0].endDate);


	function submitting() {
		var userInput = document.getElementById("pasteshare").value;
		const submitArray = userInput.split(",");
		if (submitArray.length != 8) {
			document.getElementById("feedback").innerText = "Invalid import string";
			return;
		}
		
		//addEvent(addId,addTitle,addDescription,addTag1,addTag2,addTag3,addTag4,addStartDate,addEndDate);
		addEvent(correctId(),submitArray[0],submitArray[1],submitArray[2],submitArray[3],submitArray[4],submitArray[5],submitArray[6],submitArray[7]);
		console.log(events);

		document.getElementById("pasteshare").value = "";
		document.getElementById("feedback").innerText = "Event imported";
		// Save the updated array to local storage
		localStorage.setItem("events", JSON.stringify(events));
	}

	let idArray = [];
	function correctId() {
		events.forEach((i) => {
			idArray.push(i.id);
		})
		const maxId = Math.max(...idArray);
		console.log(maxId);
		return maxId+1;
	}

	function copyToClipboard(){
		//console.log(events[0]);

		const startDate = new Date(events[0].startDate);
		const endDate = new Date(events[0].endDate);

		const values = [events[0].title, events[0].description, events[0].tagList, startDate.valueOf(), endDate.valueOf()]
		const outputStr = values.join(",");

		navigator.clipboard.writeText(outputStr).value;
	}

	
  } else {
	console.log("Local storage is not supported.");
  }
