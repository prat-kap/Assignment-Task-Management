import { BrowserRouter as Router } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import UpdateTaskForm from "../UpdateTaskForm"
import Loading from "../../Loader/Loading"
import "../../../i18n"

test("Rendering and submitting add and update task form", async () => {
  const handleSubmit = jest.fn()
  render(
    <Router>
      <UpdateTaskForm onSubmit={handleSubmit} />
    </Router>
  )
  const user = userEvent.setup()

  user.type(screen.getByTestId("title", { name: "title" }), "Read a book")
  user.type(screen.getByTestId("description", { name: "title" }), "Self time")
  user.type(screen.getByTestId("due-date", { name: "dueDate" }), "22-09-2023")
  user.type(screen.getByTestId("status", { name: "status" }), "pending")
  user.type(screen.getByTestId("priority", { name: "priority" }), "1")

  user.click(screen.getByTestId("submit-btn", { name: "submit" }))
  const { container } = render(<Loading />)
  expect(container).toMatchSnapshot()
})
