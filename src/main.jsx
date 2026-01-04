// Main entry point that starts the React application
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Finds the HTML element where the app will be displayed
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

try {
  // Renders the React app into the page with routing enabled
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* BrowserRouter enables navigation between different pages */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  )
} catch (error) {
  // Shows error message if app fails to load
  console.error('Error rendering app:', error)
  rootElement.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1>Error Loading Application</h1>
      <p>${error.message}</p>
      <pre>${error.stack}</pre>
    </div>
  `
}


