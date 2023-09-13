import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Accordion, Container } from "react-bootstrap"

import TaskHeader from "./TaskHeader/TaskHeader"
import TaskDescription from "./TaskDescription/TaskDescription"
import TaskAction from "../TaskAction/TaskAction"
import Header from "../Header/Header"

import { LABELS } from "../../constants/CommonConsts"

const TaskManager = () => {
  const [query, setQuery] = useState("")
  const allTasks = [
    {
      title: "Task1",
      description: "Description1",
      status: "Pending",
      DueDate: "23/09/2023"
    },
    {
      title: "Task2",
      description: "Description2",
      status: "Pending",
      DueDate: "25/09/2023"
    },
    {
      title: "Task3",
      description: "Description3",
      status: "Completed",
      DueDate: "26/09/2023"
    }
  ]
  const [taskObj, setTaskObj] = useState(allTasks)
  // useEffect(() => {
  // fetch(
  //   "https://task-management-app-d8411-default-rtdb.firebaseio.com/tasks.json/tasks/:-Ne273P2lwh2Icq0X7E4",
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //     //body: JSON.stringify(taskObj)
  //   }
  // )
  //   .then(res => res.json)
  //   .then(data => console.log("data-----", data))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const { ADD_NEW } = LABELS

  //save reference for dragItem and dragOverItem
  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  //const handle drag sorting
  const handleSort = () => {
    let _taskItems = [...taskObj]

    const draggedItemContent = _taskItems.splice(dragItem.current, 1)[0]
    _taskItems.splice(dragOverItem.current, 0, draggedItemContent)

    dragItem.current = null
    dragOverItem.current = null

    setTaskObj(_taskItems)
  }

  const handleSearch = value => {
    setQuery(value)
  }

  return (
    <>
      <Header handleSearch={handleSearch} />
      <Container>
        <Link to="/CreateNew">
          <TaskAction
            className={"default-btn p-2"}
            variant={"primary"}
            action={ADD_NEW}
          />
        </Link>
        <Accordion defaultActiveKey="0">
          {taskObj
            .filter(
              task =>
                task.title.toLowerCase().includes(query) ||
                task.status.toLowerCase().includes(query)
            )
            .map((item, index) => (
              <Accordion.Item
                eventKey={index}
                key={index}
                draggable
                onDragStart={e => (dragItem.current = index)}
                onDragEnter={e => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={e => e.preventDefault()}
              >
                <TaskHeader item={item} />
                <TaskDescription item={item} />
              </Accordion.Item>
            ))}
        </Accordion>
      </Container>
    </>
  )
}

export default TaskManager
