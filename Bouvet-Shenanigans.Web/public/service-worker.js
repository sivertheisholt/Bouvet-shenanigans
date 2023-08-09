/* eslint-disable no-restricted-globals */

// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const saveSubscription = async subscription => {
  console.log("saving sub")
  const SERVER_URL = "https://localhost:7055/push/save-sub";
  const response = await fetch(SERVER_URL, {
    method: "POST",
    headers: { 'Content-Type':'application/json','Access-Control-Allow-Origins':'*'},
    body: JSON.stringify(subscription)
  });
  console.log(response.statusText)
  return response.json();
};

self.addEventListener('install', e => {
  console.log(e.type)
  self.skipWaiting() // always activate updated SW immediately
})

self.addEventListener("activate", async () => {
  try {
    console.log("Service worker activated")
    const applicationServerKey = urlB64ToUint8Array(
      "BOoQqpt5TXsZP0Ms1pzu4MIVsGld2uXzcvcOuppsweBM67yti1zog6Qr9dnnSKIHcr_L-29U3dqr7rUG8a_XotI"
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    console.log(JSON.stringify(subscription))
    const response = await saveSubscription(subscription);
    console.log("Done")
    console.log(response);
  } catch (err) {
    console.log("Error", err);
  }
});


self.addEventListener("push", function(event) {
  if (event.data) {
    console.log("Push event!! ", event.data.text());
  } else {
    console.log("Push event but no data");
  }
});