import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyASZOEE3JPkDkZVMuXvZIPuzDTnUP15EdY",
    authDomain: "quickpolls-4d126.firebaseapp.com",
    databaseURL: "https://quickpolls-4d126.firebaseio.com",
    projectId: "quickpolls-4d126",
    storageBucket: "quickpolls-4d126.appspot.com",
    messagingSenderId: "587142723313"
}

const app = firebase.initializeApp(config)

export {app}