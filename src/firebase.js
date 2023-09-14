import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

import "firebase/auth"

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDw9VRDizpkt3IGGKalheZ5FSl0In9Yqlo",
  authDomain: "task-management-app-d8411.firebaseapp.com",
  databaseURL: "https://task-management-app-d8411-default-rtdb.firebaseio.com",
  projectId: "task-management-app-d8411",
  storageBucket: "task-management-app-d8411.appspot.com",
  messagingSenderId: "244620380568",
  appId: "1:244620380568:web:c169801f2f4c19d110c3ed",
  measurementId: "G-G1468NS7CK"
})

export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
