import { Globals } from "./globals.js"
import { Player } from "./player.js"
import { Obstacle } from "./obstacle.js"
import { Sound } from "./sound.js"

export class Game{
    private static game_loop_on: boolean = false
    private static points: number = 0

    public static startGame(): void{
        if (Game.game_loop_on){
            console.log("nie można rozpocząć gry, gdy pętla gry jest aktywna")
            return
        }

        Player.gameStart()
        Sound.setTrack("main-theme.wav")
        
        Game.startGameLoop()
        Game.points = 0
        Game.givePoints()
        Game.spawnObstacles()
    }

    private static async gameLoop(): Promise<void>{
        if (Game.game_loop_on == false){
            return;
        }
        Globals.getFrameElapseTimeout().then(() => Game.gameLoop())
  
        Obstacle.process()
        Player.process()
    }

    public static endGame():void{
        console.log("koniec gry")

        Game.stopGameLoop()

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

    private static async spawnObstacles(): Promise<void>{
        if(!Game.game_loop_on){
            return
        }

        Obstacle.spawnRandomRow()
        setTimeout(() => {
            Game.spawnObstacles()
        }, 2000);
    }

    private static async givePoints(): Promise<void>{
        if(!Game.game_loop_on){
            return
        }

        setTimeout(() => {
            Game.givePoints()
            Game.points += 1
            console.log("Points: " + Game.points.toString())
        }, 1000);
        
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
