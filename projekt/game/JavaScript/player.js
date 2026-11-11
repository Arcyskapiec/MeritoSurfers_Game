import { InputHandler } from "./inputHandler.js";
import { Globals } from "./globals.js";
import { htmlElementHandler } from "./htmlElementHandler.js";
import { Line } from "./line.js";
export class Player {
    static line; //linia, na której znajduje się postać
    static character; //DO WYBRANIA POSTACI, PLACEHOLDER
    static character_image_source; //PLACEHOLDER
    static base_speed = 3000; //prędkość biegu postaci. Ilość milisekund, jakich potrzebuje by dobiec do nowej przeszkody (albo to, ile czasu przeszkoda potrzebuje, by dotrzeć do gracza xP)
    static movement; //przemieszczenie postaci
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
                break;
            case "a":
            case "ArrowLeft":
                break;
            case "d":
            case "ArrowRight":
                break;
            default:
                throw (typeof this + " received unsupported input");
        }
    }
    //KONIEC RZECZY DLA INPUT HANDLERA
    static gameStart() {
        Player.setCharacter(Globals.character_initials);
        Player.setLine(Line.getMiddleLine());
    }
    static async process() {
        console.log("UwU");
    }
    static setLine(line) {
        Player.line = line;
    }
    static setCharacter(character_initials) {
        Player.html_handler.setImage("characters/" + character_initials + "/tmp_character.png");
    }
}
