import { ObstacleData } from "./obstacleData";
export class Obstacle {
    static obstacles = [];
    line; //na której linii znajduje się przeszkoda
    distance; //1 to najdalej przed graczem, 0 to poziom gracza, -1 za graczem
    obstacle_data;
    constructor(obstacle_type, line) {
        this.distance = 1;
        this.line = line;
        this.obstacle_data = obstacle_type;
    }
    async process() {
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
    async move() {
    }
}
