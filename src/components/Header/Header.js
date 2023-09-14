import React, { useState, useEffect } from "react"
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
import { useTranslation } from "react-i18next"

import { useAuth } from "../../contexts/AuthContext"

const Header = props => {
  const { handleSearch } = props
  const [error, setError] = useState("")

  const { currentUser, logout } = useAuth() || {}
  const navigate = useNavigate()
  const [selectedLang, setSelectedLang] = useState(navigator.language)
  const { t, i18n } = useTranslation("common")

  const onChangeLanguage = e => {
    i18n.changeLanguage(e.target.value)
    setSelectedLang(e.target.value)
  }

  useEffect(() => {
    const lng = navigator.language
    i18n.changeLanguage(lng)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Handle logout
  async function logoutHandler() {
    setError("")
    try {
      await logout()
      window.localStorage.removeItem("isLoggedIn")
      navigate("/login")
    } catch {
      setError(`${t("failedToLogout")}`)
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">{t("taskManagment")}</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              {currentUser && handleSearch && (
                <Form inline="true">
                  <FormControl
                    type="text"
                    placeholder={t("searchBy")}
                    className="mr-sm-2"
                    onChange={e => handleSearch(e)}
                  />
                </Form>
              )}
            </Nav>
            <Nav className="mr-2">
              {currentUser && (
                <>
                  <NavDropdown
                    title={`${currentUser.email}`}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="/">
                      {t("myProfile")}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      {t("logOut")}
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          <Nav>
            <>
              <Form.Select
                aria-label="Default select example"
                size="sm"
                value={selectedLang}
                onChange={onChangeLanguage}
              >
                <option value="en"> {t("english")}</option>
                <option value="fr"> {t("french")}</option>
              </Form.Select>
            </>
          </Nav>
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
