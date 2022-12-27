import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Root from './routes/Root';
import Game, { loader as gameLoader } from './routes/Game';
import Index from './routes/Index'
import LoggedOut from "./routes/LoggedOut";

import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithAuth0 } from 'convex/react-auth0';

import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import clientConfig from '../convex/_generated/clientConfig';
import convexConfig from '../convex.json';

const convex = new ConvexReactClient(clientConfig);
const authInfo = convexConfig.authInfo[0];

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { index: true, element: <Index /> },
            { path: '/games/:gameIdString', element: <Game />, loader: gameLoader },
        ]
    },
]);

ReactDOM.render(
  <StrictMode>
    <ConvexProviderWithAuth0 client={convex} authInfo={authInfo} loggedOut={<LoggedOut />}>
        <RouterProvider router={router} />
    </ConvexProviderWithAuth0>
  </StrictMode>,
  document.getElementById('root')
);
