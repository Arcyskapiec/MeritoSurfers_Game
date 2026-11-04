import { Globals } from "./globals";
import { Player } from "./player";
import { Line } from "./line";
import { Obstacle } from "./obstacle";
class Game {
    static game_loop_on = false;
    static startGame() {
        Player.setLine(Line.getMiddleLine());
        Game.startGameLoop();
    }
    static endGame() {
        Game.stopGameLoop();
        Obstacle.deleteAllObstacles();
    }
    static async startGameLoop() {
        this.game_loop_on = true;
        while (this.game_loop_on) {
            Obstacle.getObstacles().forEach(obstacle => {
                obstacle.process();
            });
            await Globals.getFrameElapseTimeout();
        }
    }
    static stopGameLoop() {
        this.game_loop_on = false;
    }
}
//DO EDYCJI NA JAKIKOLWIEK PRZYCISK, CO BY OBSŁUGIWAŁ ODPALENIE GRY
let start_game_button = document.getElementById("btn_game_start");
start_game_button.addEventListener("click", Game.startGame);
//DO ZROBIENIA
function handleMovementInput(data, evt) { }
