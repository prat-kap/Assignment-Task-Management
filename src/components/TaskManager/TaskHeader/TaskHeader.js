import React, { useRef, useState } from "react"
import { Accordion, Row, Col, Stack, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

import Checkbox from "../../Checkbox/Checkbox"
import Loading from "../../Loader/Loading"

import { tasksData } from "../../../services/tasks.services"

import { LABELS } from "../../../constants/CommonConsts"

import "../TaskManager.css"

const TaskHeader = props => {
  const { item, getTasks } = props
  const [loading, setLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const checkboxRef = useRef(null)

  const { dueDate, status, title, priority } = item
  const {
    DUE_DATE,
    STATUS,
    MARK_STATUS,
    EDIT,
    DELETE,
    PENDING,
    COMPLETED,
    PRIORITY
  } = LABELS

  const navigate = useNavigate()

  //Hnadle delete task
  const handleDelete = async (e, id) => {
    e.stopPropagation()
    setLoading(true)
    await tasksData.deleteTask(id)
    getTasks()
    setLoading(false)
  }

  //Reset status checkbox
  const handleResetCheckbox = () => {
    checkboxRef.current.checked = false
  }

  //Handle edit task on click of status checkbox as well
  const handleEdit = async (e, id) => {
    e.stopPropagation()
    const docSnap = await tasksData.getTask(id)
    const taskDetails = docSnap.data()
    if (e.target.tagName !== "A") {
      const newDetails = {
        ...taskDetails,
        status:
          e.target.checked && taskDetails.status === PENDING
            ? COMPLETED
            : PENDING
      }
      setIsDisabled(true)
      setLoading(true)
      await tasksData.editTask(id, newDetails)
      handleResetCheckbox()
      getTasks()
    } else {
      setLoading(true)
      navigate("/updatetask", { state: { id, taskDetails } })
    }
    setIsDisabled(false)
    setLoading(false)
  }

  return (
    <>
      {loading && <Loading />}
      <Accordion.Header>
        <Row xs={2} md={3} className="taskHeaderRow">
          <Col md={5}>
            <Stack gap={1}>
              <div className="title">{title}</div>
              <div className="date">{`${DUE_DATE} ${dueDate}`}</div>
              <div className="priority">{`${PRIORITY}: ${priority}`}</div>
            </Stack>
          </Col>
          <Col md={4}>
            <Stack gap={1}>
              <div className="status">{`${STATUS} ${status}`}</div>
              <Checkbox
                label={`${MARK_STATUS} ${
                  status === PENDING ? COMPLETED : PENDING
                }`}
                id={`default-checkbox`}
                onClick={e => handleEdit(e, item.id)}
                checkboxRef={checkboxRef}
                disabled={isDisabled}
              />
            </Stack>
          </Col>
          <Col md={3}>
            <Stack direction="horizontal" gap={2}>
              <Card.Link
                className={"custom-link edit p-2"}
                onClick={e => handleEdit(e, item.id)}
              >
                {EDIT}
              </Card.Link>
              <Card.Link
                className={"custom-link delete p-2"}
                onClick={e => handleDelete(e, item.id)}
              >
                {DELETE}
              </Card.Link>
            </Stack>
          </Col>
        </Row>
      </Accordion.Header>
    </>
  )
}

TaskHeader.propTypes = {
  item: PropTypes.object,
  getTasks: PropTypes.func
}
export default TaskHeader
