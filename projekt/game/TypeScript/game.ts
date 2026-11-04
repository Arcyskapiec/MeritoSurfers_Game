import { Globals } from "./globals.js"
import { Player } from "./player.js"
import { Line } from "./line.js"
import { Obstacle } from "./obstacle.js"

abstract class Game{
    private static game_loop_on: boolean = false

    public static startGame(): void{
        Player.setLine(Line.getMiddleLine())


        Game.startGameLoop()
    }

    public static endGame():void{
        Game.stopGameLoop()

        Obstacle.deleteAllObstacles()
    }

    private static async startGameLoop(): Promise<void>{
        this.game_loop_on = true

        while (this.game_loop_on){
            Obstacle.getObstacles().forEach(obstacle => {
                obstacle.process()
            });

            Player.process()



            await Globals.getFrameElapseTimeout()
        }
    }

    private static stopGameLoop(){
        this.game_loop_on = false
    }
}

//DO EDYCJI NA JAKIKOLWIEK PRZYCISK, CO BY OBSŁUGIWAŁ ODPALENIE GRY
let start_game_button: HTMLButtonElement = document.getElementById("btn_game_start") as HTMLButtonElement
start_game_button.addEventListener("click", Game.startGame)

//DO ZROBIENIA
function handleMovementInput(data: string, evt: KeyboardEvent){}
    