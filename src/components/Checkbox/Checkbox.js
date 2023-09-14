import { Form } from "react-bootstrap"
import PropTypes from "prop-types"

const Checkbox = props => {
  const { label, id } = props
  return <Form.Check type={"checkbox"} id={id} label={label} />
}

Checkbox.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string
}
export default Checkbox
