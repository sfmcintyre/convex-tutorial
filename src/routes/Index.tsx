import { useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, redirect, useOutletContext } from 'react-router-dom';

import Select, { components } from 'react-select';

import { useMutation, useQuery } from "../../convex/_generated/react";
import { Id } from "../../convex/_generated/dataModel";
import User from '../components/User';

export default function Index() {
    const [sessionUserId]: [Id<'users'>] = useOutletContext();
    const { isAuthenticated } = useAuth0();

    const games = useQuery('listGames', sessionUserId) || [];

    const createGame = useMutation('createGame');
    const destroyGame = useMutation('destroyGame');

    const handleCreateNewGame = useCallback(({ value }) => {
        async function createNewGame(){
            const gameId: Id<'games'> = await createGame(sessionUserId, value._id);
            redirect(`/games/${gameId.toString()}`);
        }
        createNewGame();
    }, [sessionUserId]);

    const handleDestroyExistingGame = useCallback((id) => {
        async function destroyExistingGame(){
            await destroyGame(id);
        }
        destroyExistingGame();
    }, []);

    const users = useQuery('listUsers', sessionUserId) || [];

    return isAuthenticated && (
        <>
            <div className={'gameTiles'}>
                {games.map((game) => (
                    <Link to={`/games/${game._id.toString()}`} key={game._id.toString()} className={'gameTile flexAlign'}>
                        <User user={game.whiteUserId.equals(sessionUserId) ? game.blackUser : game.whiteUser } />
                        <span>{new Date(game._creationTime).toLocaleTimeString()}</span>
                        <button onClick={(e) => {
                            e.preventDefault();
                            handleDestroyExistingGame(game._id)
                        }}>{'Delete'}</button>
                    </Link>
                ))}
            </div>
            <div className={'newGame'}>
                <Select
                    value={null}
                    options={users.map((user) => ({ value: user, label: user.name }))}
                    components={{
                        Option: (props) => <components.Option {...props}>
                            <User user={props.value} />
                        </components.Option>,
                    }}
                    onChange={handleCreateNewGame}
                    placeholder={'Start a new game'}
                />
            </div>
        </>
    );
}
