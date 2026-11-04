import { Obstacle } from "./obstacle";

export abstract class Line{
    private static line_amount: number = 3

    public static canBeEntered(line: number): boolean{
        let line_obstacles: Obstacle[] = Obstacle.getObstacles().filter((obstacle) => obstacle.getLine() === line)
        let obstacle_on_player_level = line_obstacles.find((obstacle) => (obstacle.isPlayerOnObstacleLevel()))
        
        // jeżeli nie ma na linii przeszkody na poziomie gracza
        if(!(obstacle_on_player_level instanceof Obstacle)){
            return true
        }

        let entered_obstacle: Obstacle = obstacle_on_player_level as Obstacle
        // jeżeli jest przeszkoda, przez którą nie można przejść
        if(entered_obstacle.isSolid()){
            false
        }

        return true
    }

    public static getRandomLine(): number{
        return Math.floor(Math.random() * this.line_amount)
    }

    public static getMiddleLine(): number{
        return Math.floor(this.line_amount / 2)
    }
}