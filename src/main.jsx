import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext'
import ScrollToTop from './components/ScrollToTop'
import OneSignal from 'react-onesignal';

const isPrerender = typeof navigator !== "undefined" && navigator.userAgent.includes("ReactSnap");

// ── OneSignal Init (browser only — skip during prerender) ──
if (typeof window !== "undefined" && !isPrerender) {
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
}
// ───────────────────────────────────────────────

const app = (
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
  </React.StrictMode>
);

const rootElement = document.getElementById('root');

/* Prerendered HTML exists → clear it, then render fresh (no hydration mismatch).
   The prerendered HTML still served raw HTML to Google for SEO; the browser
   simply re-renders cleanly on top. */
if (rootElement.hasChildNodes()) {
  rootElement.innerHTML = "";
}
createRoot(rootElement).render(app);