import { Globals } from "./globals.js";
import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";
import { Sound } from "./sound.js";
export class Game {
    static game_loop_on = false;
    static points = 0;
    static ran_distance_counter;
    static last_point_awarded_distance;
    static distance_inbetween_points_award = 1;
    static last_obstacle_spawned_distance;
    static distance_inbetween_obstacle_rows = 2;
    static startGame() {
        if (Game.game_loop_on) {
            console.log("nie można rozpocząć gry, gdy pętla gry jest aktywna");
            return;
        }
        Game.zeroCounters();
        Player.gameStart();
        Sound.setTrack("main-theme.wav");
        Game.startGameLoop();
    }
    static async gameLoop() {
        if (Game.game_loop_on == false) {
            return;
        }
        Globals.getFrameElapseTimeout().then(() => Game.gameLoop());
        Game.process();
        Obstacle.process();
        Player.process();
    }
    static async process() {
        Game.handleObstacleSpawning();
        Game.handlePointsOverTimeAwarding();
    }
    static endGame() {
        Sound.play("game-over.wav", false).start();
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
    static zeroCounters() {
        Game.points = 0;
        Game.ran_distance_counter = 0;
        Game.last_obstacle_spawned_distance = 0;
        Game.last_point_awarded_distance = 0;
    }
    static async updateRanDistance(distance_change) {
        Game.ran_distance_counter += distance_change;
    }
    static handleObstacleSpawning() {
        if (Game.ran_distance_counter - Game.last_obstacle_spawned_distance >= Game.distance_inbetween_obstacle_rows) {
            Obstacle.spawnRandomRow();
            Game.last_obstacle_spawned_distance = Game.ran_distance_counter;
        }
    }
    static handlePointsOverTimeAwarding() {
        if (Game.ran_distance_counter - Game.last_point_awarded_distance >= Game.distance_inbetween_points_award) {
            Game.points += 1;
            Game.last_point_awarded_distance = Game.ran_distance_counter;
            console.log("Points: " + Game.points.toString());
        }
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
