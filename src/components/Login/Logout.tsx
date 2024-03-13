import { useMsal } from '@azure/msal-react';
import './Login.css';

export const Logout = () => {
    const { instance } = useMsal();

    const handleSignOut = () => {
        instance.logoutRedirect();
    };

    return (
        <button className='auth-button' onClick={handleSignOut}>Logout</button>
    )
};