import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { IntlProvider } from "react-intl"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <IntlProvider>
      <App />
    </IntlProvider>
  </React.StrictMode>
)
