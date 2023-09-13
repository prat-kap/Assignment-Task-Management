// import { createBrowserRouter } from "react-router-dom"

// import Login from "../components/Auth/Login"
// import TaskForm from "../components/TaskForm/TaskForm"
// import Register from "../components/Auth/Register"
// import App from "../App"
import React from "react"
import { Route, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
// const router = createBrowserRouter([
//   // {
//   //   path: "/",
//   //   element: <SignUp />
//   // },
//   {
//     path: "/",
//     element: <App />
//   },
//   {
//     path: "/Register",
//     element: <Register />
//   },
//   {
//     path: "/login",
//     element: <Login />
//   },
//   {
//     path: "/CreateNew",
//     element: <TaskForm />
//   }
// ])

// export default router

export default function PrivateRoute({ component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? component : <Navigate to="/login" />
      }}
    ></Route>
  )
}
