import { InputHandler } from "./inputHandler.js";
import { Globals } from "./globals.js";
export class Player {
    static line; //linia, na której znajduje się postać
    static character; //DO WYBRANIA POSTACI, DO ZROBIENIA
    static base_speed = 3000; //prędkość biegu postaci. Ilość milisekund, jakich potrzebuje by dobiec do nowej przeszkody (albo to, ile czasu przeszkoda potrzebuje, by dotrzeć do gracza xP)
    static movement; //przemieszczenie postaci
    //DLA INPUT HANDLER'A
    html_element = Globals.game_window; // DO DODANIAAA
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
    static async process() {
        console.log("UwU");
    }
    static setLine(line) {
        Player.line = line;
    }
}
