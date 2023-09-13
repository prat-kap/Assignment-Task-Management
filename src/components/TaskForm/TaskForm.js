import { Form, Row, Button, Container } from "react-bootstrap"
import { Formik } from "formik"

const TaskForm = () => {
  return (
    <Formik
      onSubmit={console.log}
      initialValues={{
        title: "",
        description: "",
        status: "",
        dueDate: ""
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Container>
            <Row className="mb-3">
              <Form.Group as={Row} md="4" controlId="validationFormik01">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  isValid={touched.title && !errors.title}
                />
              </Form.Group>
              <Form.Group as={Row} md="4" controlId="validationFormik02">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="textarea"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  isValid={touched.description && !errors.description}
                />
              </Form.Group>
              <Form.Group as={Row} md="4" controlId="validationFormikUsername">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={values.dueDate}
                  onChange={handleChange}
                  //isValid={touched.dueDate && !errors.dueDate}
                  isInvalid={!!errors.dueDate}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Row} md="6" controlId="validationFormik03">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  isInvalid={!!errors.status}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">Add Task</Button>
          </Container>
        </Form>
      )}
    </Formik>
  )
}

export default TaskForm
