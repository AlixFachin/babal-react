import React, { useRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';


// TODO: Implement the drag and drop finger control
//
// When the tap event begins, remember the original (x, y) coordinates
// When the user moves the tapped area



export default function DirectionPanel({accelXhandler, accelZhandler}) {
    
    const directionDiv = useRef(null);
    const [ nbTouch, setNbTouch ] = useState(0);
    
    const refTouchData = useRef({});

    function onTouchStart(touchEvent) {
        touchEvent.preventDefault();
        //console.log(`touch start - ${touchEvent.changedTouches?.length}`);
        for (let i = 0; i < touchEvent.changedTouches.length; i++) {
            const touch = touchEvent.changedTouches[i];
            console.log(`--touch ${i}: (${touch.pageX}, ${touch.pageY}) - ${touch.identifier}`);
        }
        if (touchEvent.changedTouches.length > 0) {
            const originalTouch = touchEvent.changedTouches[0];

            refTouchData.current.touchId = originalTouch.identifier;
            refTouchData.current.startX = originalTouch.pageX;
            refTouchData.current.startY = originalTouch.pageY;
            console.log(`Setting state var to: id=${originalTouch.identifier}, x=${originalTouch.pageX}, y=${originalTouch.pageY}`);
        }
        setNbTouch(touchEvent.changedTouches.length);
    }
    
    function onTouchEnd(touchEvent) {
        touchEvent.preventDefault();
        //console.log(`touch end - ${touchEvent.changedTouches?.length}`);
        for (let i = 0; i < touchEvent.changedTouches.length; i++) {
            const touch = touchEvent.changedTouches[i];
            //    console.log(`--touch ${i}: (${touch.pageX}, ${touch.pageY})- ${touch.identifier}`);
            
            if (touch.identifier === refTouchData.current.touchId) {
                refTouchData.current.touchId = -1;
                refTouchData.current.startX = -1;
                refTouchData.current.startY = -1;
                accelXhandler(0);
                accelZhandler(0); 
            } 
        }
        setNbTouch(touchEvent.changedTouches.length);
    }
    
    function onTouchMove(touchEvent) {
        touchEvent.preventDefault();
        //console.log(`touch move - ${touchEvent.changedTouches?.length} - state = ${touchID} - ref=${refTouchID.current}`);
        for (let i = 0; i < touchEvent.changedTouches.length; i++) {
            const touch = touchEvent.changedTouches[i];
            //console.log(`--touch ${i}: (${touch.pageX}, ${touch.pageY})- ${touch.identifier}`);
            if (touch.identifier === refTouchData.current.touchId) {
                const moveX = touch.pageX - refTouchData.current.startX;
                const moveY = touch.pageY - refTouchData.current.startY;
                console.log(`--touch move: (${moveX}, ${moveY})`);
                accelXhandler(Math.floor(moveX / 20)/10);
                accelZhandler(Math.floor(-moveY / 40)/10); // negative because Y is growing as we go down the screen
            } 
        }
    }
    
    function onTouchCancel(touchEvent) {
        touchEvent.preventDefault();
        console.log(`touch cancel - ${touchEvent.changedTouches?.length}`);
        for (let i = 0; i < touchEvent.changedTouches.length; i++) {
            const touch = touchEvent.changedTouches[i];
            console.log(`--touch ${i}: (${touch.pageX}, ${touch.pageY})- ${touch.identifier}`);
        }
        setNbTouch(touchEvent.changedTouches.length);
    }

    useEffect(() => {

        directionDiv.current.addEventListener('touchstart',onTouchStart);
        directionDiv.current.addEventListener('touchend',onTouchEnd);
        directionDiv.current.addEventListener('touchmove',onTouchMove);
        directionDiv.current.addEventListener('touchcancel',onTouchCancel);

        return () => {

        };

    }, []);


    return <div id="mobileControl_left" className="mobileControlPanel panel" ref={directionDiv}>
        
        <div id="track"></div>
        <p> { nbTouch } </p>
    </div>;

}

DirectionPanel.propTypes = {
    accelXhandler: PropTypes.func,
    accelZhandler: PropTypes.func,
};