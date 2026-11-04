import { ObstacleData } from "./obstacleData";

export class Obstacle{
    private static obstacles: Obstacle[] = []

    private line: number; //na której linii znajduje się przeszkoda
    private distance: number; //1 to najdalej przed graczem, 0 to poziom gracza, -1 za graczem
    private obstacle_data: ObstacleData;

    public constructor(obstacle_type: ObstacleData, line: number){
        this.distance = 1
        this.line = line
        this.obstacle_data = obstacle_type
    }

    public async process(): Promise<void>{

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

    async move(): Promise<void> {
        
    }
}