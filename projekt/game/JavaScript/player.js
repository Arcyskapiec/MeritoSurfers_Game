import { InputHandler } from "./inputHandler.js";
import { Globals } from "./globals.js";
import { htmlElementHandler } from "./htmlElementHandler.js";
import { Line } from "./line.js";
import { Game } from "./game.js";
export class Player {
    static line; //linia, na której znajduje się postać
    static character; //DO WYBRANIA POSTACI, PLACEHOLDER
    static character_image_source; //PLACEHOLDER
    static level = "full"; //gdzie postać oberwie efektem przeszkody. low - wślizg, high - skok, full - idzie i obrywa wszystkim co jest
    static base_speed = 0.01; //bazowa prędkość biegu postaci
    static speed_modifiers = [];
    static movement = 0; //przemieszczenie postaci
    static html_handler = new htmlElementHandler("player");
    //DLA INPUT HANDLER'A
    html_element = Player.html_handler.getHtmlElement();
    static handled_inputs = ["w", "a", "s", "d", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    static input_handler = new InputHandler(new Player(), Player.handled_inputs);
    handleInput(input) {
        switch (input) {
            case "w":
            case "ArrowUp":
                console.log("W");
                Player.input_handler.turnOffUntil(Player.jump());
                break;
            case "s":
            case "ArrowDown":
                console.log("S");
                break;
            case "a":
            case "ArrowLeft":
                console.log("A");
                if (Line.canBeEntered(Player.line - 1)) {
                    Player.input_handler.turnOffUntil(Player.moveTo(Player.line - 1));
                }
                break;
            case "d":
            case "ArrowRight":
                console.log("D");
                if (Line.canBeEntered(Player.line + 1)) {
                    Player.input_handler.turnOffUntil(Player.moveTo(Player.line + 1));
                }
                break;
            default:
                throw (typeof this + " received unsupported input");
        }
    }
    //KONIEC RZECZY DLA INPUT HANDLERA
    static gameStart() {
        Player.setLine(Line.getMiddleLine());
        Player.setLevel("full");
        Player.setCharacter(Globals.character_initials);
        Player.createSpeedModifier("incremental", 1, 5000, 0.1); // NIE DZIAŁA
    }
    static async process() {
        //Player.html_handler.moveTo(Player.line, 0)
        Player.calculateMovement();
        //console.log(Player.getMovement())
    }
    static setLine(line) {
        Player.line = line;
        Player.html_handler.moveTo(Player.line, 0);
    }
    static setCharacter(character_initials) {
        Player.html_handler.setImage("characters/" + character_initials + "/tmp_character.png");
    }
    static getMovement() {
        return Player.movement;
    }
    static async moveTo(line) {
        Player.setLine(line);
    }
    static getLine() {
        return Player.line;
    }
    static calculateMovement() {
        let movement = Player.base_speed;
        Player.speed_modifiers.forEach(modifier => {
            movement * modifier;
        });
        Player.movement = movement;
    }
    static getLevel() {
        return Player.level;
    }
    static death() {
        Game.endGame();
    }
    static async createSpeedModifier(type, modifier, timeout_ms, change_for_timeout) {
        Player.speed_modifiers.push(modifier);
        setTimeout(() => Player.changeSpeedModifierValue(type, modifier, timeout_ms, change_for_timeout), timeout_ms);
    }
    static async changeSpeedModifierValue(type, modifier, timeout_ms, change_for_timeout) {
        console.log(Player.speed_modifiers);
        if (modifier == 1) {
            Player.deleteSpeedModifier(1);
            return;
        }
        switch (type) {
            case "incremental":
                Player.updateSpeedModifierValue(modifier, modifier + change_for_timeout);
                modifier += change_for_timeout;
                break;
            case "decremental":
                Player.updateSpeedModifierValue(modifier, modifier - change_for_timeout);
                modifier -= change_for_timeout;
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
        Player.level = "high";
        Player.html_handler.getHtmlElement().style.transition = "bottom " + time_to_fly.toString() + "ms";
        Player.html_handler.getHtmlElement().style.bottom = (Line.getBottomPositionAtDistance(0) + 200).toString() + "px";
        await new Promise((resolve) => setTimeout(resolve, time_to_fly));
        Player.html_handler.getHtmlElement().style.transition = "bottom " + time_to_fall.toString() + "ms";
        Player.html_handler.getHtmlElement().style.bottom = Line.getBottomPositionAtDistance(0).toString() + "px";
        await new Promise((resolve) => setTimeout(resolve, time_to_fall));
        Player.level = "full";
    }
}
