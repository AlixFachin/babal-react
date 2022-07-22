# About controls

# Moving the ball sideways

- On desktop, we can catch the `keydown` and `keyup` touches, and we move the ball sideways when the player pushes left or right arrow.
- In this case, moving sideways = adding a force of constant value to the X axis. This force will be used by the physics engine, in conjunction with other forces (surface tension, air friction, ...) to determine speed and player position
- To note that the X axis is inverted: the screen "left" corresponds to positive X, the screen "right" corresponds to negative X

# Accelerating or braking

- Similar to the X move, we add a constant force to the Z coordinate and let the physics engine do the rest.

# Un-realistic moves in the air

- Adding a constant force means that while the ball is in the air, the player can change direction sideways, but as well brake and even revert speed.
- Maybe in a future version we could prevent the player to actually change course while they are in the air, but not high priority for now.

# Dealing with player jumps

The jump is pretty complicated, as we have to enforce "forbidden" timings, i.e. the ball has to be able to jump only in certain conditions.

- We need to differentiate the timing of the `keydown` event, and the `keyup` event
- We need to distinguish three zones, according to the distance to the surface
  - Player higher than threshold (the ball is high in the air)
  - Player "close to" the surface - before the bounce (i.e. the ball is still going down)
  - Player "close to" the surface - after the bounce (i.e. the ball has bounced and is going up)
  - Player _exactly_ on the surface (this case is the initial case or after several bounces)

| `keydown` timing   | `keyup` timing            | Effect                                        |
| ------------------ | ------------------------- | --------------------------------------------- |
| > threshold        | > threshold               | nothing                                       |
| > threshold        | < T, before bounce        | "stores" the jump effect for after the bounce |
| > threshold        | < T, after bounde         | jumps immediately at keyup timing             |
| > threshold        | > threshold, after bounce | nothing                                       |
| < T, before bounce | < T, before bounce        | "stores" the jump effect for after the bounce |
| < T, before bounce | < T, after bounce         | jumps immediately at keyup timing             |
| < T, before bounce | > threshold, after bounce | nothing                                       |
| < T, after bounce  | < T, after bounce         | jumps immediately                             |
| < T, after bounce  | > T, after bounce         | nothing                                       |
| at contact         | at contact                | jumps immediately                             |
| at contact         | < T, after bounce         | jumps immediately                             |
| at contact         | > T                       | nothing                                       |

I think the array above is pretty explanatory - I hope that the outcome makes it for an "intuitive" way to play

- For touch devices, we have as well the `touchStart` and `touchEnd` events.
