import { createBrowserRouter } from "react-router-dom"
import SignIn from "../components/Login/SignIn"
import SignUp from "../components/Login/SignUp"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <SignIn />
  }
])

export default router
