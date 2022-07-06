import React from "react";
import PropTypes from 'prop-types';


export default function Credits({ returnHome }) {

    return <div>
        <h1>Credits</h1>
        <div className="mainMenu">
            <a onClick={returnHome}>Back Home</a>
        </div>
    </div>;
}

Credits.propTypes = {
    send: PropTypes.func,
    returnHome: PropTypes.func,
};