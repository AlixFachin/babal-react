import React from "react";
import PropTypes from 'prop-types';

export default function ActionPanel({jumpHandler}) {
    
    const onJumpClick = clickEvent => {
        clickEvent.preventDefault();
        jumpHandler();
    };
    
    return <div id="mobileControl_right" className="mobileControlPanel panel" onClick={ onJumpClick }>
        <p>JUMP</p>
    </div>;

}

ActionPanel.propTypes = {
    jumpHandler: PropTypes.func,
};