export class Sound{
    private static sounds: Sound[] = []
    private static current_track: HTMLAudioElement;

    private audio: HTMLAudioElement;

    constructor(file_name: string, loop: boolean) {
        this.audio = Sound.getAudioFromUrl(file_name)
        this.audio.loop = loop
        this.audio.play()
        Sound.sounds.push(this)
    }

    public stop(): void{
        this.audio.pause()
        this.delete()
    }

    public static play(file_name: string, loop: boolean): Sound{
        return new Sound(file_name, loop)
    }

    public static async setTrack(file_name: string): Promise<void>{
        Sound.current_track = Sound.getAudioFromUrl(file_name)
        Sound.current_track.loop = true
        Sound.current_track.play()
    }

    public static stopTrack(): void{
        Sound.current_track.pause()
        Sound.current_track.currentTime = 0
    }

    private static getAudioFromUrl(url: string): HTMLAudioElement{
        return new Audio("./sfx/" + url)
    }

    private delete(): void{
        let i: number = Sound.sounds.indexOf(this)
        Sound.sounds.splice(i, 1)
    }
}