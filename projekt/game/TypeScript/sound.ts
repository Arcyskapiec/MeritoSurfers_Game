export abstract class Sound{
    private static current_track: HTMLAudioElement;

    public static async setTrack(file_name: string){
        Sound.current_track = new Audio("./sfx/" + file_name)
        Sound.current_track.loop = true
        Sound.current_track.play()
    }

    public static stopTrack(){
        Sound.current_track.pause()
        Sound.current_track.currentTime = 0
    }
}