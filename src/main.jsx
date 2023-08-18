import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from './config/GlobalState.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>,
)


