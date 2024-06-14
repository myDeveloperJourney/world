# Documentation for the Organism and World Classes

## Overview

This JavaScript code simulates a virtual world populated by organisms that move, interact, and reproduce. Each organism has a random color and moves around within the confines of a specified area. The code tracks the number of living and dead organisms and the most dominant color among them.

### Classes

1. **Organism**
2. **World**

### Organism Class

The `Organism` class represents an individual organism in the simulation. Each organism has properties such as color, position, lifespan, and a reference to the world it belongs to. Organisms can move, check for collisions with other organisms, mate, and die.

#### Constructor

```js
constructor(world, parent1 = null, parent2 = null)
```

- **world**: A reference to the `World` object the organism belongs to.
- **parent1** and **parent2**: Optional references to parent organisms for inheriting color patterns.

#### Properties

- **world**: Stores the reference to the `World` object.
- **colorPattern**: A string representing the color of the organism, inherited from parents or randomly generated.
- **element**: A `div` element representing the organism in the DOM.
- **position**: An object with `x` and `y` coordinates, representing the organism's position.
- **encounters**: A `Map` to track encounters with other organisms.
- **lifespan**: The lifespan of the organism in milliseconds.
- **birthTime**: The timestamp of when the organism was created.

#### Methods

##### `inheritColor(parent1, parent2)`

Determines the organism's color based on its parents. If parents are not provided, it generates a random color.

##### `move()`

Moves the organism to a new random position and checks for collisions with other organisms. If the organism's lifespan is exceeded, it dies.

##### `checkCollisions()`

Checks for nearby organisms and records encounters. If an encounter with the same organism reaches six times, it triggers mating.

##### `isCollidingWith(other)`

Determines if the organism is colliding with another organism based on their positions.

##### `mate(other)`

Creates a new organism if the number of organisms is below the maximum limit.

##### `die()`

Removes the organism from the world and updates the world's statistics.

### World Class

The `World` class represents the environment where the organisms live. It manages the creation of organisms, updates their movements, and tracks statistics such as the number of living and dead organisms and the dominant color.

#### Constructor

```js
constructor(size, initialOrganisms, maxOrganisms)
```

- **size**: The size of the world (used to constrain organism movements).
- **initialOrganisms**: The initial number of organisms to create.
- **maxOrganisms**: The maximum number of organisms allowed in the world.

#### Properties

- **size**: The size of the world.
- **element**: The DOM element representing the world.
- **organisms**: An array to store all organisms in the world.
- **maxOrganisms**: The maximum number of organisms allowed.
- **deadCount**: A counter for dead organisms.
- **colorCount**: An object to track the count of each color among organisms.
- **aliveCountElement**: The DOM element displaying the number of alive organisms.
- **deadCountElement**: The DOM element displaying the number of dead organisms.
- **dominantColorElement**: The DOM element displaying the dominant color among organisms.
- **updateInterval**: The interval for updating the world.

#### Methods

##### `update()`

Calls the `move` method of each organism to update their positions.

##### `getNearbyOrganisms(organism)`

Returns an array of organisms that are within a 50-pixel radius of the given organism.

##### `updateStats()`

Updates the displayed statistics for alive and dead organisms and the dominant color.

##### `updateDominantColor()`

Calculates and updates the dominant color among the organisms.

### Initialization

```js
new World(1000, 100, 2000);
```

Creates a new `World` object with a size of 1000, initializes it with 100 organisms, and sets the maximum number of organisms to 2000.

### Summary

This simulation creates a dynamic environment where organisms move, interact, reproduce, and die, providing a visual representation of these activities in a web page. The `World` class manages the overall environment, while the `Organism` class handles individual behaviors and interactions.
