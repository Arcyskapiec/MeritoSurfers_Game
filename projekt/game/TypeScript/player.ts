import { HandleInput, InputHandler } from "./inputHandler.js";
import { Globals } from "./globals.js";
import { htmlElementHandler } from "./htmlElementHandler.js";
import { Line } from "./line.js";

export class Player implements HandleInput{
    
    private static line: number; //linia, na której znajduje się postać
    private static character: number; //DO WYBRANIA POSTACI, PLACEHOLDER
    private static character_image_source: string //PLACEHOLDER

    private static base_speed: number = 0.01 //bazowa prędkość biegu postaci
    private static speed_modifiers: number[] = []
    private static movement: number = 0 //przemieszczenie postaci

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
        Player.createSpeedModifier("incremental", 1, 5000, 0.1) // NIE DZIAŁA
    }

    public static async process(): Promise<void>{
        Player.html_handler.moveTo(Player.line, 0)
        Player.calculateMovement()
        //console.log(Player.getMovement())
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

    public static getLine(): number{
        return Player.line
    }

    private static calculateMovement(){
        let movement = Player.base_speed

        Player.speed_modifiers.forEach(modifier => {
            movement * modifier
        });

        Player.movement = movement
    }

    public static async createSpeedModifier(type: string, modifier: number, timeout_ms: number, change_for_timeout: number): Promise<void>{
        Player.speed_modifiers.push(modifier)
        setTimeout(() => Player.changeSpeedModifierValue(type, modifier, timeout_ms, change_for_timeout), timeout_ms)
    }

    private static async changeSpeedModifierValue(type: string, modifier: number, timeout_ms: number, change_for_timeout: number): Promise<void>{
        if (modifier == 1){
            Player.deleteSpeedModifier(1)
            return
        }

        switch (type) {
            case "incremental":
                Player.updateSpeedModifierValue(modifier, modifier + change_for_timeout)
                modifier += change_for_timeout
                break;
            case "decremental":
                Player.updateSpeedModifierValue(modifier, modifier - change_for_timeout)
                modifier -= change_for_timeout
                break;
            default:
                break;
        }

        setTimeout(() => Player.changeSpeedModifierValue(type, modifier, timeout_ms, change_for_timeout), timeout_ms)
    }

    private static deleteSpeedModifier(modifier_to_delete: number): void{
        let i: number = Player.speed_modifiers.findIndex((modifier) => modifier == modifier_to_delete)
        Player.speed_modifiers.splice(i, 1)
    }

    private static updateSpeedModifierValue(old_modifier: number, new_modifier: number): void{
        let i: number = Player.speed_modifiers.findIndex((modifier) => modifier == old_modifier)
        Player.speed_modifiers[i] = new_modifier
    }

}