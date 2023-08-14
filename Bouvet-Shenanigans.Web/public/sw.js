/* eslint-disable no-restricted-globals */

self.addEventListener('fetch', function(event) {});

self.addEventListener("install", (event) => {
  console.log("Running install event");
  event.waitUntil(self.registration?.navigationPreload.enable());
  self.skipWaiting()
});

self.addEventListener("activate", async () => {
    console.log("Service worker activated");
    const applicationServerKey = urlB64ToUint8Array(
      "BOoQqpt5TXsZP0Ms1pzu4MIVsGld2uXzcvcOuppsweBM67yti1zog6Qr9dnnSKIHcr_L-29U3dqr7rUG8a_XotI"
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    console.log(JSON.stringify(subscription));
    const response = await saveSubscription(subscription);
    console.log("Done");
    console.log(response);
});

self.addEventListener("push", function (event) {
  if (event.data) {
    self.registration.showNotification("Hello from bouvet shenanigans");
    console.log("Push event!! ", event.data.text());
  } else {
    self.registration.showNotification("Not payload");
    console.log("Push event but no data");
  }
});

const urlB64ToUint8Array = (base64String) => {
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

const saveSubscription = async (subscription) => {
  console.log("saving sub");
  const SERVER_URL =
    "https://bouvet-shenanigans.azurewebsites.net/push/save-sub";
  const response = await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origins": "*",
    },
    body: JSON.stringify(subscription),
  });
  console.log(response.statusText);
  return response.json();
};

