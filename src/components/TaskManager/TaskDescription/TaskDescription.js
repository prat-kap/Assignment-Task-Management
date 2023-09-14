import { Accordion } from "react-bootstrap"
import PropTypes from "prop-types"

const TaskDescription = props => {
  const { item } = props
  return <Accordion.Body>{item.description}</Accordion.Body>
}

TaskDescription.propTypes = {
  item: PropTypes.object
}
export default TaskDescription
