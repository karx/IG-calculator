import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = { timestampsInSnapshots: true };
var firebaseConfig = {
    apiKey: "AIzaSyC4JK0jEIVaPO_UZVHo3qn0iqLfrlg-QhU",
    authDomain: "viragram-me.firebaseapp.com",
    databaseURL: "https://viragram-me.firebaseio.com",
    projectId: "viragram-me",
    storageBucket: "",
    messagingSenderId: "904760671559",
    appId: "1:904760671559:web:77bfcd39cdfd65bcf72062"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.firestore().settings(settings);

export default firebase;