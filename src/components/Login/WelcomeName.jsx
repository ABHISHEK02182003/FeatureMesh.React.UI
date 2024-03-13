import { useMsal } from "@azure/msal-react";
import './Login.css';
import { useState, useEffect } from "react";

export const WelcomeName = () => {
    const { accounts } = useMsal();
    const account = accounts[0];

    const username = account ? account.username : "Unknown";
    const fname = username.split('.')[0];

    return (
        <div className="welcome-container">
            <div className="welcome-name">
                <div className="text">
                    <p>Welcome</p>
                    <p className="highlight">{fname}</p>
                </div>
            </div>
        </div>
    )
};