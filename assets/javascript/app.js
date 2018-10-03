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