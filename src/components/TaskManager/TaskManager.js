import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Accordion, Button, Container } from "react-bootstrap"

import TaskHeader from "./TaskHeader/TaskHeader"
import TaskDescription from "./TaskDescription/TaskDescription"
import Header from "../Header/Header"

import { tasksData } from "../../services/tasks.services"

import { LABELS } from "../../constants/CommonConsts"

const TaskManager = () => {
  const [query, setQuery] = useState("")
  const [tasksList, setTasksList] = useState([])

  const { ADD_NEW, WELCOME_ACCOUNT, LIST_OF_TASKS, VIEW_COMPLETED } = LABELS

  useEffect(() => {
    getTasks()
  }, [])

  //Get all tasks from firebase database
  const getTasks = async () => {
    const data = await tasksData.getAllTasks()
    setTasksList(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }

  //Save reference for dragItem and dragOverItem
  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  //Handle drag sorting
  const handleSort = () => {
    let taskItems = [...tasksList]
    const draggedItemContent = taskItems.splice(dragItem.current, 1)[0]
    taskItems.splice(dragOverItem.current, 0, draggedItemContent)
    dragItem.current = null
    dragOverItem.current = null
    setTasksList(taskItems)
  }

  //Handle task search
  const handleSearch = e => {
    e.preventDefault()
    e.stopPropagation()
    setQuery(e.target.value)
  }
  console.log("tasks-----", tasksList)
  return (
    <>
      <Header handleSearch={handleSearch} />
      <Container>
        <h2 className="text-center mb-2 mt-2">{WELCOME_ACCOUNT}</h2>
        <h5 className="mb-1 mt-1">{LIST_OF_TASKS}</h5>
        <Link to="/updatetask">
          <Button className={"default-btn p-1 mt-1 mb-2"} variant={"primary"}>
            {ADD_NEW}
          </Button>
        </Link>
        <Link to="/completedtasks">{VIEW_COMPLETED}</Link>
        <Accordion defaultActiveKey="0">
          {tasksList
            .filter(
              task =>
                task?.title?.toLowerCase().includes(query) ||
                task?.status?.toLowerCase().includes(query)
            )
            .map((item, index) => (
              <Accordion.Item
                eventKey={index}
                key={index}
                draggable
                onDragStart={e => {
                  console.log("dragstart", index, item)
                  return (dragItem.current = index)
                }}
                onDragEnter={e => {
                  console.log("dragenter", index, item)
                  return (dragOverItem.current = index)
                }}
                onDragEnd={handleSort}
                onDragOver={e => e.preventDefault()}
              >
                <TaskHeader item={item} getTasks={getTasks} />
                <TaskDescription item={item} />
              </Accordion.Item>
            ))}
        </Accordion>
      </Container>
    </>
  )
}

export default TaskManager
