import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"

import Header from "../Header/Header"
import Loading from "../Loader/Loading"

import { useAuth } from "../../contexts/AuthContext"
import { Formik } from "formik"
import { FORM_LABELS, MESSAGES } from "../../constants/CommonConsts"

const Login = () => {
  const [message, setMessage] = useState({ error: false, msg: "" })
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const { EMAIL, PASSWORD, SIGN_UP, LOG_IN, LOG_INTO_ACCOUNT, NEED_ACCOUNT } =
    FORM_LABELS
  const { LOGGED_SUCCESSFULLY, FAILED_LOG_IN } = MESSAGES

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
              email: "",
              password: ""
            }}
            onSubmit={async values => {
              try {
                setMessage({ error: false, msg: LOGGED_SUCCESSFULLY })
                setLoading(true)
                await login(values.email, values.password)
                navigate("/")
              } catch {
                setMessage({ error: true, msg: FAILED_LOG_IN })
              }
              setLoading(false)
            }}
          >
            {({ handleSubmit, handleChange, values }) => (
              <>
                <Card>
                  <Card.Body>
                    <h2 className="text-center mb-4">{LOG_INTO_ACCOUNT}</h2>
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
                      <Form.Group controlId="email">
                        <Form.Label>{EMAIL}</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="password">
                        <Form.Label>{PASSWORD}</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      <Button
                        disabled={loading}
                        className="w-100 mt-3"
                        type="submit"
                      >
                        {LOG_IN}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
                <div className="w-100 text-center mt-3">
                  {NEED_ACCOUNT} <Link to="/register">{SIGN_UP}</Link>
                </div>
              </>
            )}
          </Formik>
        </div>
      </Container>
    </>
  )
}

export default Login
