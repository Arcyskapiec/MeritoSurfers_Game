import { Globals } from "./globals.js";
import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";
import { Sound } from "./sound.js";
export class Game {
    static game_loop_on = false;
    static points = 0;
    static startGame() {
        if (Game.game_loop_on) {
            console.log("nie można rozpocząć gry, gdy pętla gry jest aktywna");
            return;
        }
        Player.gameStart();
        Sound.setTrack("main-theme.wav");
        Game.startGameLoop();
        Game.points = 0;
        Game.givePoints();
        Game.spawnObstacles();
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
        Sound.play("game-over.wav", false);
        console.log("koniec gry");
        Game.stopGameLoop();
        Player.gameEnd();
        Game.uploadPoints(Game.points);
        Sound.stopTrack();
        Obstacle.deleteAllObstacles();
    }
    static startGameLoop() {
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
    static isGameLoopOn() {
        return Game.game_loop_on;
    }
    static async spawnObstacles() {
        if (!Game.game_loop_on) {
            return;
        }
        Obstacle.spawnRandomRow();
        setTimeout(() => {
            Game.spawnObstacles();
        }, 2000);
    }
    static async givePoints() {
        if (!Game.game_loop_on) {
            return;
        }
        setTimeout(() => {
            Game.givePoints();
            Game.points += 1;
            console.log("Points: " + Game.points.toString());
        }, 1000);
    }
    static async uploadPoints(points) {
        //upload Points jest wywoływane przy końcu gry
        points; //ilość zdobytych przez gracza punktów
        //walnij tu kod. Żeby go skompilować, odpal terminal w VS i najpierw wejdź do foleru projektu ("cd projekt"), a następnie wpisz komendę "tsc". Powinno się poprawnie skompilować
    }
}
//DO EDYCJI NA JAKIKOLWIEK PRZYCISK, CO BY OBSŁUGIWAŁ ODPALENIE GRY
let start_game_button = document.getElementById("btn_game_start");
start_game_button.addEventListener("click", Game.startGame);
