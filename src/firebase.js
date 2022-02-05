// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAlIBAhLx1AldGcNgAyQw3qijHFrnl2NQA",
    authDomain: "testvideocall-52f4e.firebaseapp.com",
    databaseURL: "https://testvideocall-52f4e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "testvideocall-52f4e",
    storageBucket: "testvideocall-52f4e.appspot.com",
    messagingSenderId: "676364726964",
    appId: "1:676364726964:web:05912b970deb8795d79de1"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig);
// var firedb = database()
const database = getDatabase(app);

export default database