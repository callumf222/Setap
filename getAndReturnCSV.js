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

	set changeTitle(newTitle) {this.title = newTitle;}
	// get title(index){return events(index).this.title;}
	set changeDescription(newDescription) {this.description = newDescription;}
	// get description(){return this.description;}
	set changeTagList(newTaglist) {this.tagList= newTaglist;}
	// get tagList(){return this.tagList;}
	set changeStartDate(newStartDate) {this.startDate = newStartDate;}
	// get startDate(){return this.startDate;}

	set changeEndDate(newEndDate) {this.endDate= this.newEndDate;}
	// get endDate(){return this.endDate;}

}

let events = [];
async function fromCSV() {
	const csvData = await fs.promises.readFile('events.csv', 'utf-8');
  
	return new Promise((resolve, reject) => {
	  parse(csvData, { delimiter: ',' })
		.on('readable', function () {
		  let row;
		  while ((row = this.read())) {
			const title = row[0];
			const description = row[1];
			const tagList = [
			  row[2] === 'true',
			  row[3] === 'true',
			  row[4] === 'true',
			  row[5] === 'true'
			];
			const startDate = new Date(parseInt(row[6]));
			const endDate = new Date(parseInt(row[7]));
			const event = new Event(title, description, tagList, startDate, endDate);
  
			events.push(event);
		  }
		})
		.on('end', function () {
		  resolve(events);
		})
		.on('error', function (error) {
		  reject(error);
		});
	});
}

function addEvent(addTitle,addDescription,addTag1,addTag2,addTag3,addTag4,addStartDate,addEndDate){
	const title = addTitle;
	const description = addDescription;
	const tagList = [
		addTag1,addTag2,addTag3,addTag4
	];
	const startDate = addStartDate;
	const endDate = addEndDate;
	
	const addEvents = new Event(title,description,tagList,startDate,endDate);
	const csv = (title+','+description+','+tagList+','+startDate+','+endDate);
	fs.appendFile('events.csv', csv, (err) => {
		if (err) console.error('Couldn\'t append the data');})
	
}

async function getArray(){
	const event = await fromCSV();
	console.log(events);
	return event;
}

async function getEvent(input){
	const event = await fromCSV();
	console.log(events[input]);
	return event;
}

console.log(getArray());
var input = 1;
console.log(getEvent(input));





// addTitle="food 3";
// addDescription ="this is bacon";
// addTag1=true;
// addTag2=false;
// addTag3=false;
// addTag4=true;
// addStartDate=628021600000;
// addEndDate=628021600000;


// addEvent(addTitle,addDescription,addTag1,addTag2,addTag3,addTag4,addStartDate,addEndDate);

// console.log(events)













