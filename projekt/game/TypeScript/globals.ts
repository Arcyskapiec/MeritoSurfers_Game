export abstract class Globals{
    private static frames_per_second: number = 60 //w tyle klatek na sekundę będzie gra celowała

    public static game_window: HTMLDivElement = document.getElementById("game_window") as HTMLDivElement

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
}