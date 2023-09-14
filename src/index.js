import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary"

import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./i18n"
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
