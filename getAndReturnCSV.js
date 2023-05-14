const fs = require('fs');
const {parse} = require('csv-parse');

class Event {

	constructor(title,description,tagList,startDate,endDate){
		this.title = title;
		this.description = description;
		this.tagList = tagList;
		this.startDate = startDate;
		this.endDate = endDate;
	}

	//---------------Getters and setters for the Event objects----------------
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



// fromCSV this takes the csv used in app and asynchronously reads and converts it into the array we use for storage  
async function fromCSV() {
	const csvData = await fs.promises.readFile('events.csv', 'utf-8');
  
	return new Promise((resolve, reject) => {
	  parse(csvData, { delimiter: ',' })
		.on('readable', function () {
		  let row;
		  while ((row = this.read())) {

			// code here responisible for taking the csv line and spliting it into the correct layout
			const title = row[0];
			const description = row[1];
			const tagList = [
			  row[2] === 'true',
			  row[3] === 'true',
			  row[4] === 'true',
			  row[5] === 'true'
			];
			const startDate = new Date(parseInt(row[6])); // date is storred in csv as a string of numbers (Epoch time) then converted to javascript date datatype
			const endDate = new Date(parseInt(row[7]));
			// event is created  then pushed to the array
			const event = new Event(title, description, tagList, startDate, endDate); 
			eventsList.push(event);

		  }
		})
		.on('end', function () {
		  resolve(eventsList);
		})
		.on('error', function (error) {
		  reject(error);
		});
	});
}


// adds event to the csv 
function addEvent(addTitle,addDescription,addTag1,addTag2,addTag3,addTag4,addStartDate,addEndDate){
	const title = addTitle;
	const description = addDescription;
	const tagList = [
		addTag1,addTag2,addTag3,addTag4
	];
	const startDate = addStartDate;
	const endDate = addEndDate;
	
	const event = new Event(title,description,tagList,startDate,endDate);
	eventsList.push(event);
	const csv = ("\n"+title+','+description+','+tagList+','+startDate+','+endDate);
	fs.appendFile('events.csv', csv, (err) => {
		if (err) console.error('Couldn\'t append the data');})
	
}

function stringToCsv(importCode){
	fs.appendFile('events.csv', importCode, (err) => {
		if (err) console.error('Couldn\'t append the data');})
}

// used to get the list created in from CSV 
async function getArray(){
	const eventsList = await fromCSV();
	//console.log(events);
	return eventsList;
}

// get event from specific index in the array 
async function getEvent(input){
	const eventsList = await getArray();
	//console.log(eventsList[input]);
	return eventsList[input];
}


async function getEventInfo(input){
	currentEvent = await getEvent(input);
	let currentTitle = currentEvent.getTitle
	let currentDesc = currentEvent.getDescription
	let currentTaglist = currentEvent.getTagList
	let currentStartdate = currentEvent.getStartDate
	let currentEnddate = currentEvent.getEndDate
	console.log(currentTitle,currentDesc,currentTaglist,currentStartdate,currentEnddate);
}

async function main(eventsList){
eventsList = await getArray();
console.log(eventsList);
//getEventInfo(0);


// addTitle="dentist";
// addDescription ="go and get dentist appointment";
// addTag1=true;
// addTag2=false;
// addTag3=false;
// addTag4=true;
// addStartDate=1683897922000;
// addEndDate=1683897922000;
//addEvent(addTitle,addDescription,addTag1,addTag2,addTag3,addTag4,addStartDate,addEndDate);
//importCode = "buy flowers,Roses,true,false,true,true,1683815641000,1683815641000"
//stringToCsv("\n"+importCode);

}


let eventsList = []
main(eventsList);
