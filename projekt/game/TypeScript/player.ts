import { HandleInput, InputHandler } from "./inputHandler.js";
import { Globals } from "./globals.js";
import { htmlElementHandler } from "./htmlElementHandler.js";
import { Line } from "./line.js";

export class Player implements HandleInput{
    
    private static line: number; //linia, na której znajduje się postać
    private static character: number; //DO WYBRANIA POSTACI, PLACEHOLDER
    private static character_image_source: string //PLACEHOLDER

    private static base_speed: number = 3000 //prędkość biegu postaci. Ilość milisekund, jakich potrzebuje by dobiec do nowej przeszkody (albo to, ile czasu przeszkoda potrzebuje, by dotrzeć do gracza xP)
    private static movement: number = 0.01 //przemieszczenie postaci

    private static html_handler: htmlElementHandler = new htmlElementHandler("player")

    //DLA INPUT HANDLER'A
    public html_element: HTMLElement = Player.html_handler.getHtmlElement()
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
                console.log("S")
                break;

            case "a":
            case "ArrowLeft":
                console.log("A")
                if(Line.canBeEntered(Player.line - 1)){
                    Player.input_handler.turnOffUntil(
                        Player.moveTo(Player.line - 1)
                    )
                }

                break;

            case "d":
            case "ArrowRight":
                console.log("D")
                if(Line.canBeEntered(Player.line + 1)){
                    Player.input_handler.turnOffUntil(
                        Player.moveTo(Player.line + 1)
                    )
                }

                break;

            default:
                throw(typeof this + " received unsupported input")
        }
    }
    //KONIEC RZECZY DLA INPUT HANDLERA

    public static gameStart(): void{
        Player.setLine(Line.getMiddleLine())

        Player.setCharacter(Globals.character_initials)
    }

    public static async process(): Promise<void>{
        Player.html_handler.moveTo(Player.line, 0)
    }

    public static setLine(line: number): void{
        Player.line = line
    }

    private static setCharacter(character_initials: string): void{
        Player.html_handler.setImage("characters/" + character_initials + "/tmp_character.png")
    }

    public static getMovement(): number{
        return Player.movement
    }

    private static async moveTo(line: number): Promise<void>{
        Player.setLine(line)
    }
}