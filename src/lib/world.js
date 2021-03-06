/* 
 * world.js
 *
 * Contains everything related to the world
 *   player: position, speed and other physics, and as well score, lives remaining etc...
 *   rendering objects: camera, background, renderer, ...
 * 
*/ 
import { Vector3, Euler } from "three";
import { get_initial_player_position, get_terrain_tiles_list } from "./map";
import { update_player_data } from "./physics";

import { test_map_features } from "./map";

import * as THREE from 'three';

// Importing assets
import playerTextureURL from '../../assets/marble-texture.jpg';
import backgroundPicURL from '../../assets/cloud_image.jpg';
import { vector2String, vectorAbsFloor } from "./utils";

// Behaviour Constants
const pushStep_z = 40;
const pushStep_x = 20;
const jump_strength = 80;
const jump_duration = 80; // length of the timeout which resets the push to 0
const jump_threshold = 2;

// GameOver function
let triggerLifeLost;

const initial_player_data = {
    position: new Vector3(0, 0, 0),
    speed: new Vector3(0, 0, 0),
    push: new Vector3(0, 0, 0),
    rotation: new Euler(),
    camera_z_offset: 4,
    camera_y_offset: 3,
};  

const player_data = {
    position: new Vector3(0, 0, 0),
    speed: new Vector3(0, 0, 0),
    push: new Vector3(0, 0, 0),
    rotation: new Euler(),
    radius: 1,
    mass: 1,
    camera_z_offset: 4,
    camera_y_offset: 3,
    shouldUpdate: true, // temporary boolean to be able to finish the loop in case of error
    // variables related to jump
    jumpRecorded: false,
    jumpOnNextBounce: false,
    jumpCallBack: function() {
        player_data.push.setY(jump_strength);        
        player_data.jumpOnNextBounce = false;
        player_data.jumpRecorded = false;
        setTimeout(() => {
            player_data.push.setY(0);
        }, jump_duration);    
    },

};

const scene_objects = {
    lights: [],
    textures: {},
    cameras: {},
    terrain_objects: [],
    player: {},
}; 

/*
 * texture_list object will contain a list of all the texture files which have to be loaded asynchronously.
 * 
 * The first rendering will then be called once all the textures have been loaded (with Promise.all)
 */
const texture_list = { 
    promiseList: [],
    
    addTextureLoader: function(newLoadingPromise) {
        this.promiseList.push(newLoadingPromise);
    },

    loadAllTextures: function() {
        return Promise.all(this.promiseList);
    },
};

const getPlayerData = () => player_data;

const reset_player_data = () => {
    player_data.position.copy(get_initial_player_position());
    player_data.position.setY(player_data.radius + 1); // +1 so that we have a cute bounce at the beginning
    player_data.speed.set(0, 0, 0);
    player_data.push.set(0, 0, 0);
    player_data.camera_y_offset = initial_player_data.camera_y_offset;
    player_data.camera_z_offset = initial_player_data.camera_z_offset;
};  

/*
 *  set_player_accelx applies a new value to the player move sideways
 *  @param accelX number : percentage (between -1 and +1) of strength applied to X axis
 *  -1 is to the left, +1 is to the right
 */
const set_player_accelX = accelX => {
    if (isNaN(Number(accelX))) {
        console.error('Non-numeric value received for X acceleration...');
        return;
    }
    
    const cappedAccelX = accelX === 0 ? 0 : Math.abs(accelX)/accelX * Math.max(Math.abs(accelX),1); 

    // The "right" on the screen is actually negative X values => we need to multiply by -1
    player_data.push.setX(-1 * cappedAccelX * pushStep_x);
};

/*
 *  set_player_accelZ applies a new value to the player move sideways
 *  @param accelZ number : percentage (between -1 and +1) of strength applied to Z axis
 *  -1 is to accelerate backward, +1 is to accelerate forward
 */
const set_player_accelZ = accelZ => {
    if (isNaN(Number(accelZ))) {
        console.error('Non-numeric value received for X acceleration...');
        return;
    }
    
    const cappedAccelZ = accelZ === 0 ? 0 : Math.abs(accelZ)/accelZ * Math.max(Math.abs(accelZ),1); 

    player_data.push.setZ(cappedAccelZ * pushStep_z);
};

/*
 *  record_player_jump will record a player jump
 *  Unlike horizontal plane moves, the player is not allowed to jump at any time
 *  @param accelZ number : percentage (between -1 and +1) of strength applied to Z axis
 *  -1 is to accelerate backward, +1 is to accelerate forward
 */
const record_player_jump = isKeyDown => {
    if (isKeyDown) {
        // When the user presses the jump key, we will record the jump no matter what
        // The jump will take place or not according to the timing at which the 
        // keyUp event takes place
        // (See documentation for detailed reasoning)
        console.log(`JUMP: recording jump`);
        if (!player_data.jumpRecorded) {
            player_data.jumpRecorded = true;
        }
        return;
    } 

    if (player_data.position.y > jump_threshold) {
        // jump event while the player is too high -> nothing happens
        console.log(`JUMP: above threshold - cancelling`);
        player_data.jumpRecorded = false;
        return;
    }
    console.log(`JUMP - below threshold (Y=${player_data.position.y} < ${jump_threshold})`);

    if (player_data.speed.y < 0) {
        // the player released the key while the ball was still descending
        // but "close enough" from the ground -> we store the jump event for the 
        // next bounce
        console.log(`JUMP: jump right before bounce ${jump_strength}`);
        player_data.jumpOnNextBounce = true;
        player_data.jumpRecorded = false;
        return;
    }
    console.log(`JUMP: jump right after bounce ${jump_strength}`);
    player_data.jumpCallBack();

};

const update_player_position = () => {
    const rounding_precision = 0.001;
  
    update_player_data(player_data);
    
    // Now we round the positions etc.
    vectorAbsFloor(player_data.position, rounding_precision);
    vectorAbsFloor(player_data.speed, rounding_precision);
    
    if (player_data.position.y - player_data.radius <= 0.01 && player_data.speed.y < 0) {
        console.log(`Going down - ${vector2String(player_data.position)} - ${vector2String(player_data.speed)}`);
    }
  
    player_data.rotation.set(
        player_data.position.z / player_data.radius,
        0,
        0, //-player_data.position.x / player_data.radius, 
    );
  
    scene_objects.player.mesh.position.copy(player_data.position);
    scene_objects.player.mesh.rotation.copy(player_data.rotation);
};

const test_player_death = () => {
    if (player_data.position.y < 0) {
        console.log(`Player death! pos: ${vector2String(player_data.position)}, speed: ${vector2String(player_data.speed)}`);
        return true;
    }
    return false;
};


const init_scene = (canvasElement) => {
    scene_objects.scene = new THREE.Scene(); // Scene = Container where we will put objects
    const loader = new THREE.TextureLoader();

    texture_list.addTextureLoader(loader.loadAsync(backgroundPicURL).then(texture => {
        scene_objects.textures.bgTexture = texture;
        scene_objects.scene.background = scene_objects.textures.bgTexture;
    }));

    scene_objects.renderer = new THREE.WebGLRenderer({
        canvas: canvasElement,
    });

    scene_objects.renderer.setPixelRatio(window.devicePixelRatio);
    scene_objects.renderer.setSize(window.innerWidth, 0.9 * window.innerHeight);
};

const add_terrain_tiles = () => {
    for (const tile of get_terrain_tiles_list()) {
        scene_objects.terrain_objects.push(tile);
    }
};

const add_objects = () => {
    // Adding the main camera
    scene_objects.cameras.playerCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    scene_objects.scene.add(scene_objects.cameras.playerCamera);

    // Adding the main player object
    scene_objects.player.geometry = new THREE.SphereGeometry(player_data.radius);
    scene_objects.player.material = new THREE.MeshBasicMaterial( );
    scene_objects.player.mesh = new THREE.Mesh(scene_objects.player.geometry, scene_objects.player.material);
    scene_objects.scene.add(scene_objects.player.mesh);        
    
    const imageLoader = new THREE.TextureLoader();
    texture_list.addTextureLoader(imageLoader.loadAsync(playerTextureURL).then(texture => {
        scene_objects.player.mesh.material.map = texture;
        scene_objects.player.mesh.material.needsUpdate = true;
        scene_objects.player.mesh.needsUpdate = true;
    }));

    // Adding ambientlight
    scene_objects.lights.push(new THREE.AmbientLight(0xffffff));
    for (const light of scene_objects.lights) {
        scene_objects.scene.add(light);
    }

    // Adding tiles (terrain)
    add_terrain_tiles();
    for (const tile of scene_objects.terrain_objects) {
        scene_objects.scene.add(tile);
    }

};

const init_world = (canvasElement, triggerLifeLostFunc) => {
    init_scene(canvasElement);
    triggerLifeLost = triggerLifeLostFunc;
    add_objects();
    reset_player_data();

    console.log(`Test import feature: ${JSON.stringify(test_map_features)}`);

};

const updateCameraPosition = () => {
    const player_data = getPlayerData();
    scene_objects.cameras.playerCamera.position.x = player_data.position.x;
    scene_objects.cameras.playerCamera.position.y = player_data.position.y + player_data.camera_y_offset;
    scene_objects.cameras.playerCamera.position.z = player_data.position.z - player_data.camera_z_offset;
    scene_objects.cameras.playerCamera.lookAt(player_data.position);
};

const update_window_size = () => {
    scene_objects.renderer.setSize(window.innerWidth, 0.9 * window.innerHeight);
    scene_objects.cameras.playerCamera.aspect = window.innerWidth / ( 0.9 * window.innerHeight);
    scene_objects.cameras.playerCamera.updateProjectionMatrix();
};

const initial_render = () => {
    update_window_size();
    update_player_position();
    updateCameraPosition();

    try {
        texture_list.loadAllTextures().then( () => {
            scene_objects.renderer.render(scene_objects.scene, scene_objects.cameras.playerCamera);
        });
    }
    catch(err) {
        console.error(err);
    }

};

const start_mainLoop = updateDisplayRoutine => {
    scene_objects.renderer.setAnimationLoop( () => {
    
        update_window_size();
        update_player_position();
        updateCameraPosition();
        if (updateDisplayRoutine instanceof Function) {
            updateDisplayRoutine();
        }
    
        //document.getElementById('position_log').innerHTML += `<p>${vector2String(player_data.position)}</p><p>${vector2String(player_data.speed)}</p>`

        if (test_player_death()) {
            stop_mainLoop();
            if (triggerLifeLost) triggerLifeLost();
        }

        scene_objects.renderer.render(scene_objects.scene, scene_objects.cameras.playerCamera);

    });
};

const stop_mainLoop = () => {
    scene_objects.renderer.setAnimationLoop(() => {});
};

export {
    getPlayerData,
    reset_player_data,
    set_player_accelX,
    set_player_accelZ,
    record_player_jump,
    update_player_position,
    init_world,
    start_mainLoop,
    stop_mainLoop,
    initial_render,
};
