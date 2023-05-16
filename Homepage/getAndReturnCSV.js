class Event {
    constructor(title, description, tagList, startDate, endDate) {
        this.title = title;
        this.description = description;
        this.tagList = tagList;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // Getters and setters for the Event objects
    set changeTitle(newTitle) {
        this.title = newTitle;
    }
    get getTitle() {
        return this.title;
    }

    set changeDescription(newDescription) {
        this.description = newDescription;
    }
    get getDescription() {
        return this.description;
    }

    set changeTagList(newTaglist) {
        this.tagList = newTaglist;
    }
    get getTagList() {
        return this.tagList;
    }

    set changeStartDate(newStartDate) {
        this.startDate = newStartDate;
    }
    get getStartDate() {
        return this.startDate;
    }

    set changeEndDate(newEndDate) {
        this.endDate = newEndDate;
    }
    get getEndDate() {
        return this.endDate;
    }
}

async function fromCSV() {
    const response = await fetch('events.csv');
    const csvData = await response.text();

    return new Promise((resolve, reject) => {
        const rows = csvData.split('\n');
        const eventsList = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i].split(',');

            if (row.length !== 8) {
                continue; // Skip invalid rows
            }

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
            eventsList.push(event);
        }

        resolve(eventsList);
    });
}

function addEvent(addTitle, addDescription, addTag1, addTag2, addTag3, addTag4, addStartDate, addEndDate) {
    const title = addTitle;
    const description = addDescription;
    const tagList = [
        addTag1, addTag2, addTag3, addTag4
    ];
    const startDate = addStartDate;
    const endDate = addEndDate;

    const event = new Event(title, description, tagList, startDate, endDate);
    eventsList.push(event);
    const csv = "\n" + title + ',' + description + ',' + tagList + ',' + startDate + ',' + endDate;

    // Use browser-specific method to write to file (e.g., localStorage, IndexedDB, etc.)
    // Replace the following line with the appropriate code for your use case.



}

function stringToCsv(importCode) {
    // Use browser-specific method to write to file (e.g., localStorage, IndexedDB, etc.)
    // Replace the following line with the appropriate code for your use case.
    console.log('Write to file:', importCode);
}

async function getArray() {
    const eventsList = await fromCSV();
    return eventsList;
}

async function getEvent(input) {
    const eventsList = await getArray();
    return eventsList[input];
}

async function main() {
    let eventsList = await getArray();
    console.log("loading"+ eventsList);

    //loop through eventsList and create eventBoardItems
    for (let i = 0; i < eventsList.length; i++) {

        //go into first event
        let event = eventsList[i];

        // Create a new event board item with the collected data
        const eventBoardItem = document.createElement("div");
        eventBoardItem.className = "eventBoard__Item";
        eventBoardItem.setAttribute("onclick", "eventClick(this)");

        const itemContent = document.createTextNode(`${event.title} ${event.description} ${event.tagList} ${event.startDate} ${event.endDate}`);

        eventBoardItem.appendChild(itemContent);


        const EventBoard = document.getElementById("AllBoard");
        EventBoard.querySelector(".eventBoard__Item_List").appendChild(eventBoardItem);
    }

}

main();