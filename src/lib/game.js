/* 
 * game.js
 *
 * File which contains the game backbone, i.e. key handlers, menus, state machine, main loop, sidebar management etc...
 * 
*/ 

import '../style/GameScreen.css';

import {  world_keydown_handler,
    world_keyup_handler,
    get_player_button_handler,
    getPlayerData,
    reset_player_data,
    init_world,
    start_mainLoop,
    stop_mainLoop,
    initial_render } from './world';

import gameOverSound from '../../assets/LiveLost.wav';

// Keypressed Event and player position update

const keydown_handler = keyEvent => {
    keyEvent.preventDefault();  
    world_keydown_handler(keyEvent);
};

const keyup_handler = keyEvent => {
    keyEvent.preventDefault();
    world_keyup_handler(keyEvent);
};

const reset_game_click = () => {
    stop_mainLoop();
    reset_player_data();
    start_mainLoop(display_player_stats);
};


let initX, initY;
// Mobile "joystick" panel management
const onMouseDownTrackPad = (event) => {
    

    document.getElementById('trackCursor').onmousemove = onMouseMoveTrackPad;
    document.getElementById('trackCursor').ontouchmove = onMouseMoveTrackPad;

    if (!initX || !initY) {
        initX = event.clientX;
        initY = event.clientY;
    }
    event.preventDefault();
    event.stopPropagation();
};

const onMouseMoveTrackPad = event => {
    event = event || window.event;
    event.comesFromTrackpad = true;
    
    document.getElementById('track').innerText = `(${event.clientX - initX}, ${event.clientY - initY})`;
    document.getElementById('trackCursor').style.transform = `translate(${Math.round((event.clientX - initX)/2)}px,${Math.round((event.clientY - initY)/2)}px)`;

};

const onMouseMoveDocument = event => {
    if (!event.comesFromTrackpad) {
        event.preventDefault();
    }
};

const onMouseUpTrackPad = () => {

    document.getElementById('trackCursor').onmousemove = null;
    document.getElementById('trackCursor').ontouchmove = null;

    initX = null;
    initY = null;
    document.getElementById('trackCursor').style.transform = "";

}

const initEventHandlers = () => {
    // Keyboard events (desktop version)
    document.addEventListener('keydown', keydown_handler);
    document.addEventListener('keyup', keyup_handler);

    // trackpad (left)
    // document.getElementById('trackCursor').addEventListener('mousedown', onMouseDownTrackPad );
    // document.getElementById('trackCursor').addEventListener('mouseup', onMouseUpTrackPad);
    // document.getElementById('trackCursor').addEventListener('touchstart', onMouseDownTrackPad );
    // document.getElementById('trackCursor').addEventListener('touchend', onMouseUpTrackPad);

    document.onmousemove = onMouseMoveDocument;
    document.ontouchmove = onMouseMoveDocument;

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

function prepareGame(canvasElement) {
    init_world(canvasElement);
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
};