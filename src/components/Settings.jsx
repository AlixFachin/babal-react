import React from "react";
import PropTypes from 'prop-types';

export default function SettingsScreen({ returnHome }) {

    return <div>
        <h1>Settings</h1>
        <div className="mainMenu">
            <a onClick={returnHome}>Back Home</a>
        </div>
    </div>;
}

SettingsScreen.propTypes = {
    returnHome: PropTypes.func,
};