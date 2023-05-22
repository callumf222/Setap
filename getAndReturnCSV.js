
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
  
  
	
	// Display the events
	//console.log(events[index].title);

  } else {
	console.log("Local storage is not supported.");
  }