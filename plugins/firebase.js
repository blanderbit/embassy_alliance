import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
    const config = {
        apiKey: "AIzaSyDL3JpXf4tMA2Gm0M9ofMTM-ohaPcU7iE4",
        authDomain: "ea-edu.firebaseapp.com",
        databaseURL: "https://ea-edu.firebaseio.com",
        projectId: "ea-edu",
        storageBucket: "ea-edu.appspot.com",
        messagingSenderId: "723593572771"
    };
    firebase.initializeApp(config)
    //firebase.firestore().settings({timestampsInSnapshots: true})
}
const fireDb = firebase.firestore()
export { fireDb }
