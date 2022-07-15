import React, { useContext, useState } from 'react';
import "../style/Home.css";

import { GlobalGameContext } from '../lib/GameStateProvider';
import { useActor } from '@xstate/react';

import MainMenu from './mainMenu';
import Credits from './Credits';
import SettingsScreen from './Settings';
import GameScreen from './GameScreen';

export default function Home() {

    function returnHome() {
        send('backHome');
    }

    const gameStateServices = useContext(GlobalGameContext);
    const [ state ] = useActor(gameStateServices.gameService);
    const { send } = gameStateServices.gameService;
    const [ appConfig, setAppConfig ] = useState({
        isMusicOn: false,
        isMobileControl: true,
        isDebugMode: true,
    });

    let innerElement;
    if (state.value === 'Home') {
        innerElement = <MainMenu send={send} />;
    } else if (state.value === 'creditsScreen') {
        innerElement = <Credits returnHome={returnHome} />;
    } else if (state.value === 'settingsScreen') {
        innerElement = <SettingsScreen returnHome={returnHome} appConfig={appConfig} setAppConfig={setAppConfig} />;
    } else if (state.value === 'gamePreStart' || state.value === 'gameLive') {
        innerElement = <GameScreen returnHome={returnHome} appConfig={appConfig} setAppConfig={setAppConfig} />;
    }

    return <main>
        { innerElement }
        <div>
            Test state: { state.value }
        </div>

    </main>;

}