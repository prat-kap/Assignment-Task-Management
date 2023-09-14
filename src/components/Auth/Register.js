import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"

import Header from "../Header/Header"

import { useAuth } from "../../contexts/AuthContext"

import { Formik } from "formik"

import { FormattedMessage } from "react-intl"

const Register = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
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
              fullName: "",
              email: "",
              password: "",
              confirmPassword: ""
            }}
            onSubmit={async values => {
              if (values.password !== values.confirmPassword) {
                return setError("Passwords do not match")
              }
              try {
                setError("")
                setLoading(true)
                await signup(values.email, values.password)
                navigate("/")
              } catch {
                setError("Failed to create an account")
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
                        id="Register.createAccount"
                        defaultMessage="Create account."
                      />
                    </h2>
                    <h2 className="text-center mb-4">Create account</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={values.fullName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
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
                      <Form.Group controlId="confirmPassword">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                          type="password"
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
                        Sign Up
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
                <div className="w-100 text-center mt-3">
                  Already have an account? <Link to="/login">Log In</Link>
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
