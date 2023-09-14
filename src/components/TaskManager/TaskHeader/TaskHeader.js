import { Accordion, Row, Col, Stack, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import Checkbox from "../../Checkbox/Checkbox"

import { tasksData } from "../../../services/tasks.services"

import { LABELS } from "../../../constants/CommonConsts"

import "../TaskManager.css"

const TaskHeader = props => {
  const { item, getTasks } = props
  const { dueDate, status, title } = item
  const { DUE_DATE, STATUS, MARK_STATUS, EDIT, DELETE } = LABELS
  const navigate = useNavigate()

  //Hnadle delete task
  const handleDelete = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    await tasksData.deleteTask(id)
    getTasks()
  }

  //Handle edit task
  const handleEdit = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    const docSnap = await tasksData.getTask(id)
    const taskDetails = docSnap.data()
    navigate("/updatetask", { state: { id, taskDetails } })
  }

  return (
    <Row>
      <Accordion.Header>
        <Col xs={6}>
          <Stack gap={1}>
            <div className="title">{title}</div>
            <div className="date">{`${DUE_DATE} ${dueDate}`}</div>
          </Stack>
        </Col>
        <Col>
          <Stack gap={1}>
            <div className="status">{`${STATUS} ${status}`}</div>
            <Checkbox label={MARK_STATUS} id={`default-checkbox`} />
          </Stack>
        </Col>
        <Col>
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
      </Accordion.Header>
    </Row>
  )
}

export default TaskHeader
