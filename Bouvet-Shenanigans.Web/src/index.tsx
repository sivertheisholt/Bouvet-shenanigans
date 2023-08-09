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
  return swRegistration;
};

function askPermission() {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then(function (permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error("We weren't granted permission.");
    }
  });
}

const main = async () => {
  check();
  await askPermission();
  await registerServiceWorker();
};

main()

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);