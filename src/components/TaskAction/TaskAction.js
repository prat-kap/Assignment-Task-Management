import { Button } from "react-bootstrap"

const TaskAction = props => {
  const { variant, action, className } = props
  return (
    <Button className={className} variant={variant}>
      {action}
    </Button>
  )
}

export default TaskAction
