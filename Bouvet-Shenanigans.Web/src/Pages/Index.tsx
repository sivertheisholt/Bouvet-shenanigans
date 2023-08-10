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

const IndexComponent = () => {
    return (
        <div>
            <NavComponent/>
            <button style={{padding: "20px"}} onClick={askPermission}>Ask for permission</button>
        </div>
    )
}

export const Index = React.memo(IndexComponent)