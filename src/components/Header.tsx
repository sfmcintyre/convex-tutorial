import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import User from './User';


export default function Header(){
    const { user, isAuthenticated } = useAuth0();
    
    return (
        <div className={'header flexAlign'}>
            <div className={'left'}>
                <Link className={'link'} to={'/'}>
                    <h1>{'OUTBACK GAMMON'}</h1>
                </Link>
            </div>
            <div className={'right flexAlign'}>
                {isAuthenticated &&
                    <>
                        <User user={user} isAuth0={true} />
                        <LogoutButton />
                    </>
                }
                {!isAuthenticated && <LoginButton />}
            </div>
        </div>
    )
}