class Organism {
    constructor(world, parent1 = null, parent2 = null) {
        this.world = world;
        this.colorPattern = this.inheritColor(parent1, parent2);
        this.element = document.createElement('div');
        this.element.className = 'organism';
        this.element.style.backgroundColor = this.colorPattern;
        this.position = {
            x: Math.floor(Math.random() * (world.size - 10)),
            y: Math.floor(Math.random() * (world.size - 10))
        };
        this.element.style.left = this.position.x + 'px';
        this.element.style.top = this.position.y + 'px';
        world.element.appendChild(this.element);
        this.encounters = new Map();
        this.lifespan = 32000; // 10 seconds in milliseconds
        this.birthTime = Date.now();
        world.organisms.push(this);

        // Update color count
        world.colorCount[this.colorPattern] = (world.colorCount[this.colorPattern] || 0) + 1;
        world.updateDominantColor();
    }

    inheritColor(parent1, parent2) {
        if (!parent1 || !parent2) {
            return '#' + Math.floor(Math.random()*16777215).toString(16);
        }
        return Math.random() < 0.5 ? parent1.colorPattern : parent2.colorPattern;
    }

    move() {
        const dx = Math.floor(Math.random() * 21) - 10; // -10 to 10
        const dy = Math.floor(Math.random() * 21) - 10; // -10 to 10
        this.position.x = Math.max(0, Math.min(this.world.size - 10, this.position.x + dx));
        this.position.y = Math.max(0, Math.min(this.world.size - 10, this.position.y + dy));
        this.element.style.left = this.position.x + 'px';
        this.element.style.top = this.position.y + 'px';

        this.checkCollisions();

        if (Date.now() - this.birthTime > this.lifespan) {
            this.die();
        }
    }

    checkCollisions() {
        const nearbyOrganisms = this.world.getNearbyOrganisms(this);
        nearbyOrganisms.forEach(other => {
            if (other !== this && this.isCollidingWith(other)) {
                this.encounters.set(other, (this.encounters.get(other) || 0) + 1);
                if (this.encounters.get(other) === 6) {
                    this.mate(other);
                }
            }
        });
    }

    isCollidingWith(other) {
        return Math.abs(this.position.x - other.position.x) < 10 && 
               Math.abs(this.position.y - other.position.y) < 10;
    }

    mate(other) {
        if (this.world.organisms.length < this.world.maxOrganisms) {
            new Organism(this.world, this, other);
        }
    }

    die() {
        this.world.element.removeChild(this.element);
        this.world.organisms = this.world.organisms.filter(org => org !== this);
        this.world.deadCount++;
        this.world.colorCount[this.colorPattern]--;
        this.world.updateStats();
        this.world.updateDominantColor();
    }
}

class World {
    constructor(size, initialOrganisms, maxOrganisms) {
        this.size = size;
        this.element = document.getElementById('world');
        this.organisms = [];
        this.maxOrganisms = maxOrganisms || 200;
        this.deadCount = 0;
        this.colorCount = {};
        this.aliveCountElement = document.getElementById('aliveCount');
        this.deadCountElement = document.getElementById('deadCount');
        this.dominantColorElement = document.getElementById('dominantColor');
        for (let i = 0; i < initialOrganisms; i++) {
            new Organism(this);
        }
        this.updateInterval = 100;
        setInterval(() => this.update(), this.updateInterval);
        this.updateStats();
    }

    update() {
        this.organisms.forEach(organism => organism.move());
    }

    getNearbyOrganisms(organism) {
        return this.organisms.filter(other => 
            Math.abs(organism.position.x - other.position.x) < 50 &&
            Math.abs(organism.position.y - other.position.y) < 50
        );
    }

    updateStats() {
        this.aliveCountElement.textContent = this.organisms.length;
        this.deadCountElement.textContent = this.deadCount;
        this.updateDominantColor();
    }

    updateDominantColor() {
        let dominantColor = null;
        let maxCount = 0;
        for (let color in this.colorCount) {
            if (this.colorCount[color] > maxCount) {
                maxCount = this.colorCount[color];
                dominantColor = color;
            }
        }
        this.dominantColorElement.style.backgroundColor = dominantColor ? dominantColor : 'white';
    }
}

new World(1000, 100, 2000); // Initialize the world with 100 organisms, max of 200
