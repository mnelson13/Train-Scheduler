// Initialize Firebase
var config = {
    apiKey: "AIzaSyCCNC9DB37Puiumc-vuhPAhOQ-HOh2f5Vs",
    authDomain: "train-scheduler-8c9a2.firebaseapp.com",
    databaseURL: "https://train-scheduler-8c9a2.firebaseio.com",
    projectId: "train-scheduler-8c9a2",
    storageBucket: "train-scheduler-8c9a2.appspot.com",
    messagingSenderId: "312448086606"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var name = '';
  var destination = '';
  var frequency = '';
  var firstTrainTime = '';
  var nextArrival = '';
  var minutesAway = '';

  $("#add-train").on("click", function(event){
      event.preventDefault();

      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      firstTrainTime = $("#time-input").val().trim();

      //code needed here to convert firstTrainTime into nextArrival and minutesAway??
        nextArrival = "TBD";
        minutesAway = "TBD";

      database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
      });
  })

  database.ref().on("child_added", function(childSnapshot) {

    $("#train-table").append(
        '<tr><td>' + childSnapshot.val().name + 
        '</td><td>' + childSnapshot.val().destination + 
        '</td><td>' + childSnapshot.val().frequency + 
        '</td><td>' + childSnapshot.val().nextArrival + 
        '</td><td>' + childSnapshot.val().minutesAway + '</td></tr>'
    )

  }, function(errorObject){
      console.log("Error: " + errorObject.code);
  });

