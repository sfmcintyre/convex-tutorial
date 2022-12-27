import { useLoaderData, useOutletContext } from "react-router-dom";
import { useQuery } from "../../convex/_generated/react";
import User from "../components/User";
import { Id, Document } from "../../convex/_generated/dataModel";

const TOTAL_POINTS_INCLUDING_BAR = 25;

export async function loader({ params: { gameIdString } }) {
    return gameIdString
};

export default function Game(){
    const gameIdString = useLoaderData();
    const [sessionUserId]: [Id<'users'>] = useOutletContext();

    const game = useQuery('getGame', new Id('games', gameIdString)) || {};

    console.log('game', gameIdString, game)
    return (
        <div className={'gameWrapper'}>
            <div className={'user flexAlign'}>
                <span>{'Game with'}</span>
                <User user={game?.whiteUserId?.equals(sessionUserId) ? game.blackUser : game.whiteUser } />
            </div>
            <div className={'board'}>
                <div className={'home'}>{`Black home: ${game?.blackHomeScore}`}</div>
                <div className={'points'}>
                    {game?.whitePoints?.map((whitePoint, index) => {
                        const blackPoint = game?.blackPoints?.[index ? TOTAL_POINTS_INCLUDING_BAR - index : index];
                        const tiles = [];
                        for (let i = 0; i < Math.max(blackPoint, whitePoint); i++){
                            tiles.push(whitePoint ? 'W' : 'B');
                        }
                        return (
                            <div className={'point'} key={index}>
                                <span>{`${index}${!index ? ' (bar)' : ''}: `}</span>
                                <span className={'pieces'}>
                                    {tiles.map((tile, tileIndex) => <span key={tileIndex}>{tile}</span>)}
                                    {!whitePoint && !blackPoint && <span>{'>'}</span>}
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div className={'home'}>{`White home: ${game?.whiteHomeScore}`}</div>
            </div>
        </div>
    )
}