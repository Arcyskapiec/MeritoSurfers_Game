import { Globals } from "./globals.js"
import { Player } from "./player.js"
import { Obstacle } from "./obstacle.js"
import { Sound } from "./sound.js"

export class Game{
    private static game_loop_on: boolean = false
    private static points: number = 0

    private static ran_distance_counter: number

    private static last_point_awarded_distance: number
    private static distance_inbetween_points_award: number = 1
    
    private static last_obstacle_spawned_distance: number
    private static distance_inbetween_obstacle_rows: number = 2
   

    public static startGame(): void{
        if (Game.game_loop_on){
            console.log("nie można rozpocząć gry, gdy pętla gry jest aktywna")
            return
        }

        Game.zeroCounters()

        Player.gameStart()
        Sound.setTrack("main-theme.wav")
        
        Game.startGameLoop()
    }

    private static async gameLoop(): Promise<void>{
        if (Game.game_loop_on == false){
            return;
        }
        Globals.getFrameElapseTimeout().then(() => Game.gameLoop())
        
        Game.process()
        Obstacle.process()
        Player.process()
    }

    private static async process(): Promise<void>{
        Game.handleObstacleSpawning()
        Game.handlePointsOverTimeAwarding()
    }

    public static endGame():void{
        Sound.play("game-over.wav", false).start()
        console.log("koniec gry")

        Game.stopGameLoop()
        Player.gameEnd()

        Game.uploadPoints(Game.points)
        Sound.stopTrack()

        Obstacle.deleteAllObstacles()


    }

    private static startGameLoop(): void{
        if (Game.game_loop_on){
            console.log("nie można rozpocząć pętli gry, gdyż ta jest już aktywna")
            return;
        }

        Game.game_loop_on = true

        Game.gameLoop()
    }

    private static stopGameLoop(){
        Game.game_loop_on = false
    }

    public static isGameLoopOn(): boolean{
        return Game.game_loop_on
    }

    private static async spawnObstacles(): Promise<void>{
        if(!Game.game_loop_on){
            return
        }

        Obstacle.spawnRandomRow()
        setTimeout(() => {
            Game.spawnObstacles()
        }, 2000);
    }

    private static zeroCounters(): void{
        Game.points = 0
        Game.ran_distance_counter = 0
        Game.last_obstacle_spawned_distance = 0
        Game.last_point_awarded_distance = 0
    }

    public static async updateRanDistance(distance_change: number): Promise<void>{
        Game.ran_distance_counter += distance_change
    }

    private static handleObstacleSpawning(): void{
        if(Game.ran_distance_counter - Game.last_obstacle_spawned_distance >= Game.distance_inbetween_obstacle_rows){
            Obstacle.spawnRandomRow()
            Game.last_obstacle_spawned_distance = Game.ran_distance_counter
        }
    }

    private static handlePointsOverTimeAwarding(): void{
        if(Game.ran_distance_counter - Game.last_point_awarded_distance >= Game.distance_inbetween_points_award){
            Game.points += 1
            Game.last_point_awarded_distance = Game.ran_distance_counter
            console.log("Points: " + Game.points.toString())
        }
    }

    private static async uploadPoints(points: number): Promise<void>{
        //upload Points jest wywoływane przy końcu gry
        points //ilość zdobytych przez gracza punktów
        //walnij tu kod. Żeby go skompilować, odpal terminal w VS i najpierw wejdź do foleru projektu ("cd projekt"), a następnie wpisz komendę "tsc". Powinno się poprawnie skompilować
    }
}

//DO EDYCJI NA JAKIKOLWIEK PRZYCISK, CO BY OBSŁUGIWAŁ ODPALENIE GRY
let start_game_button: HTMLButtonElement = document.getElementById("btn_game_start") as HTMLButtonElement

start_game_button.addEventListener("click", Game.startGame)
