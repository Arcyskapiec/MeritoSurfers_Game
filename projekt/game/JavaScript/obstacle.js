import { ObstacleData } from "./obstacleData.js";
import { Player } from "./player.js";
import { htmlElementHandler } from "./htmlElementHandler.js";
export class Obstacle {
    static obstacles = [];
    html_handler;
    line; //na której linii znajduje się przeszkoda
    distance = 1; //1 to najdalej przed graczem, 0 to poziom gracza, -1 za graczem
    obstacle_data;
    activated = false;
    constructor(obstacle_type, line) {
        this.line = line;
        this.obstacle_data = obstacle_type;
        this.html_handler = new htmlElementHandler("obstacle");
        this.html_handler.setImage("obstacles/tmp_obstacle.png");
    }
    async process() {
        this.move();
    }
    static async process() {
        Obstacle.obstacles.forEach(obstacle => {
            obstacle.process();
        });
    }
    getLine() {
        return this.line;
    }
    getDistanceFromPlayer() {
        return this.distance;
    }
    getEndDistanceFromPlayer() {
        return this.distance + this.obstacle_data.getLength();
    }
    isPlayerOnObstacleLevel() {
        if (this.getDistanceFromPlayer() <= 0 && this.getEndDistanceFromPlayer() >= 0) {
            return true;
        }
        return false;
    }
    isSolid() {
        return this.obstacle_data.isSolid();
    }
    delete() {
        this.html_handler.delete();
        let i = Obstacle.obstacles.indexOf(this);
        Obstacle.obstacles.splice(i, 1);
    }
    static deleteAllObstacles() {
        Obstacle.obstacles = [];
    }
    static getObstacles() {
        return Obstacle.obstacles;
    }
    static spawnRandom(line) {
        Obstacle.spawn(ObstacleData.getRandomObstacleType(), line);
    }
    static spawnByName(obstacle_type, line) {
        Obstacle.spawn(ObstacleData.findByName(obstacle_type), line);
    }
    static spawn(obstacle_type, line) {
        Obstacle.obstacles.push(new Obstacle(obstacle_type, line));
    }
    move() {
        this.distance -= Player.getMovement() * (1 - this.distance) + 0.01;
        console.log(this.distance);
        if (this.distance <= -1) {
            this.delete();
            return;
        }
        this.html_handler.moveTo(this.line, this.distance);
    }
    activateEffect() {
        if (this.activated) {
            return;
        }
        return;
    }
}
