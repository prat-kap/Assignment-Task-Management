import { Accordion, Row, Col, Stack, Button } from "react-bootstrap"

import Checkbox from "../../Checkbox/Checkbox"
//import TaskAction from "../../TaskAction/TaskAction"

import { LABELS } from "../../../constants/CommonConsts"

const TaskHeader = props => {
  const { item } = props
  const { DueDate, status, title } = item
  const { DUE_DATE, STATUS, MARK_STATUS, EDIT, DELETE } = LABELS
  return (
    <Row>
      <Accordion.Header>
        <Col xs={6}>
          <Stack gap={1}>
            <div className="title">{title}</div>
            <div className="date">{`${DUE_DATE} ${DueDate}`}</div>
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
            <Button
              className={`default-btn ms-auto p-2`}
              variant={"success"}
              //action={EDIT}
            >
              {EDIT}
            </Button>
            <Button
              className={"default-btn p-2"}
              variant={"danger"}
              //action={DELETE}
            >
              {DELETE}
            </Button>
          </Stack>
        </Col>
      </Accordion.Header>
    </Row>
  )
}

export default TaskHeader
