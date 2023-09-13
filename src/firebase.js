// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
//import firebase from "firebase/app"
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = initializeApp({
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  apiKey: "AIzaSyDw9VRDizpkt3IGGKalheZ5FSl0In9Yqlo",
  authDomain: "task-management-app-d8411.firebaseapp.com",
  databaseURL: "https://task-management-app-d8411-default-rtdb.firebaseio.com",
  projectId: "task-management-app-d8411",
  storageBucket: "task-management-app-d8411.appspot.com",
  messagingSenderId: "244620380568",
  appId: "1:244620380568:web:c169801f2f4c19d110c3ed",
  measurementId: "G-G1468NS7CK"
})
//export const auth = app.auth()
export const auth = getAuth(firebaseApp)
//export default firebaseApp
// Initialize Firebase
//const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
//export const auth = getAuth(app)