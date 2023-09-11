import { Form } from "react-bootstrap"

const Checkbox = props => {
  const { label, id } = props
  return <Form.Check type={"checkbox"} id={id} label={label} />
}

export default Checkbox
