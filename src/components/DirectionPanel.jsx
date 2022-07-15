import React from "react";

export default function DirectionPanel() {
    return <div id="mobileControl_left" className="mobileControlPanel panel">
        <img src="./assets/pointer.svg" id="trackCursor" width="50px" height="50px" />
        <div id="track"></div>
    </div>;

}