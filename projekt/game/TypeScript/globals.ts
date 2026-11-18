export abstract class Globals{
    private static frames_per_second: number = 60 //w tyle klatek na sekundę będzie gra celowała

    public static game_window: HTMLDivElement = document.getElementById("game_window") as HTMLDivElement
    public static character_initials: string = "AS" //inicjały osoby, używane przy szukaniu ścieżki do grafiki po folderze z inicjałami, "AS" JAKO PLACEHOLDER
    
    //JD edit
    public static player_nickname: string = ""
    //JD edit

    // SKALOWANIE OKNA GRY ORAZ JEJ ELEMENTÓW 0 0 - górny lewy róg okna, 1 1 - dolny prawy róg okna. czyli 1 to długość całego okna
    public static horizon_height: number = 0.2
    public static horizon_width: number = 0.3
    public static player_position: number = 0.9
    public static monster_position: number = 0.95

    private static frame_elapse_time_ms: number = 1000 / Globals.frames_per_second

    public static getFramesPerSecond(): number{
        return Globals.frames_per_second
    }

    public static getFrameElapseTimeMS(): number{
        return Globals.frame_elapse_time_ms
    }

    public static getFrameElapseTimeout(){
        return new Promise(resolve => setTimeout(resolve, Globals.getFrameElapseTimeMS()))
        //return new Promise(resolve => setTimeout(resolve, 2000))
    }

    public static getGameWindowWidth(): number{
        return Globals.game_window.offsetWidth
    }

    public static getGameWindowHeight(): number{
        return Globals.game_window.offsetHeight
    }

    public static getHorizonWidth(): number{
        return Globals.getGameWindowWidth() * Globals.horizon_width
    }

    //strefa nad horyzontem
    private static getUnusedGameWindowHeight(): number{
        return Globals.getGameWindowHeight() * Globals.horizon_height
    }

    //strefa od wysokości gracza, do horyzontu
    public static getGameWindowHeightInFrontOfPlayer(): number{
        return Globals.getGameWindowHeight() - Globals.getGameWindowHeightBehindPlayer() - Globals.getUnusedGameWindowHeight()
    }

    //strefa od dołu okna, do wysokości gracza
    public static getGameWindowHeightBehindPlayer(): number{
        return Globals.getGameWindowHeight() - Globals.getGameWindowHeight() * Globals.player_position
    }
}