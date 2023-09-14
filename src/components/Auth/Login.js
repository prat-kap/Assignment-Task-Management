import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"

import Header from "../Header/Header"

import { useAuth } from "../../contexts/AuthContext"

import { Formik } from "formik"
import { FormattedMessage } from "react-intl"

const Login = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            onSubmit={async values => {
              try {
                setError("")
                setLoading(true)
                await login(values.email, values.password)
                navigate("/")
              } catch {
                setError("Failed to log in")
              }

              setLoading(false)
            }}
          >
            {({ handleSubmit, handleChange, values }) => (
              <>
                <Card>
                  <Card.Body>
                    <h2 className="text-center mb-4">
                      <FormattedMessage
                        id="Login.loginAccount"
                        defaultMessage="Log in to your account"
                      />
                    </h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
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
                        Log In
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
                <div className="w-100 text-center mt-3">
                  Need an account? <Link to="/register">Sign Up</Link>
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
