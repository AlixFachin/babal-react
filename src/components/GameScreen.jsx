import React from 'react';

function GameScreen() {
    return ( <div>
        <canvas id="bg"></canvas>
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
    </div>);
}

export default GameScreen;