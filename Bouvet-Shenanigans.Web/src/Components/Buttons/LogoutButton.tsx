import * as msal from "@azure/msal-browser";
import React from "react";
import { msalConfig } from "../../authConfig";
import { Dropdown, DropdownButton } from "react-bootstrap";



export const SignOutButton = () => {
    const msalInstance = new msal.PublicClientApplication(msalConfig);

    const handleLogout = (logoutType: string) => {
        if(logoutType === 'popup'){
            msalInstance.logoutPopup().catch(e => {
                console.log(e);
            })
        } else if (logoutType === 'redirect'){
            msalInstance.logoutRedirect().catch(e => {
                console.log(e);
            });
        }
    }

    return (
        <DropdownButton variant="secondary" className="ml-auto" drop="start" title="Sign Out">
            <Dropdown.Item as="button" onClick={() => handleLogout("popup")}>Sign out using Popup</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleLogout("redirect")}>Sign out using Redirect</Dropdown.Item>
        </DropdownButton>
    )
}