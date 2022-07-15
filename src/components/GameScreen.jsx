import React, { useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalGameContext } from '../lib/GameStateProvider';
import { useActor } from '@xstate/react';

import { gameStart, prepareGame } from "../lib/game";

import ActionPanel from "./ActionPanel.jsx";
import DirectionPanel from "./DirectionPanel.jsx";
import CountDown from './CountDown';

import "../style/GameScreen.css";

/*
 * GameScreen -> main component, in charge of interacting with 3JS and animating the actual game
 * Manages the corresponding state of the state machine
*/
export default function GameScreen({ returnHome, appConfig }) {
    
    const refCanvas = useRef(null);

    const gameStateServices = useContext(GlobalGameContext);
    const [ state ] = useActor(gameStateServices.gameService);
    const { send } = gameStateServices.gameService;

    useEffect(() => {
        if (state.value === 'gamePreStart') {
            prepareGame(refCanvas.current);
        } else {
            gameStart();
        }
    }, [ state ]);

    return ( <div>
        <canvas id="bg" ref={refCanvas}></canvas>
        { state.value === 'gamePreStart' ? <CountDown onCountDownEnd={ () => send('prestartTimer')} /> : '' }
        <header>
            <p className="title">BABAL</p>
            <audio src="assets/Komiku_-_07_-_Run_against_the_universe.mp3" controls loop></audio>
            <div id="control_panel">
                <button id="reset_button">Reset</button>
                <a onClick={returnHome}>Back to Home</a>
            </div>
        </header>
        <div id="score_panel" className="panel"></div>
        <div id="calibration_panel" className="panel">
            <label>Gravity</label>
            <input type="text" className="valueInput" size="5" id="gravityInput" data-key="gravity" />
            <label>Jump Strength</label>
            <input type="text" className="valueInput" size="5" id="jumpInput" data-key="jump" />
            <label>Bouncy Effect</label>
            <input type="text" className="valueInput" size="5" id="bouncyInput" data-key="bounce" />
            <label>Air Resistance</label>
            <input type="text" className="valueInput" size="5" id="airInput" data-key="air" />
        </div>
        { appConfig.isMobileControl ? <ActionPanel /> : ''  }
        { appConfig.isMobileControl ? <DirectionPanel /> : ''  }
    </div>);
}

GameScreen.propTypes = {
    returnHome : PropTypes.func,
    appConfig: PropTypes.object,
}
