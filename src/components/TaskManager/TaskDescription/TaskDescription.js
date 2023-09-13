import { Accordion } from "react-bootstrap"

const TaskDescription = props => {
  const { item } = props
  return <Accordion.Body>{item.description}</Accordion.Body>
}

export default TaskDescription
