import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"

import Header from "../Header/Header"
import Loading from "../Loader/Loading"

import { useAuth } from "../../contexts/AuthContext"
import { Formik } from "formik"
import { FORM_LABELS, MESSAGES } from "../../constants/CommonConsts"

import { FormattedMessage } from "react-intl"

const Register = () => {
  const [message, setMessage] = useState({ error: false, msg: "" })
  const [loading, setLoading] = useState(false)

  const { signup } = useAuth()
  const navigate = useNavigate()

  const {
    CREATE_ACCOUNT,
    FULL_NAME,
    EMAIL,
    PASSWORD,
    PASSWORD_CONFIRMATION,
    SIGN_UP,
    LOG_IN,
    ALREADY_ACCOUNT
  } = FORM_LABELS
  const { PASSWORD_MISMATCH, ACCOUNT_CREATED, ACCOUNT_CREATION_FAILED } =
    MESSAGES

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
              fullName: "",
              email: "",
              password: "",
              confirmPassword: ""
            }}
            onSubmit={async values => {
              if (values.password !== values.confirmPassword) {
                return setMessage({
                  error: true,
                  msg: PASSWORD_MISMATCH
                })
              }
              try {
                setMessage({
                  error: false,
                  msg: ACCOUNT_CREATED
                })
                setLoading(true)
                await signup(values.email, values.password)
                navigate("/")
              } catch {
                setMessage({ error: true, msg: ACCOUNT_CREATION_FAILED })
              }
              setLoading(false)
            }}
          >
            {({ handleSubmit, handleChange, values }) => (
              <>
                <Card>
                  <Card.Body>
                    <h2 className="text-center mb-4">{CREATE_ACCOUNT}</h2>
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
                      <Form.Group controlId="fullName">
                        <Form.Label>{FULL_NAME}</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={values.fullName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
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
                      <Form.Group controlId="confirmPassword">
                        <Form.Label>{PASSWORD_CONFIRMATION}</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      <Button
                        disabled={loading}
                        className="w-100 mt-3"
                        type="submit"
                      >
                        {SIGN_UP}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
                <div className="w-100 text-center mt-3">
                  {ALREADY_ACCOUNT} <Link to="/login">{LOG_IN}</Link>
                </div>
              </>
            )}
          </Formik>
        </div>
      </Container>
    </>
  )
}

export default Register
