export abstract class Globals{
    private static frames_per_second: number = 60 //w tyle klatek na sekundę będzie gra celowała

    private static frame_elapse_time_ms: number = 1000 / this.frames_per_second

    public static getFramesPerSecond(): number{
        return Globals.frames_per_second
    }

    public static getFrameElapseTimeMS(): number{
        return Globals.frame_elapse_time_ms
    }

    public static getFrameElapseTimeout(){
        return new Promise(resolve => setTimeout(resolve, this.getFrameElapseTimeMS()))
    }
}