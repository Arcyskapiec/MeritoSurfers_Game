import { Obstacle } from "./obstacle.js";
import { Globals } from "./globals.js";
export class Line {
    static line_amount = 3;
    static canBeEntered(line) {
        // jeżeli linia nie istnieje
        if (line < 0 || line >= Line.line_amount) {
            return false;
        }
        let line_obstacles = Obstacle.getObstacles().filter((obstacle) => obstacle.getLine() === line);
        let obstacle_on_player_level = line_obstacles.find((obstacle) => (obstacle.isPlayerOnObstacleDistance()));
        // jeżeli nie ma na linii przeszkody na poziomie gracza
        if (!(obstacle_on_player_level instanceof Obstacle)) {
            return true;
        }
        let entered_obstacle = obstacle_on_player_level;
        // jeżeli jest przeszkoda, przez którą nie można przejść
        if (entered_obstacle.isSolid()) {
            return false;
        }
        return true;
    }
    static getObstacleOnPlayerLevel(line) {
        let line_obstacles = Obstacle.getObstacles().filter((obstacle) => obstacle.getLine() === line);
        let obstacle_on_player_level = line_obstacles.find((obstacle) => (obstacle.isPlayerOnObstacleDistance()));
        return obstacle_on_player_level;
    }
    static getRandomLine() {
        return Math.floor(Math.random() * Line.line_amount);
    }
    static getMiddleLine() {
        return Math.floor(Line.line_amount / 2);
    }
    static getWidthAtDistance(distance) {
        if (distance >= 0) {
            let offset = Globals.getGameWindowWidth() * ((1 - Globals.player_position) * (1 - Globals.horizon_height));
            let max = Globals.getGameWindowWidth() - offset;
            let min = Globals.getGameWindowWidth() * Globals.horizon_width;
            let dif = max - min;
            let width = (min + dif * (1 - distance)) / Line.line_amount;
            return width;
        }
        return 0; //DO ZROBIENIA
    }
    static getBottomPositionAtDistance(distance) {
        if (distance >= 0) {
            let max = Globals.getGameWindowHeight() * (1 - Globals.horizon_height);
            let min = Globals.getGameWindowHeight() * (1 - Globals.player_position);
            let dif = max - min;
            let bottom = (min + dif * distance);
            return bottom;
        }
        return 0; //DO ZROBIENIA
    }
    static getLeftPositionAtDistance(line, distance) {
        if (distance >= 0) {
            let max = (Globals.getGameWindowWidth() * (1 - Globals.horizon_width)) / 2;
            let min = (Globals.getGameWindowWidth() * ((1 - Globals.player_position) * (1 - Globals.horizon_height))) / 2;
            let dif = max - min;
            return min + dif * distance + line * Line.getWidthAtDistance(distance);
        }
        return 0; //DO ZROBIENIA 
    }
    static getLineAmount() {
        return Line.line_amount;
    }
}
