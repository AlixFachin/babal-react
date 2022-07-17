# Summary

This document will contain the description of the main functions dealing with the `3JS` world.

## Setting up the world

The module `game.js` exports two functions:

- `prepareGame` to pre-load the world, the map and begin rendering, attach event handlers (but do not do anything with the keys yet)
- `startGame` to actually begin to calculate physics (the ball will begin to fall) and start the event listeners

## `prepareGame`: world initialization

### `init_world(canvas)` (`world.js`):

#### `init_scene(canvas)`

- Creates THREE scene
- sets up the textures, the background, the renderer

#### `add_objects`

- Adds the camera
- Adds the player object
- Adds the ambiant light
- Adds the map tiles

#### `reset_player_data`

- Sets the `player_data` object to the default values

## `startGame`: Let's start the serious stuff

### `start_mainLoop(display_player_stats)`

Calls the `setAnimationLoop()` which sets the main animation loop, with:

- `update_window_size()`
- `update_player_position()`
- `updateCameraPosition`
- calls `updateDisplayRoutine`
- calls `test_player_death()` and stops the main loop if necessary
