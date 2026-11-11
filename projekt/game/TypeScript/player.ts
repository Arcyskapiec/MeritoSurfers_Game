import { HandleInput, InputHandler } from "./inputHandler.js";
import { Globals } from "./globals.js";

export class Player implements HandleInput{
    
    private static line: number; //linia, na której znajduje się postać
    private static character: number; //DO WYBRANIA POSTACI, DO ZROBIENIA

    private static base_speed: number = 3000 //prędkość biegu postaci. Ilość milisekund, jakich potrzebuje by dobiec do nowej przeszkody (albo to, ile czasu przeszkoda potrzebuje, by dotrzeć do gracza xP)
    public static movement: number //przemieszczenie postaci

    //DLA INPUT HANDLER'A
    public html_element: HTMLElement = Globals.game_window // DO DODANIAAA
    private static handled_inputs: string[] = ["w", "a", "s", "d", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
    private static input_handler: InputHandler = new InputHandler(new Player(), Player.handled_inputs)

    public handleInput(input: string): void {
        switch (input) {
            case "w":
            case "ArrowUp":
                console.log("W")
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
                throw(typeof this + " received unsupported input")
        }
    }
    //KONIEC RZECZY DLA INPUT HANDLERA

    public static async process(): Promise<void>{
        console.log("UwU")
    }

    public static setLine(line: number): void{
        Player.line = line
    }
}