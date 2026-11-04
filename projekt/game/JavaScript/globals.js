export class Globals {
    static frames_per_second = 60;
    static frame_elapse_time_ms = 1000 / this.frames_per_second;
    static getFramesPerSecond() {
        return Globals.frames_per_second;
    }
    static getFrameElapseTimeMS() {
        return Globals.frame_elapse_time_ms;
    }
    static getFrameElapseTimeout() {
        return new Promise(resolve => setTimeout(resolve, this.getFrameElapseTimeMS()));
    }
}
