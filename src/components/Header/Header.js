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

import { useAuth } from "../../contexts/AuthContext"

const Header = props => {
  const { handleSearch } = props
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth() || {}
  const navigate = useNavigate()

  async function logoutHandler() {
    setError("")
    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Task Management</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              {currentUser && (
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search by title, status"
                    className="mr-sm-2"
                    onChange={e => handleSearch(e.target.value)}
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
                    <NavDropdown.Item href="/">My Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
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

export default Header
