import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Alert
} from "react-bootstrap"
import PropTypes from "prop-types"

import { useAuth } from "../../contexts/AuthContext"

import { LABELS, MESSAGES, FORM_LABELS } from "../../constants/CommonConsts"

const Header = props => {
  const { handleSearch } = props
  const [error, setError] = useState("")

  const { currentUser, logout } = useAuth() || {}
  const navigate = useNavigate()

  const { FAILED_LOG_OUT } = MESSAGES
  const { TASK_MANAGEMENT, MY_PROFILE } = LABELS
  const { LOGOUT } = FORM_LABELS

  //Handle logout
  async function logoutHandler() {
    setError("")
    try {
      await logout()
      navigate("/login")
    } catch {
      setError(FAILED_LOG_OUT)
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">{TASK_MANAGEMENT}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              {currentUser && handleSearch && (
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search by title, status"
                    className="mr-sm-2"
                    onChange={e => handleSearch(e)}
                  />
                </Form>
              )}
            </Nav>
            <Nav>
              {currentUser && (
                <>
                  <NavDropdown
                    title={`${currentUser.email}`}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="/">{MY_PROFILE}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      {LOGOUT}
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {error && <Alert variant="danger">{error}</Alert>}
    </>
  )
}

Header.propTypes = {
  handleSearch: PropTypes.func
}

export default Header
