import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button, Container, Stack } from "react-bootstrap"

import Header from "../Header/Header"
import TaskView from "./TaskView/TaskView"
import Loading from "../Loader/Loading"

import { tasksData } from "../../services/tasks.services"

import { LABELS } from "../../constants/CommonConsts"

const TaskManager = () => {
  const [query, setQuery] = useState("")
  const [tasksList, setTasksList] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  const {
    ADD_NEW,
    WELCOME_ACCOUNT,
    LIST_OF,
    VIEW_COMPLETED,
    PENDING,
    COMPLETED
  } = LABELS

  useEffect(() => {
    getTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Get all tasks from firebase database
  const getTasks = async () => {
    const data = await tasksData.getAllTasks()
    setTasksList(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    setLoading(false)
  }

  //Handle task search
  const handleSearch = e => {
    e.preventDefault()
    e.stopPropagation()
    setQuery(e.target.value)
  }

  //Get pending and completed tasks
  const isCompleted = location.state?.completed
  const pendingTasks =
    tasksList && tasksList.filter(task => task.status === PENDING)
  const completedTasks =
    tasksList && tasksList.filter(task => task.status === COMPLETED)

  return (
    <>
      <Header handleSearch={handleSearch} />
      <Container>
        <h2 className="text-center mb-4 mt-2">{WELCOME_ACCOUNT}</h2>
        <h5 className="mb-3 mt-1">{`${LIST_OF} ${
          !isCompleted ? PENDING : COMPLETED
        } tasks arranged by priority`}</h5>
        {!isCompleted && (
          <Stack gap={1} direction="horizontal">
            <Link to="/updatetask">
              <Button
                className={"default-btn p-1 mt-1 mb-2"}
                variant={"primary"}
              >
                {ADD_NEW}
              </Button>
            </Link>
            <Link
              to="/completedtasks"
              className="ms-auto"
              state={{
                tasksList: tasksList,
                query: query,
                completed: true
              }}
            >
              {VIEW_COMPLETED}
            </Link>
          </Stack>
        )}
        {loading && <Loading />}
        <TaskView
          tasksList={!isCompleted ? pendingTasks : completedTasks}
          query={query}
          setTasksList={setTasksList}
          getTasks={getTasks}
        />
      </Container>
    </>
  )
}

export default TaskManager
