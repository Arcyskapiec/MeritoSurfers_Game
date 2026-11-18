import { InputHandler } from "./inputHandler.js";
import { Globals } from "./globals.js";
import { htmlElementHandler } from "./htmlElementHandler.js";
import { Line } from "./line.js";
import { Game } from "./game.js";
import { Sound } from "./sound.js";
//JD edit
import { Animation } from "./animation.js";
//JD edit
export class Player {
    static line; //linia, na której znajduje się postać
    static character; //DO WYBRANIA POSTACI, PLACEHOLDER
    static character_image_source; //PLACEHOLDER
    static level = "full"; //gdzie postać oberwie efektem przeszkody. low - wślizg, high - skok, full - idzie i obrywa wszystkim co jest
    static base_speed = 1; //bazowa prędkość biegu postaci. Próbowałem, żeby to było z czymś związane, ale nie wyszło. Wartość czysto arbitralna XDDD
    static speed_modifiers = [];
    static movement = 0; //przemieszczenie postaci
    static sfx_jumps = ["jumps/jump1.wav", "jumps/jump2.wav", "jumps/jump3.wav", "jumps/jump4.wav"];
    static sfx_footsteps = new Sound("running.wav", true);
    static html_handler = new htmlElementHandler("player");
    //DLA INPUT HANDLER'A
    html_element = Player.html_handler.getHtmlElement();
    static handled_inputs = ["w", "a", "s", "d", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    static input_handler; // = new InputHandler(new Player(), Player.handled_inputs)
    handleInput(input) {
        switch (input) {
            case "w":
            case "ArrowUp":
                console.log("W");
                Player.input_handler.turnOffUntil(Player.jump()).then(() => Player.removeKeyboardHandlerIfGameLoopOff());
                break;
            case "s":
            case "ArrowDown":
                console.log("S");
                Player.input_handler.turnOffUntil(Player.slide()).then(() => Player.removeKeyboardHandlerIfGameLoopOff());
                break;
            case "a":
            case "ArrowLeft":
                console.log("A");
                if (Line.canBeEntered(Player.line - 1)) {
                    Player.input_handler.turnOffUntil(Player.moveTo(Player.line - 1)).then(() => Player.removeKeyboardHandlerIfGameLoopOff());
                }
                break;
            case "d":
            case "ArrowRight":
                console.log("D");
                if (Line.canBeEntered(Player.line + 1)) {
                    Player.input_handler.turnOffUntil(Player.moveTo(Player.line + 1)).then(() => Player.removeKeyboardHandlerIfGameLoopOff());
                }
                break;
            default:
                throw (typeof this + " received unsupported input");
        }
    }
    //KONIEC RZECZY DLA INPUT HANDLERA
    static gameStart() {
        Player.input_handler = new InputHandler(new Player(), Player.handled_inputs);
        Player.setLine(Line.getMiddleLine());
        Player.setLevel("full");
        Player.setCharacter(Globals.character_initials);
        Player.sfx_footsteps.setVolume(1);
        Player.sfx_footsteps.start();
        Player.createSpeedModifier("incremental", 1, 5000, 0.05);
    }
    static async process() {
        Player.calculateMovement();
    }
    static gameEnd() {
        Player.input_handler.delete();
        Player.sfx_footsteps.stop();
    }
    static async setLine(line) {
        let time_to_switch = 200;
        Player.html_handler.getHtmlElement().style.transition = "left " + time_to_switch.toString() + "ms";
        Player.html_handler.moveTo(line, 0);
        await new Promise((resolve) => setTimeout(resolve, time_to_switch / 2));
        Player.line = line;
        await new Promise((resolve) => setTimeout(resolve, time_to_switch / 2));
    }
    static setCharacter(character_initials) {
        //JD edit
        // Player.html_handler.setImage("characters/" + character_initials + "/tmp_character.png")
        Animation.startRunAnimation(Player.html_handler, character_initials);
        //JD edit
    }
    static getMovement() {
        return Player.movement;
    }
    static async moveTo(line) {
        await Player.setLine(line);
    }
    static getLine() {
        return Player.line;
    }
    static calculateMovement() {
        let movement = Player.base_speed / Globals.getFramesPerSecond();
        Player.speed_modifiers.forEach(modifier => {
            movement = movement * modifier;
        });
        if (movement > Player.base_speed / Globals.getFramesPerSecond() * 2) {
            movement = Player.base_speed / Globals.getFramesPerSecond() * 2;
        }
        Player.movement = movement;
        Game.updateRanDistance(movement);
    }
    static getLevel() {
        return Player.level;
    }
    static death() {
        //JD edit
        Animation.stopAnimation();
        //JD edit
        Game.endGame();
    }
    static async createSpeedModifier(type, modifier, timeout_ms, change_for_timeout) {
        Player.speed_modifiers.push(modifier);
        setTimeout(() => Player.changeSpeedModifierValue(type, modifier, timeout_ms, change_for_timeout), timeout_ms);
    }
    static async changeSpeedModifierValue(type, modifier, timeout_ms, change_for_timeout) {
        console.log("speed modifiers: " + Player.speed_modifiers.toString());
        switch (type) {
            case "incremental":
                Player.updateSpeedModifierValue(modifier, modifier + change_for_timeout);
                modifier += change_for_timeout;
                break;
            case "slow":
                if (modifier >= 1) {
                    Player.deleteSpeedModifier(modifier);
                    return;
                }
                Player.updateSpeedModifierValue(modifier, modifier + change_for_timeout);
                modifier += change_for_timeout;
                break;
            default:
                break;
        }
        setTimeout(() => Player.changeSpeedModifierValue(type, modifier, timeout_ms, change_for_timeout), timeout_ms);
    }
    static deleteSpeedModifier(modifier_to_delete) {
        let i = Player.speed_modifiers.findIndex((modifier) => modifier == modifier_to_delete);
        Player.speed_modifiers.splice(i, 1);
    }
    static updateSpeedModifierValue(old_modifier, new_modifier) {
        let i = Player.speed_modifiers.findIndex((modifier) => modifier == old_modifier);
        Player.speed_modifiers[i] = new_modifier;
    }
    static setLevel(level) {
        Player.level = level;
    }
    static async jump() {
        let time_to_fly = 500;
        let time_to_fall = 500;
        //JD edit
        // wznawia animacje biegu chwile przed końcem timeoutu
        let resume_offset = 120;
        //JD edit
        //JD edit
        Animation.pauseAnimation();
        //JD edit
        Player.muteFootSteps();
        Sound.playRandom(Player.sfx_jumps);
        Player.html_handler.getHtmlElement().style.transition = "bottom " + time_to_fly.toString() + "ms";
        Player.html_handler.getHtmlElement().style.bottom = (Line.getBottomPositionAtDistance(0) + 200).toString() + "px";
        await new Promise((resolve) => setTimeout(resolve, time_to_fly / 2));
        Player.level = "high";
        await new Promise((resolve) => setTimeout(resolve, time_to_fly / 2));
        Player.html_handler.getHtmlElement().style.transition = "bottom " + time_to_fall.toString() + "ms";
        Player.html_handler.getHtmlElement().style.bottom = Line.getBottomPositionAtDistance(0).toString() + "px";
        await new Promise((resolve) => setTimeout(resolve, time_to_fall / 2));
        Player.level = "full";
        await new Promise((resolve) => setTimeout(resolve, time_to_fall / 2 - resume_offset));
        Animation.resumeAnimation();
        await new Promise((resolve) => setTimeout(resolve, resume_offset));
        Player.unmuteFootSteps();
    }
    static async slide() {
        let time_to_get_down = 500;
        let time_to_get_up = 500;
        Animation.pauseAnimation();
        Player.html_handler.setImage("characters/" + Globals.character_initials + "/" + Globals.character_initials + "_duck.png");
        Player.muteFootSteps();
        await new Promise((resolve) => setTimeout(resolve, time_to_get_down / 2));
        Player.level = "low";
        await new Promise((resolve) => setTimeout(resolve, time_to_get_down / 2));
        await new Promise((resolve) => setTimeout(resolve, time_to_get_up / 2));
        Player.level = "low";
        await new Promise((resolve) => setTimeout(resolve, time_to_get_up / 2));
        Animation.resumeAnimation();
        Player.unmuteFootSteps();
    }
    static removeKeyboardHandlerIfGameLoopOff() {
        if (!Game.isGameLoopOn()) {
            Player.input_handler.delete();
        }
    }
    static unmuteFootSteps() {
        if (!Game.isGameLoopOn()) {
            Player.sfx_footsteps.stop();
            return;
        }
        Player.sfx_footsteps.setVolume(1);
    }
    static muteFootSteps() {
        Player.sfx_footsteps.setVolume(0);
    }
    static slow(modifier) {
        Player.createSpeedModifier("slow", modifier, 100, (1 - modifier) / 10);
    }
}
