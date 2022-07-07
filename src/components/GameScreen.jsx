import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import gameStart from "../lib/game";

export default function GameScreen({ returnHome }) {
    
    const refCanvas = useRef(null);

    useEffect(() => {
        gameStart(refCanvas.current);
    }, []);
    

    return ( <div>
        <canvas id="bg" ref={refCanvas}></canvas>
        <header>
            <p className="title">BABAL</p>
            <audio src="assets/Komiku_-_07_-_Run_against_the_universe.mp3" controls loop></audio>
            <div id="control_panel"> <button id="reset_button">Reset</button> </div>
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
        <div id="tempMenu" className="panel">
            <a onClick={returnHome}>Back Home</a>
        </div>
        <div id="mobileControl_left" className="mobileControlPanel panel">
            <img src="./assets/pointer.svg" id="trackCursor" width="50px" height="50px" />
            <div id="track"></div>
        </div>
        <div id="mobileControl_right" className="mobileControlPanel panel">
            <button id="btnAccel">ACCEL</button>
            <button id="btnBrake">SLOW</button>
            <button id="btnJump">JUMP</button>
        </div>
    </div>);
}

GameScreen.propTypes = {
    returnHome : PropTypes.func,
}
