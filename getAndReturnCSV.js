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

}

const events = [];
function fromCSV (){
fs.createReadStream('events.csv')
	.pipe(parse())
	.on('data',(row)=>{
		const title = row[0];
		const description = row[1];
		const tagList = [
			Boolean(row[2]),
			Boolean(row[3]),
			Boolean(row[4]),
			Boolean(row[5])
		];
		const startDate = parseInt(row[6]);
		const endDate = parseInt(row[7]);
		const event = new Event(title,description,tagList,startDate,endDate);

		events.push(event);
	})
	.on ('end',()=>{
		console.log(events);
	})
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


fromCSV(); 


addTitle="food 3";
addDescription ="this is bacon";
addTag1=true;
addTag2=false;
addTag3=false;
addTag4=true;
addStartDate=628021600000;
addEndDate=628021600000;


addEvent(addTitle,addDescription,addTag1,addTag2,addTag3,addTag4,addStartDate,addEndDate);

console.log(events)












