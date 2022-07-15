import React, { useRef } from "react";
import PropTypes from 'prop-types';
import "../style/Settings.css";

export default function SettingsScreen({ returnHome, appConfig, setAppConfig }) {

    const musicCheckboxRef = useRef(appConfig.isMusicOn);
    const mobileCheckboxRef = useRef(appConfig.isMobileControl);
    const debugCheckboxRef = useRef(appConfig.isDebugMode);

    function saveConfigHandler() {
        setAppConfig({
            isMusicOn: musicCheckboxRef.current.checked,
            isMobileControl: mobileCheckboxRef.current.checked,
            isDebugMode: debugCheckboxRef.current.checked,
        });
    }

    return <div className="mainPanel">
        <h1>Settings</h1>
        <div className="optionsPanel">
            <input type="checkbox" id="music" ref={ musicCheckboxRef } name="music" defaultChecked={ appConfig.isMusicOn } /> 
            <label htmlFor="music">Music Playing</label>
            <input type="checkbox" id="mobile" ref={ mobileCheckboxRef } name="mobile" defaultChecked={ appConfig.isMobileControl } /> 
            <label htmlFor="mobile">Mobile Controls Mode</label>
            <input type="checkbox" id="debug" ref={ debugCheckboxRef } name="debug" defaultChecked={ appConfig.isDebugMode } /> 
            <label htmlFor="debug">Show Debug Information</label>
        </div>
        <div className="groupPanel">
            <button>Reset Scores</button>
        </div>
        <div className="groupPanel">
            <button className="validate" onClick={saveConfigHandler}>Save Configuration</button>
        </div>
        <div className="mainMenu">
            <a onClick={returnHome}>Back Home</a>
        </div>
    </div>;
}

SettingsScreen.propTypes = {
    returnHome: PropTypes.func,
    appConfig: PropTypes.object,
    setAppConfig: PropTypes.func,
};