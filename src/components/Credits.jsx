import React from "react";
import PropTypes from 'prop-types';


export default function Credits({ returnHome }) {

    return <div>
        <h1>Credits</h1>
        <div className="mainMenu">
            <a onClick={returnHome}>Back Home</a>
        </div>
        <p>
            Many thanks to:
            <ul>
                <li><span>UFoot</span>, original creator of the <a href="https://ufoot.org/babal/hp48">Babal</a> game on HP48</li>
                <li>INSERT NAME HERE for the game music</li>
                <li>for the game background picture</li>
            </ul>
        </p>
    </div>;
}

Credits.propTypes = {
    send: PropTypes.func,
    returnHome: PropTypes.func,
};