import React from 'react';
import PropTypes from 'prop-types';

export default function LifeLostScreen({livesLeft, gameOverFunc, restartGame}) {
    
    let message = 'Woops!';
    let handler = restartGame;
    let buttonText = 'Restart Game';

    if (livesLeft === 1) {
        message = 'Game Over!';
        handler = gameOverFunc;
        buttonText = 'Back to main menu';
    }

    return <div className='lifeLostScreen'>
        <h2>{message}</h2>
        <a onClick={handler}>{buttonText}</a>
    </div>;
}

LifeLostScreen.propTypes = {
    restartGame: PropTypes.func,
    livesLeft: PropTypes.number,
    gameOverFunc: PropTypes.func,
};