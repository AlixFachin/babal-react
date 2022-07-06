import React, { useContext } from 'react';
import "../style/Home.css";

import { GlobalGameContext } from '../lib/GameStateProvider';
import { useActor } from '@xstate/react';

import MainMenu from './mainMenu';
import Credits from './Credits';
import SettingsScreen from './Settings';

export default function Home() {

    function returnHome() {
        send('backHome');
    }

    const gameStateServices = useContext(GlobalGameContext);
    const [state] = useActor(gameStateServices.gameService);
    const { send } = gameStateServices.gameService;

    let innerElement;
    if (state.value === 'Home') {
        innerElement = <MainMenu send={send} />;
    } else if (state.value === 'creditsScreen') {
        innerElement = <Credits returnHome={returnHome} />;
    } else if (state.value === 'settingsScreen') {
        innerElement = <SettingsScreen returnHome={returnHome} />;
    }

    return <main>
        { innerElement }
        <div>
            Test state: { state.value }
        </div>

    </main>;

}