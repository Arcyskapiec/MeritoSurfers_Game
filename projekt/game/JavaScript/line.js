import { Obstacle } from "./obstacle.js";
export class Line {
    static line_amount = 3;
    static canBeEntered(line) {
        let line_obstacles = Obstacle.getObstacles().filter((obstacle) => obstacle.getLine() === line);
        let obstacle_on_player_level = line_obstacles.find((obstacle) => (obstacle.isPlayerOnObstacleLevel()));
        // jeżeli nie ma na linii przeszkody na poziomie gracza
        if (!(obstacle_on_player_level instanceof Obstacle)) {
            return true;
        }
        let entered_obstacle = obstacle_on_player_level;
        // jeżeli jest przeszkoda, przez którą nie można przejść
        if (entered_obstacle.isSolid()) {
            false;
        }
        return true;
    }
    static getRandomLine() {
        return Math.floor(Math.random() * Line.line_amount);
    }
    static getMiddleLine() {
        return Math.floor(Line.line_amount / 2);
    }
}
