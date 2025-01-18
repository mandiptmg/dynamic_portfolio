import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/Context.jsx";
import '@coreui/coreui-pro/dist/css/coreui.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
