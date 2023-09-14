import { db } from "../firebase"

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  doc
} from "firebase/firestore"

const taskCollectionRef = collection(db, "Tasks")
class TasksData {
  addTask = newTask => {
    return addDoc(taskCollectionRef, newTask)
  }
  editTask = (id, updatedTask) => {
    const taskDoc = doc(db, "Tasks", id)
    return updateDoc(taskDoc, updatedTask)
  }
  deleteTask = id => {
    const taskDoc = doc(db, "Tasks", id)
    return deleteDoc(taskDoc)
  }
  getAllTasks = () => {
    return getDocs(taskCollectionRef)
  }
  getTask = id => {
    const taskDoc = doc(db, "Tasks", id)
    return getDoc(taskDoc)
  }
}

export const tasksData = new TasksData()
