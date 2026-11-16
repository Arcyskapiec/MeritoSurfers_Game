import { ObstacleData } from "./obstacleData.js";
import { Player } from "./player.js";
import { htmlElementHandler } from "./htmlElementHandler.js";

export class Obstacle{
    private static obstacles: Obstacle[] = []

    private html_handler: htmlElementHandler;
    private line: number; //na której linii znajduje się przeszkoda
    private distance: number = 1 //1 to najdalej przed graczem, 0 to poziom gracza, -1 za graczem
    private obstacle_data: ObstacleData;
    private activated: boolean = false

    public constructor(obstacle_type: ObstacleData, line: number){
        this.line = line
        this.obstacle_data = obstacle_type
        this.html_handler = new htmlElementHandler("obstacle")
        this.html_handler.setImage("obstacles/tmp_obstacle.png")
    }

    private async process(): Promise<void>{
        this.move()
    }

    public static async process(): Promise<void>{
        Obstacle.obstacles.forEach(obstacle => {
            obstacle.process()
        });
    }

    public getLine(): number{
        return this.line
    }

    public getDistanceFromPlayer(): number{
        return this.distance
    }

    public getEndDistanceFromPlayer(): number{
        return this.distance + this.obstacle_data.getLength()
    }

    public isPlayerOnObstacleLevel(): boolean{
        if(this.getDistanceFromPlayer() <= 0 && this.getEndDistanceFromPlayer() >= 0){
            return true
        }
        return false
    }

    public isSolid(): boolean{
        return this.obstacle_data.isSolid()
    }

    public delete(): void{
        this.html_handler.delete()
        let i: number = Obstacle.obstacles.indexOf(this)
        Obstacle.obstacles.splice(i, 1)
    }

    public static deleteAllObstacles(): void{
        Obstacle.obstacles = []
    }

    public static getObstacles(): Obstacle[]{
        return Obstacle.obstacles
    }

    public static spawnRandom(line: number): void{
        Obstacle.spawn(ObstacleData.getRandomObstacleType(), line)
    }

    public static spawnByName(obstacle_type: string, line: number): void{
        Obstacle.spawn(ObstacleData.findByName(obstacle_type), line) 
    }

    public static spawn(obstacle_type: ObstacleData, line: number){
        Obstacle.obstacles.push(new Obstacle(obstacle_type, line))
    }

    private move(): void {
        this.distance -= Player.getMovement() * (1 - this.distance) + 0.01
        console.log(this.distance)

        if (this.distance <= -1){
            this.delete()
            return
        }

        this.html_handler.moveTo(this.line, this.distance)
    }

    public activateEffect(): void{
        if (this.activated){
            return
        }
        
        return
    }
}