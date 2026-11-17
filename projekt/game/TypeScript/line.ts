import { Obstacle } from "./obstacle.js";
import { Globals } from "./globals.js";

export class Line{
    private static line_amount: number = 3

    public static canBeEntered(line: number): boolean{
        // jeżeli linia nie istnieje
        if(line < 0 || line >= Line.line_amount){
            return false
        }

        let line_obstacles: Obstacle[] = Obstacle.getObstacles().filter((obstacle) => obstacle.getLine() === line)
        let obstacle_on_player_level = line_obstacles.find((obstacle) => (obstacle.isPlayerOnObstacleDistance()))
        
        // jeżeli nie ma na linii przeszkody na poziomie gracza
        if(!(obstacle_on_player_level instanceof Obstacle)){
            return true
        }

        let entered_obstacle: Obstacle = obstacle_on_player_level as Obstacle
        // jeżeli jest przeszkoda, przez którą nie można przejść
        if(entered_obstacle.isSolid()){
            return false
        }

        return true
    }

    public static getObstacleOnPlayerLevel(line: number): Obstacle | undefined{
        let line_obstacles: Obstacle[] = Obstacle.getObstacles().filter((obstacle) => obstacle.getLine() === line)
        let obstacle_on_player_level = line_obstacles.find((obstacle) => (obstacle.isPlayerOnObstacleDistance()))
        return obstacle_on_player_level
    }

    public static getRandomLine(): number{
        return Math.floor(Math.random() * Line.line_amount)
    }

    public static getMiddleLine(): number{
        return Math.floor(Line.line_amount / 2)
    }

    public static getWidthAtDistance(distance: number): number{
        if(distance >= 0){
            let offset: number = Globals.getGameWindowWidth() * ((1 - Globals.player_position) * (1 - Globals.horizon_height))
            let max: number = Globals.getGameWindowWidth() - offset
            let min: number = Globals.getGameWindowWidth() * Globals.horizon_width
            let dif: number = max - min
            let width: number = (min + dif * (1 - distance)) / Line.line_amount

            return width
        }

        return 0; //DO ZROBIENIA
    }

    public static getBottomPositionAtDistance(distance : number): number{
        if(distance >= 0){
            let max: number = Globals.getGameWindowHeight() * (1 - Globals.horizon_height)
            let min: number = Globals.getGameWindowHeight() * (1 - Globals.player_position)
            let dif: number = max - min
            let bottom: number = (min + dif * distance)

            return bottom
        }

        return 0; //DO ZROBIENIA
    }

    public static getLeftPositionAtDistance(line: number, distance: number): number{
        if(distance >= 0){
            let max: number = (Globals.getGameWindowWidth() * (1 - Globals.horizon_width)) / 2;
            let min: number = (Globals.getGameWindowWidth() * ((1 - Globals.player_position) * (1 - Globals.horizon_height))) / 2;
            let dif: number = max - min
            return min + dif * distance + line * Line.getWidthAtDistance(distance)
        }

        return 0; //DO ZROBIENIA 
    }

    public static getLineAmount(): number{
        return Line.line_amount
    }
}