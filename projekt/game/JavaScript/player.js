import { InputHandler } from "./inputHandler.js";
import { Globals } from "./globals.js";
import { htmlElementHandler } from "./htmlElementHandler.js";
import { Line } from "./line.js";
export class Player {
    static line; //linia, na której znajduje się postać
    static character; //DO WYBRANIA POSTACI, PLACEHOLDER
    static character_image_source; //PLACEHOLDER
    static base_speed = 3000; //prędkość biegu postaci. Ilość milisekund, jakich potrzebuje by dobiec do nowej przeszkody (albo to, ile czasu przeszkoda potrzebuje, by dotrzeć do gracza xP)
    static movement = 0.01; //przemieszczenie postaci
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
        Player.setCharacter(Globals.character_initials);
    }
    static async process() {
        Player.html_handler.moveTo(Player.line, 0);
    }
    static setLine(line) {
        Player.line = line;
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
}
