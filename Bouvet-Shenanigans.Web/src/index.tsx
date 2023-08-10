import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';


const root = ReactDOM.createRoot(document.getElementById('root')!);

const check = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No Service Worker support!");
  }
  if (!("PushManager" in window)) {
    throw new Error("No Push API Support!");
  }
};

const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register("/service-worker.js");
  console.log(swRegistration.active)
  return swRegistration;
};



const main = async () => {
  check();
  console.log("Registrering service worker")
  await registerServiceWorker();
};

main()

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);