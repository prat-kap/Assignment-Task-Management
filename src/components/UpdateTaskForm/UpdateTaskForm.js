import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Form, Button, Container, Card, Alert } from "react-bootstrap"

import Header from "../Header/Header"
import Loading from "../Loader/Loading"

import { tasksData } from "../../services/tasks.services"

import { Formik } from "formik"
import {
  LABELS,
  MESSAGES,
  statuses,
  priorities
} from "../../constants/CommonConsts"

import "./UpdateTaskForm.css"

const UpdateTaskForm = () => {
  const {
    TITLE,
    DESCRIPTION,
    STATUS,
    SET_PRIORITY,
    EDIT_TASK,
    ADD_TASK,
    DUE_DATE,
    CREATE_UPDATE_TASK,
    PENDING
  } = LABELS
  const { NEW_TASK_ADDED, TASK_UPDATED } = MESSAGES

  const [message, setMessage] = useState({ error: false, msg: "" })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const isEdit = location.state?.id
  const taskDetails = location.state?.taskDetails

  const handleSubmit = async values => {
    try {
      if (!isEdit) {
        setMessage({
          error: false,
          msg: NEW_TASK_ADDED
        })
        setLoading(true)
        await tasksData.addTask(values)
      } else {
        setMessage({
          error: false,
          msg: TASK_UPDATED
        })
        setLoading(true)
        await tasksData.editTask(location.state?.id, values)
      }
      navigate("/")
    } catch (err) {
      setMessage({ error: true, msg: err.message })
    }
    setLoading(false)
  }
  return (
    <>
      <Header />
      {loading && <Loading />}
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "85vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Formik
            initialValues={{
              title: isEdit ? taskDetails.title : "",
              description: isEdit ? taskDetails.description : "",
              status: isEdit ? taskDetails.status : PENDING,
              dueDate: isEdit ? taskDetails.dueDate : new Date(),
              priority: isEdit ? taskDetails.priority : ""
            }}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values }) => (
              <>
                <Card>
                  <Card.Body>
                    <h2 className="text-center mb-4">{CREATE_UPDATE_TASK}</h2>
                    {message?.msg && (
                      <Alert
                        variant={message?.error ? "danger" : "success"}
                        dismissible
                        onClose={() => setMessage({ error: false, msg: "" })}
                      >
                        {message?.msg}
                      </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="title">
                        <Form.Label>{TITLE}</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          data-testid="title"
                          value={values.title}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="description">
                        <Form.Label>{DESCRIPTION}</Form.Label>
                        <Form.Control
                          type="text"
                          name="description"
                          data-testid="description"
                          value={values.description}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="dueDate">
                        <Form.Label>{DUE_DATE}</Form.Label>
                        <Form.Control
                          type="date"
                          name="dueDate"
                          data-testid="due-date"
                          min={new Date().toISOString().split("T")[0]}
                          value={values.dueDate}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="status">
                        <Form.Label>{STATUS}</Form.Label>
                        <Form.Control
                          type="text"
                          name="status"
                          as="select"
                          data-testid="status"
                          value={values.status}
                          onChange={handleChange}
                          className="custom_select"
                          required
                        >
                          {statuses.map(item => (
                            <option key={item.key} value={item.value}>
                              {item.value}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="priority">
                        <Form.Label>{SET_PRIORITY}</Form.Label>
                        <Form.Control
                          type="text"
                          name="priority"
                          as="select"
                          data-testid="priority"
                          value={values.priority}
                          onChange={handleChange}
                          className="custom_select"
                          required
                        >
                          {priorities.map(item => (
                            <option key={item.key} value={item.value}>
                              {item.value}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loading}
                        className="w-100 mt-3"
                        type="submit"
                        name="submit"
                        data-testid="submit-btn"
                      >
                        {isEdit ? EDIT_TASK : ADD_TASK}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </>
            )}
          </Formik>
        </div>
      </Container>
    </>
  )
}

export default UpdateTaskForm
