import React, { useEffect, useRef, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { GlobalGameContext } from '../lib/GameStateProvider';
import { useActor } from '@xstate/react';

import { startGame, stopGame, prepareGame, resetGame } from "../lib/game";

import ActionPanel from "./ActionPanel.jsx";
import DirectionPanel from "./DirectionPanel.jsx";
import CountDown from './CountDown';
import LifeLostScreen from './LifeLostScreen';

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
    const [ livesLeft, setLivesLeft ] = useState(3);

    const quitAndReturnHome = () => {
        stopGame();
        returnHome();
    };

    const restartGame = () => {
        setLivesLeft(prev => prev - 1);
        send('continueGame');
    };

    const gameOver = () => {
        send('gameOver');
    };

    useEffect(() => {
        if (state.value === 'gamePreStart') {
            prepareGame(refCanvas.current, () => { send('lostLife'); });
        } else {
            startGame();
        }
    }, [ state ]);

    const screenHeader = <header>
        <p className="title">BABAL</p>
        <audio src="assets/Komiku_-_07_-_Run_against_the_universe.mp3" loop></audio>
        <div className="livesCounter">{ Array(livesLeft).fill('💛').join(' ') }</div>
        <div id="control_panel">
            <button id="reset_button" onClick={ resetGame }>Reset</button>
            <a onClick={quitAndReturnHome}>Back to Home</a>
        </div>
    </header>;

    // TODO: Remove the calibration PAnel when we are happy with the constants
    // const calibrationPanel = <div id="calibration_panel" className="panel">
    //     <label>Gravity</label>
    //     <input type="text" className="valueInput" size="5" id="gravityInput" data-key="gravity" />
    //     <label>Jump Strength</label>
    //     <input type="text" className="valueInput" size="5" id="jumpInput" data-key="jump" />
    //     <label>Bouncy Effect</label>
    //     <input type="text" className="valueInput" size="5" id="bouncyInput" data-key="bounce" />
    //     <label>Air Resistance</label>
    //     <input type="text" className="valueInput" size="5" id="airInput" data-key="air" />
    // </div>;

    console.log(`Re-rendering main component with state ${state.value}`);

    return ( <div>
        <canvas id="bg" ref={refCanvas}></canvas>
        { state.value === 'gamePreStart' ? <CountDown initialCount={3} onCountDownEnd={ () => send('prestartTimer')} /> : '' }
        { screenHeader }
        { state.value === 'gameLive' ? <div id="score_panel" className="panel"></div> : '' }
        { appConfig.isMobileControl &&  state.value === 'gameLive' ? <ActionPanel /> : ''  }
        { appConfig.isMobileControl &&  state.value === 'gameLive' ? <DirectionPanel /> : ''  }
        { state.value === 'lifeLostDisplay' ? <LifeLostScreen livesLeft={livesLeft} restartGame={restartGame} gameOverFunc={gameOver} /> : '' }
    </div>);
}

GameScreen.propTypes = {
    returnHome : PropTypes.func,
    appConfig: PropTypes.object,
};
