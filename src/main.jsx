import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext'
import ScrollToTop from './components/ScrollToTop'
import OneSignal from 'react-onesignal';

// ── OneSignal Init ──────────────────────────────
OneSignal.init({
  appId: "490c17ae-8d20-494a-9afe-4747ba00c693",
  serviceWorkerParam: { scope: "/" },
  serviceWorkerPath: "OneSignalSDKWorker.js",
  notifyButton: { enable: false },
  promptOptions: {
    slidedown: {
      enabled: true,
      autoPrompt: true,
      timeDelay: 6,
      pageViews: 1,
      actionMessage: "Get exclusive Madagascar tour offers from KiriTour! 🌴",
      acceptButtonText: "Yes, notify me!",
      cancelButtonText: "No thanks",
    },
  },
  allowLocalhostAsSecureOrigin: true,
}).catch(err => console.log("OneSignal init error:", err));
// ───────────────────────────────────────────────

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer 
          position="top-center"
          autoClose={2000}
          pauseOnHover={true}
          closeOnClick={true}
          draggable={true} 
        />
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,
)