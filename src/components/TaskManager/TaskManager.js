//import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Accordion, Container } from "react-bootstrap"

import TaskHeader from "./TaskHeader/TaskHeader"
import TaskDescription from "./TaskDescription/TaskDescription"
import TaskAction from "../TaskAction/TaskAction"
import Header from "../Header/Header"

import { LABELS } from "../../constants/CommonConsts"

const TaskManager = () => {
  // const taskObj = [
  //   {
  //     title: "Task1",
  //     description: "Description1",
  //     Status: "Pending",
  //     DueDate: "23/09/2023"
  //   },
  //   {
  //     title: "Task2",
  //     description: "Description2",
  //     Status: "Pending",
  //     DueDate: "25/09/2023"
  //   },
  //   ,
  //   {
  //     title: "Task3",
  //     description: "Description3",
  //     Status: "Pending",
  //     DueDate: "26/09/2023"
  //   }
  // ]
  //useEffect(() => {
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
  //}, [])

  const { ADD_NEW } = LABELS

  return (
    <>
      <Header />
      <Container>
        <Link to="/CreateNew">
          <TaskAction
            className={"default-btn p-2"}
            variant={"primary"}
            action={ADD_NEW}
          />
        </Link>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <TaskHeader />
            <TaskDescription />
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <TaskHeader />
            <TaskDescription />
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  )
}

export default TaskManager
