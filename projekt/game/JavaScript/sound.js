export class Sound {
    static sounds = [];
    static current_track;
    audio;
    constructor(file_name, loop) {
        this.audio = Sound.getAudioFromUrl(file_name);
        this.audio.loop = loop;
        this.audio.play();
        Sound.sounds.push(this);
    }
    stop() {
        this.audio.pause();
        this.delete();
    }
    static play(file_name, loop) {
        return new Sound(file_name, loop);
    }
    static async setTrack(file_name) {
        Sound.current_track = Sound.getAudioFromUrl(file_name);
        Sound.current_track.loop = true;
        Sound.current_track.play();
    }
    static stopTrack() {
        Sound.current_track.pause();
        Sound.current_track.currentTime = 0;
    }
    static getAudioFromUrl(url) {
        return new Audio("./sfx/" + url);
    }
    delete() {
        let i = Sound.sounds.indexOf(this);
        Sound.sounds.splice(i, 1);
    }
}
