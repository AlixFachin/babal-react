/* 
 * game.js
 *
 * File which contains the game backbone, i.e. key handlers, menus, state machine, main loop, sidebar management etc...
 * 
*/ 

import {  
    set_player_accelX,
    set_player_accelZ, 
    record_player_jump,   
    getPlayerData,
    reset_player_data,
    init_world,
    start_mainLoop,
    stop_mainLoop,
    initial_render,
} from './world';

import gameOverSound from '../../assets/LiveLost.wav';

// Keypressed Event and player position update

const resetGame = () => {
    stop_mainLoop();
    reset_player_data();
    start_mainLoop(display_player_stats);
};

/* 
 * keyboardHandler: manages keydown and keyup related to player moves
 * 
 * @param isKeyDown boolean flag indicates whether the event is keyDown or keyUp
 * @param keyEvent object(event) the actual event object
 */


const keyboardHandler = (isKeyDown, keyEvent) => {

    // Helper object where the key is the keyEvent code
    // (avoids doing a massive if... else if ... else if...)
    const handlerLookup = {
        ArrowUp: function() {
            if (isKeyDown) {
                // key down on arrow up => full speed ahead
                console.log('Accel up keydown');
                set_player_accelZ(1);
            } else {
                // key up
                console.log('Accel up keyup');
                set_player_accelZ(0);
            }
        },
        ArrowDown: function() {
            if (isKeyDown) {
                // key down on arrow down => we go backward
                console.log('Accel down keydn');
                set_player_accelZ(-1);
            } else {
                console.log('Accel down keyup');
                set_player_accelZ(0);
            }
        },
        ArrowLeft: function() {
            if (isKeyDown) {
                set_player_accelX(-1);
            } else {
                set_player_accelX(0);
            }
        },
        ArrowRight: function() {
            if (isKeyDown) {
                set_player_accelX(1);
            } else {
                set_player_accelX(0);
            }
        },
        // Space key is related to jump functions
        // Unlike other 
        Space: function() {
            record_player_jump(isKeyDown);
        },
    };

    if (handlerLookup[keyEvent.code] instanceof Function) {
        keyEvent.preventDefault();
        return handlerLookup[keyEvent.code]();
    }

};

const initEventHandlers = () => {
    // Keyboard events (desktop version)
    document.addEventListener('keydown', event => keyboardHandler(true, event));
    document.addEventListener('keyup', event => keyboardHandler(false, event));

    // trackpad (left)
    // document.getElementById('trackCursor').addEventListener('mousedown', onMouseDownTrackPad );
    // document.getElementById('trackCursor').addEventListener('mouseup', onMouseUpTrackPad);
    // document.getElementById('trackCursor').addEventListener('touchstart', onMouseDownTrackPad );
    // document.getElementById('trackCursor').addEventListener('touchend', onMouseUpTrackPad);

    // document.onmousemove = onMouseMoveDocument;
    // document.ontouchmove = onMouseMoveDocument;

    // Reset Button
    // document.getElementById('reset_button').addEventListener('click', reset_game_click);

};

//TODO: Remove the eslint comment!
// eslint-disable-next-line
const game_over_event = () => {
    const sfx = new Audio(gameOverSound);
    sfx.play();
};

// Function which returns whether the player is allowed to jump or not (similar to collision, the player is allowed
// to jump only "near surfaces")
 
const display_player_stats = () => {
    // helper function to round to 2 digits
    const _2digits = x => Math.round(x*100)/100;
    const player_data = getPlayerData();

    const panel = document.getElementById('score_panel');
    const position_string = `Position: (${_2digits(player_data.position.x)},${_2digits(player_data.position.y)},${_2digits(player_data.position.z)})`;
    const speed_string = `Speed: (${_2digits(player_data.speed.x)},${_2digits(player_data.speed.y)},${_2digits(player_data.speed.z)})`;
    const push_string = `Push: (${_2digits(player_data.push.x)},${_2digits(player_data.push.y)},${_2digits(player_data.push.z)})`;
    const rot_string = `Rotation: (${_2digits(player_data.rotation.x)},${_2digits(player_data.rotation.y)},${_2digits(player_data.rotation.z)})`;
    const contact_string = player_data.contact ? 'CONTACT' : '';
    panel.innerText = [ position_string, speed_string, push_string, rot_string, contact_string].join('\n');
};

/*
 * prepareGame: Main 3JS and world setup, some of it to be done asynchronously while the countdown is displayed
 *
 * @param canvasElement canvas -> DOM Canvas Element which will be used to initialize 3JS rendering
 * @param triggerLifeLost function -> function to be called when the player loses a life
 */
function prepareGame(canvasElement, triggerLifeLost) {
    init_world(canvasElement, triggerLifeLost);
    initEventHandlers();
    initial_render();
}

function startGame() {
    
    start_mainLoop(display_player_stats);
}

function stopGame() {

    stop_mainLoop();

}

export {
    startGame,
    prepareGame,
    stopGame,
    resetGame,
};