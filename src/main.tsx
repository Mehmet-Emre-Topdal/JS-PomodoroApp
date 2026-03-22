import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './general.css'
import './style.css'
import './todo.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
