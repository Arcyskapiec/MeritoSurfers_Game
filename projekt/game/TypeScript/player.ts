import { HandleInput, InputHandler } from "./inputHandler.js";
import { Globals } from "./globals.js";
import { htmlElementHandler } from "./htmlElementHandler.js";
import { Line } from "./line.js";
import { Game } from "./game.js";
import { Sound } from "./sound.js";

export class Player implements HandleInput{
    
    private static line: number; //linia, na której znajduje się postać
    private static character: number; //DO WYBRANIA POSTACI, PLACEHOLDER
    private static character_image_source: string //PLACEHOLDER
    private static level: string = "full" //gdzie postać oberwie efektem przeszkody. low - wślizg, high - skok, full - idzie i obrywa wszystkim co jest

    private static base_speed: number = 0.01 //bazowa prędkość biegu postaci
    private static speed_modifiers: number[] = []
    private static movement: number = 0 //przemieszczenie postaci

    private static sfx_jumps: string[] = ["jumps/jump1.wav", "jumps/jump2.wav", "jumps/jump3.wav", "jumps/jump4.wav"]
    private static sfx_footsteps: Sound = new Sound("running.wav", true)

    private static html_handler: htmlElementHandler = new htmlElementHandler("player")

    //DLA INPUT HANDLER'A
    public html_element: HTMLElement = Player.html_handler.getHtmlElement()
    private static handled_inputs: string[] = ["w", "a", "s", "d", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
    private static input_handler: InputHandler// = new InputHandler(new Player(), Player.handled_inputs)

    public handleInput(input: string): void {
        switch (input) {
            case "w":
            case "ArrowUp":
                console.log("W")
                Player.input_handler.turnOffUntil(
                    Player.jump()
                ).then(() => Player.removeKeyboardHandlerIfGameLoopOff())
                break;
            
            case "s":
            case "ArrowDown":
                console.log("S")
                // DO ZROBIENIA
                break;

            case "a":
            case "ArrowLeft":
                console.log("A")
                if(Line.canBeEntered(Player.line - 1)){
                    Player.input_handler.turnOffUntil(
                        Player.moveTo(Player.line - 1)
                    ).then(() => Player.removeKeyboardHandlerIfGameLoopOff())
                }

                break;

            case "d":
            case "ArrowRight":
                console.log("D")
                if(Line.canBeEntered(Player.line + 1)){
                    Player.input_handler.turnOffUntil(
                        Player.moveTo(Player.line + 1)
                    ).then(() => Player.removeKeyboardHandlerIfGameLoopOff())
                }

                break;

            default:
                throw(typeof this + " received unsupported input")
        }
    }
    //KONIEC RZECZY DLA INPUT HANDLERA

    public static gameStart(): void{
        Player.input_handler = new InputHandler(new Player(), Player.handled_inputs)

        Player.setLine(Line.getMiddleLine())
        Player.setLevel("full")
        Player.setCharacter(Globals.character_initials)

        Player.sfx_footsteps.setVolume(1)
        Player.sfx_footsteps.start()
        
        Player.createSpeedModifier("incremental", 1, 5000, 0.1) // NIE DZIAŁA
    }

    public static async process(): Promise<void>{
        Player.calculateMovement()
    }

    public static gameEnd(): void{
        Player.input_handler.delete()
        Player.sfx_footsteps.stop()
    }

    public static async setLine(line: number): Promise<void>{
        let time_to_switch: number = 200

        Player.html_handler.getHtmlElement().style.transition = "left " + time_to_switch.toString() + "ms"
        Player.html_handler.moveTo(line, 0)

        await new Promise<void>((resolve) => setTimeout(resolve, time_to_switch / 2))

        Player.line = line

        await new Promise<void>((resolve) => setTimeout(resolve, time_to_switch / 2))
    }

    private static setCharacter(character_initials: string): void{
        Player.html_handler.setImage("characters/" + character_initials + "/tmp_character.png")
    }

    public static getMovement(): number{
        return Player.movement
    }

    private static async moveTo(line: number): Promise<void>{
        await Player.setLine(line)
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

    public static getLevel(): string{
        return Player.level
    }

    public static death(): void{
        Game.endGame()
    }

    public static async createSpeedModifier(type: string, modifier: number, timeout_ms: number, change_for_timeout: number): Promise<void>{
        Player.speed_modifiers.push(modifier)
        setTimeout(() => Player.changeSpeedModifierValue(type, modifier, timeout_ms, change_for_timeout), timeout_ms)
    }

    private static async changeSpeedModifierValue(type: string, modifier: number, timeout_ms: number, change_for_timeout: number): Promise<void>{
        console.log(Player.speed_modifiers)

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

    private static setLevel(level: string): void{
        Player.level = level
    }

    private static async jump(): Promise<void>{
        let time_to_fly: number = 500
        let time_to_fall: number = 500

        Player.muteFootSteps()
        Sound.playRandom(Player.sfx_jumps)
        
        Player.html_handler.getHtmlElement().style.transition = "bottom " + time_to_fly.toString() + "ms"
        Player.html_handler.getHtmlElement().style.bottom = (Line.getBottomPositionAtDistance(0) + 200).toString() + "px"

        await new Promise<void>((resolve) => setTimeout(resolve, time_to_fly / 2))
        Player.level = "high"
        await new Promise<void>((resolve) => setTimeout(resolve, time_to_fly / 2))

        Player.html_handler.getHtmlElement().style.transition = "bottom " + time_to_fall.toString() + "ms"
        Player.html_handler.getHtmlElement().style.bottom = Line.getBottomPositionAtDistance(0).toString() + "px"

        await new Promise<void>((resolve) => setTimeout(resolve, time_to_fall / 2))
        Player.level = "full"
        await new Promise<void>((resolve) => setTimeout(resolve, time_to_fall / 2))

        Player.unmuteFootSteps()
    }

    private static removeKeyboardHandlerIfGameLoopOff(): void{
        if (!Game.isGameLoopOn()){
            Player.input_handler.delete()
        }
    }

    private static unmuteFootSteps(): void{
        if (!Game.isGameLoopOn()){
            Player.sfx_footsteps.stop()
            return
        }
        Player.sfx_footsteps.setVolume(1)
    }

    private static muteFootSteps(): void{
        Player.sfx_footsteps.setVolume(0)
    }
}