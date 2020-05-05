import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBrH0yfGgtAWhyNtxdI6a18cVKONZFHdB0",
  authDomain: "webapp-d82b6.firebaseapp.com",
  databaseURL: "https://webapp-d82b6.firebaseio.com",
  projectId: "webapp-d82b6",
  storageBucket: "webapp-d82b6.appspot.com",
  messagingSenderId: "990637995966",
  appId: "1:990637995966:web:4bee62f1c6999c54ae2bef",
  measurementId: "G-LPK6DGKEL7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();