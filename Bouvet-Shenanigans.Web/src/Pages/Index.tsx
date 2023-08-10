import React from "react"
import NavComponent from "../Components/Nav/NavComponent"

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
const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      if (("PushManager" in window)) {
        try {
            const registration = await navigator.serviceWorker.register("/sw.js");
        if (registration.installing) {
            console.log("Service worker installing");
        } else if (registration.waiting) {
            console.log("Service worker installed");
        } else if (registration.active) {
            console.log("Service worker active");
        }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
      }
    }
};

const handleNotificationApi = async () => {
    try
    {
        await askPermission();
        await registerServiceWorker();
    } catch(exception)
    {
        console.log(exception)
    }
}

const IndexComponent = () => {
    return (
        <div>
            <NavComponent/>
            <button style={{padding: "20px"}} onClick={handleNotificationApi}>Ask for permission</button>
        </div>
    )
}

export const Index = React.memo(IndexComponent)