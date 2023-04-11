import React from "react"
import { Link } from "react-router-dom"
import './Navigation.scss';
import { SignInButton } from "../Buttons/LoginButton";


const NavComponent = () => {

    return (
        <nav>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/"}>About</Link>
                </li>
                <li>
                    <Link to={"/"}>Contact</Link>
                </li>
                <li>
                    <SignInButton></SignInButton>
                </li>
            </ul>
        </nav>
    )
}

export default NavComponent