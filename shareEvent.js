//this file is redundant and will probably get deleted at some point

function submitting() {
    var userInput = document.getElementById("pasteshare").value;
    //console.log(userInput);
    //navigator.clipboard.writeText(userInput).value;
    const submitArray = userInput.split(",");

    let addId = submitArray[0];
    let addTitle = submitArray[1];
    let addDescription = submitArray[2];
    let addTag1 = submitArray[3];
    let addTag2 = submitArray[4];
    let addTag3 =  submitArray[5];
    let addTag4 = submitArray[6];
    let addStartDate = submitArray[7];
    let addEndDate = submitArray[8];
    
    addEvent(addId,addTitle,addDescription,addTag1,addTag2,addTag3,addTag4,addStartDate,addEndDate);
    //addEvent(submitArray[0],submitArray[1],submitArray[2],submitArray[3],submitArray[4],submitArray[5],submitArray[6],submitArray[7],submitArray[8]);
    console.log(submitArray[1]);
}

function copyToClipboard(){
    let text1 = "Dummy Copy"; //this needs to access a CSV file and return all its contents


    navigator.clipboard.writeText(text1).value;
}