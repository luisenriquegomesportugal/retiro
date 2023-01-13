import React from 'react'
import PrimeReact from 'primereact/api';
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App'

import 'primereact/resources/themes/mdc-light-indigo/theme.css'
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import 'primeflex/primeflex.css'
import './main.css'

PrimeReact.ripple = true;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
