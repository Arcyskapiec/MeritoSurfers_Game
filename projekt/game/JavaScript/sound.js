export class Sound {
    static current_track;
    static async setTrack(file_name) {
        Sound.current_track = new Audio("./sfx/" + file_name);
        Sound.current_track.loop = true;
        Sound.current_track.play();
    }
    static stopTrack() {
        Sound.current_track.pause();
        Sound.current_track.currentTime = 0;
    }
}
