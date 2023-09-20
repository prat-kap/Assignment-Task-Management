import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { useTranslation } from "react-i18next"

import Header from "../Header/Header"
import Loading from "../Loader/Loading"

import { useAuth } from "../../contexts/AuthContext"
import { Formik } from "formik"

const Login = () => {
  const [message, setMessage] = useState({ error: false, msg: "" })
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
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
              email: "",
              password: ""
            }}
            onSubmit={async values => {
              try {
                setLoading(true)
                await login(values.email, values.password)
                setMessage({ error: false, msg: `${t("loggedInSucceesful")}` })
                window.localStorage.setItem("isLoggedIn", true)
                navigate("/")
              } catch {
                setMessage({ error: true, msg: `${t("failedToLogin")}` })
              }
              setLoading(false)
            }}
          >
            {({ handleSubmit, handleChange, values }) => (
              <>
                <Card>
                  <Card.Body>
                    <h2 className="text-center mb-4">{t("loginAccount")}</h2>
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
                        {t("login")}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
                <div className="w-100 text-center mt-3">
                  {t("needAnAccount")} <Link to="/register">{t("signUp")}</Link>
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
