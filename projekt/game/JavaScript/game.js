import { Globals } from "./globals.js";
import { Player } from "./player.js";
import { Line } from "./line.js";
import { Obstacle } from "./obstacle.js";
import { Sound } from "./sound.js";
class Game {
    static game_loop_on = false;
    static startGame() {
        if (Game.game_loop_on) {
            console.log("nie można rozpocząć gry, gdy pętla gry jest aktywna");
            Sound.stopTrack();
            return;
        }
        Player.setLine(Line.getMiddleLine());
        Sound.setTrack("main-theme.wav");
        Game.startGameLoop();
    }
    static async gameLoop() {
        if (Game.game_loop_on == false) {
            return;
        }
        Globals.getFrameElapseTimeout().then(() => Game.gameLoop());
        Obstacle.process();
        Player.process();
    }
    static endGame() {
        Game.stopGameLoop();
        Obstacle.deleteAllObstacles();
    }
    static async startGameLoop() {
        if (Game.game_loop_on) {
            console.log("nie można rozpocząć pętli gry, gdyż ta jest już aktywna");
            return;
        }
        Game.game_loop_on = true;
        Game.gameLoop();
    }
    static stopGameLoop() {
        Game.game_loop_on = false;
    }
}
//DO EDYCJI NA JAKIKOLWIEK PRZYCISK, CO BY OBSŁUGIWAŁ ODPALENIE GRY
let start_game_button = document.getElementById("btn_game_start");
start_game_button.addEventListener("click", Game.startGame);
