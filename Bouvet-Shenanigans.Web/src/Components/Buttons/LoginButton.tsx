import * as msal from "@azure/msal-browser";
import React from "react";
import { msalConfig } from "../../authConfig";
import { Dropdown, DropdownButton } from "react-bootstrap";



export const SignInButton = () => {
    const msalInstance = new msal.PublicClientApplication(msalConfig);

    const handleLogin = (loginType: string) => {
        if(loginType === 'popup'){
            msalInstance.loginPopup().catch(e => {
                console.log(e);
            })
        } else if (loginType === 'redirect'){
            msalInstance.loginRedirect().catch(e => {
                console.log(e);
            });
        }
    }

    return (
        <DropdownButton variant="secondary" className="ml-auto" drop="start" title="Sign In">
            <Dropdown.Item as="button" onClick={() => handleLogin("popup")}>Sign in using Popup</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleLogin("redirect")}>Sign in using Redirect</Dropdown.Item>
        </DropdownButton>
    )
}