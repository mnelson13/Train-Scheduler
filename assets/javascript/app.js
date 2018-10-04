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


  //stores new train info from form on Firebase when submit is clicked
  $("#add-train").on("click", function(event){
      event.preventDefault();

      var currentTime = moment();

      //stores train info from the form into variables
      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      firstTrainTime = $("#time-input").val().trim();


      var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm");

      //if statement with calculations to get minutesAway and nextArrival
      if (firstTrainTimeConverted < currentTime) {
        var diffTime = currentTime.diff(moment(firstTrainTimeConverted), "minutes");

        var tRemainder = diffTime % frequency;

        minutesAway = frequency - tRemainder;

        nextArrival = currentTime.add(minutesAway, "minutes");
        nextArrival = moment(nextArrival).format("HH:mm");

      } else if (firstTrainTimeConverted >= currentTime) {
        minutesAway = firstTrainTimeConverted.diff(moment(currentTime), "minutes");

        nextArrival = firstTrainTime;
      }

      //pushes new train onto database
      database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
      });

      //clears the form
      $("#name-input").val("");
      $("#destination-input").val("");
      $("#frequency-input").val("");
      $("#time-input").val("");

  })

  //updates the page on reload and appends to table row when a new train is added
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

