import { useMsal } from '@azure/msal-react';
import './Login.css';

export const Login = () => {
    const { instance } = useMsal();

    const handleSignIn = () => {
        instance.loginRedirect({
            scopes: ['user.read'],
        });
    }

    return (
        <button className="auth-button" onClick={handleSignIn}>Sign in</button>
    )
};