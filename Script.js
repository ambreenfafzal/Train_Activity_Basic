
  var config = {
    apiKey: "AIzaSyCe2YQHCFP21OFINQ6oHQwh0Pl8iE16KTo",
    authDomain: "trainschedule-a20dd.firebaseapp.com",
    databaseURL: "https://trainschedule-a20dd.firebaseio.com",
    projectId: "trainschedule-a20dd",
    storageBucket: "trainschedule-a20dd.appspot.com",
    messagingSenderId: "12767251986"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//This function grabs the value of the input fields
$(document).on("click", "#button" , function(){
    
    // capture form data
 var trainName = $("#train-name").val().trim();
 var destinationName = $("#destination-name").val();
 var firstTrainTime = $("#time-entered").val();
 var trainFrequency= $("#frequency").val();;
 var firstTrainConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
//  console.log(firstTrainConverted);


 var currentTime = moment();
//  console.log(currentTime);

 var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
//  console.log(diffTime);

var tRemainder = diffTime % trainFrequency;
// console.log(tRemainder);

var minTillTrain = trainFrequency - tRemainder;
// console.log(minTillTrain);

var nextTrain = moment().add(minTillTrain, "minutes");
// console.log(nextTrain);

//  console.log(trainName);
//  console.log(destinationName);



 // Add form date to the cells
 var nameTd = $("<td>").text(trainName);
 var destTd = $("<td>").text(destinationName);
 var tfreq = $("<td>").text(trainFrequency);
 var tarrival = $("<td>").text(moment(nextTrain).format("hh:mm"));
 var minutesAway = $("<td>").text(minTillTrain);

 




// // Add cells to Row
 var tRow = $("<tr>");
 tRow.append(nameTd, destTd,  tfreq, tarrival, minutesAway);

// // Add Row to body
 var tBody = $("tbody");
tBody.append(tRow);

 var trainInfo = {
name : trainName,
dest : destinationName,
// freq : trainTime,
// arrival : nextArrival
};

database.ref().push(trainInfo);

var currentTime = moment();
// console.log(currentTime)
clearFields();
 });



 function clearFields (){
    //  console.log("hello");
     $("#train-name").val("");
     $("#destination-name").val("");
     $("#time-entered").val("");
     $("#frequency").val("");
     
 } 
