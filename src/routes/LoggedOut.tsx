import LoginButton from "../components/LoginButton";

export default function LoggedOut(){
    return (
        <main>
            <div className={'loggedOut'}>
                <h1>{'OUTBACK GAMMON'}</h1>
                <LoginButton />
            </div>
        </main>
    )
}