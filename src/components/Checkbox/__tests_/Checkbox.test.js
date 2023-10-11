import { BrowserRouter as Router } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Checkbox from "../Checkbox"
import Loading from "../../Loader/Loading"
import "../../../i18n"

it("Checkbox is checked/unchecked", () => {
  render(
    <Router>
      <Checkbox />
    </Router>
  )
  const user = userEvent.setup()
  const checkbox = user.type(screen.getByTestId("default-checkbox"))
  expect(checkbox.checked).toEqual()
  user.click(checkbox)
  const { container } = render(<Loading />)
  expect(container).toMatchSnapshot()
  user.click(checkbox)
  expect(container).toMatchSnapshot()
  expect(checkbox.checked).toEqual()
})
