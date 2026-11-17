export class Sound{
    private static sounds: Sound[] = []
    private static current_track: HTMLAudioElement;

    private audio: HTMLAudioElement;

    constructor(file_name: string, loop: boolean) {
        this.audio = Sound.getAudioFromUrl(file_name)
        this.audio.loop = loop
        Sound.sounds.push(this)
    }

    public stop(): void{
        this.audio.pause()
        this.delete()
    }

    public start(): void{
        this.audio.play()
    }

    public setVolume(volume: number): void{
        this.audio.volume = volume
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
    
    public static playRandom(file_names: string[]): void{
        let i: number = Math.floor(Math.random() * file_names.length)
        Sound.play(file_names[i], false)
    }
}