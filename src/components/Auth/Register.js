import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { useTranslation } from "react-i18next"

import Header from "../Header/Header"
import Loading from "../Loader/Loading"

import { useAuth } from "../../contexts/AuthContext"
import { Formik } from "formik"

const Register = () => {
  const [message, setMessage] = useState({ error: false, msg: "" })
  const [loading, setLoading] = useState(false)

  const { signup } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation("common")

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
              if (
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}/i.test(
                  values.password
                )
              ) {
                return setMessage({
                  error: true,
                  msg: `${t("passwordError")}`
                })
              }
              if (values.password !== values.confirmPassword) {
                return setMessage({
                  error: true,
                  msg: `${t("passwordNotMatch")}`
                })
              }
              try {
                setLoading(true)
                await signup(values.email, values.password)
                setMessage({
                  error: false,
                  msg: `${t("accountCreated")}`
                })
                window.localStorage.setItem("isLoggedIn", true)
                navigate("/")
              } catch {
                setMessage({ error: true, msg: `${t("failedToCreate")}` })
              }
              setLoading(false)
            }}
          >
            {({ handleSubmit, handleChange, values }) => (
              <>
                <Card>
                  <Card.Body>
                    <h2 className="text-center mb-4">{t("createAccount")}</h2>
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
                        <Form.Label>{t("fullName")}</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={values.fullName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="email">
                        <Form.Label>{t("email")}</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="password">
                        <Form.Label>{t("password")}</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Min 6 with upper,lower,special chars"
                          value={values.password}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="confirmPassword">
                        <Form.Label>
                          {" "}
                          {t("password")} {t("confirmation")}
                        </Form.Label>
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
                        {t("signUp")}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
                <div className="w-100 text-center mt-3">
                  {t("alreadyHaveAccount")}{" "}
                  <Link to="/login">{t("login")}</Link>
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
