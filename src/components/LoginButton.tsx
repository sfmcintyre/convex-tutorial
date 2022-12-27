import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
    const { isLoading, loginWithRedirect } = useAuth0();
    return (
        <button
            className=""
            disabled={isLoading}
            onClick={() => loginWithRedirect()}
        >
            Log in
        </button>
    );
}