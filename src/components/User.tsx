export default function User({ user, isAuth0 = false }){
    return (
        <div className={'user flexAlign'}>
            <img className={'image'} src={user?.[isAuth0 ? 'picture' : 'pictureUrl']} />
            <span>{user?.name}</span>
        </div>
    )
}