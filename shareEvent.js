function submitting() {
    var userInput = document.getElementById("pasteshare").value;
    console.log(userInput);
    navigator.clipboard.writeText(userInput).value;
}

function copyToClipboard(){
    let text1 = "Dummy Copy"; //this needs to access a CSV file and return all its contents
    navigator.clipboard.writeText(text1).value;
}