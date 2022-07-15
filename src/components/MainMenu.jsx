import React from "react";
import PropTypes from 'prop-types';

export default function MainMenu({ send }) {
    function startGame(send) {
        return () => {
            send('startGame');
        };
    }
    
    function displaySettings(send) {
        return () => {
            send('showSettings');
        };
    }
    
    function displayCredits(send) {    
        return () => {
            send('showCredits');
        };
    }
    
    return <div className="homePanel">
        <h1>BABAL-React</h1>
        <p>This small game is a clone of a game I used to play in high school on my HP48GX...</p>
        <div className="mainMenu">
            <a onClick={startGame(send)}>Start Game</a>
            <a onClick={displaySettings(send)}>Settings</a>
            <a onClick={displayCredits(send)}>Credits</a>
        </div>
    </div>;

}

MainMenu.propTypes = {
    send: PropTypes.func,
};