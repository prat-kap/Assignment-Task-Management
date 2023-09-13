import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import TaskManager from "./components/TaskManager/TaskManager"

import { AuthProvider } from "./contexts/AuthContext"
import { useAuth } from "./contexts/AuthContext"

import "./App.css"

function RequireAuth({ children, redirectTo }) {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to={redirectTo} replace />
}

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth redirectTo="/login">
                  <TaskManager />
                </RequireAuth>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
