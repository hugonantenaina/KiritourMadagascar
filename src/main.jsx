import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext'
import ScrollToTop from './components/ScrollToTop'   // 👈 ADD THIS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <HashRouter>
        <ScrollToTop />   {/* 👈 ADD HERE */}

        <ToastContainer 
          position="top-center"
          autoClose={2000}
          pauseOnHover={true}
          closeOnClick={true}
          draggable={true} 
        />

        <App />
      </HashRouter>
    </AuthContextProvider>
  </React.StrictMode>,
)