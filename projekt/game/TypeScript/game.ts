import { Globals } from "./globals.js"
import { Player } from "./player.js"
import { Obstacle } from "./obstacle.js"
import { Sound } from "./sound.js"

abstract class Game{
    private static game_loop_on: boolean = false

    public static startGame(): void{
        if (Game.game_loop_on){
            console.log("nie można rozpocząć gry, gdy pętla gry jest aktywna")
            return
        }

        Player.gameStart()
        Sound.setTrack("main-theme.wav")
        
        Game.startGameLoop()
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
        Game.stopGameLoop()

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
}

//DO EDYCJI NA JAKIKOLWIEK PRZYCISK, CO BY OBSŁUGIWAŁ ODPALENIE GRY
let start_game_button: HTMLButtonElement = document.getElementById("btn_game_start") as HTMLButtonElement
start_game_button.addEventListener("click", Game.startGame)
