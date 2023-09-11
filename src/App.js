import "./App.css"
import Header from "./components/Header/Header"
import TaskManager from "./components/TaskManager/TaskManager"
import { Container } from "react-bootstrap"

function App() {
  return (
    <div className="App">
      <Container>
        <Header />
        <main>
          <TaskManager />
        </main>
      </Container>
    </div>
  )
}

export default App
