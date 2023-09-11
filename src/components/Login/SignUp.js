import React from "react"
import { useFormik } from "formik"
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap"
import { Link } from "react-router-dom"

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    onSubmit: values => {
      //   alert(JSON.stringify(values, null, 2))
    }
  })

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Sign Up
                  </h2>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          onChange={formik.handleChange}
                          value={formik.values.confirmPassword}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{" "}
                        <a href="{''}" className="text-primary fw-bold">
                          <Link to="/login"> Sign In</Link>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SignUp
