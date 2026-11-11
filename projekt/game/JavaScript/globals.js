export class Globals {
    static frames_per_second = 60; //w tyle klatek na sekundę będzie gra celowała
    static game_window = document.getElementById("game_window");
    static frame_elapse_time_ms = 1000 / Globals.frames_per_second;
    static getFramesPerSecond() {
        return Globals.frames_per_second;
    }
    static getFrameElapseTimeMS() {
        return Globals.frame_elapse_time_ms;
    }
    static getFrameElapseTimeout() {
        return new Promise(resolve => setTimeout(resolve, Globals.getFrameElapseTimeMS()));
        //return new Promise(resolve => setTimeout(resolve, 2000))
    }
}
