import { Form } from "react-bootstrap"
import PropTypes from "prop-types"

const Checkbox = props => {
  const { label, id, onClick, checkboxRef, disabled } = props
  return (
    <Form.Check
      type={"checkbox"}
      id={id}
      label={label}
      onClick={onClick}
      ref={checkboxRef}
      disabled={disabled}
      data-testid="default-checkbox"
    />
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  checkboxRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ])
}
export default Checkbox
