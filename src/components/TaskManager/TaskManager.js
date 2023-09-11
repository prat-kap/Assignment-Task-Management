import { Accordion } from "react-bootstrap"

import TaskHeader from "./TaskHeader/TaskHeader"
import TaskDescription from "./TaskDescription/TaskDescription"
import TaskAction from "../TaskAction/TaskAction"

import { LABELS } from "../../constants/CommonConsts"
import { useEffect } from "react"

const TaskManager = () => {
  const taskObj = [
    {
      title: "Task1",
      description: "Description1",
      Status: "Pending",
      DueDate: "23/09/2023"
    },
    {
      title: "Task2",
      description: "Description2",
      Status: "Pending",
      DueDate: "25/09/2023"
    },
    {
      title: "Task3",
      description: "Description3",
      Status: "Pending",
      DueDate: "26/09/2023"
    }
  ]
  useEffect(() => {
    fetch(
      "https://task-management-app-d8411-default-rtdb.firebaseio.com/tasks.json/tasks/:-Ne273P2lwh2Icq0X7E4",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
        //body: JSON.stringify(taskObj)
      }
    )
      .then(res => res.json)
      .then(data => console.log("data-----", data))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { ADD_NEW } = LABELS

  return (
    <>
      <TaskAction
        className={"default-btn p-2"}
        variant={"primary"}
        action={ADD_NEW}
        //onClick={postData}
      />
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
    </>
  )
}

export default TaskManager
