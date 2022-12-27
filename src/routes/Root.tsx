import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from 'react-router-dom';

import { useMutation } from "../../convex/_generated/react";
import Header from "../components/Header";

export default function Root() {
    const { user, isAuthenticated } = useAuth0();
    console.log('auth0 user', isAuthenticated, user)

    const [userId, setUserId] = useState(null);
    const storeUser = useMutation("storeUser");
    useEffect(() => {
        async function createUser() {
            const id = await storeUser();
            setUserId(id);
        }
        createUser().catch(console.error);
        return () => setUserId(null);
    }, [storeUser]);

    return (
        <main>
            <Header />
            <div className={'bodyWrapper'}>
                <Outlet context={[userId]} />
            </div>
        </main>
  );
}
