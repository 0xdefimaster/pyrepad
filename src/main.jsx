import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // .jsx yazmana gerek yok, böyle dene
import './index.css'
import CreateLaunchPage from './CreateLaunchPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)