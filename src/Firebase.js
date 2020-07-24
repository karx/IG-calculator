import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = { timestampsInSnapshots: true };
var firebaseConfig = {
    apiKey: "AIzaSyCBbez7qmZ5fVj-fLPYHTEVeJXivtlQPJ0",
    authDomain: "ig-tool-rm.firebaseapp.com",
    databaseURL: "https://ig-tool-rm.firebaseio.com",
    projectId: "ig-tool-rm",
    storageBucket: "ig-tool-rm.appspot.com",
    messagingSenderId: "492451868539",
    appId: "1:492451868539:web:444d5e4e2215e4b81e97de",
    measurementId: "G-R6RVN9NYZG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.firestore().settings(settings);

export default firebase;

