export abstract class Player{
    private static line: number; //linia, na której znajduje się postać
    private static character: number; //DO WYBRANIA POSTACI, DO ZROBIENIA

    private static base_speed: number = 3000 //prędkość biegu postaci. Ilość milisekund, jakich potrzebuje by dobiec do nowej przeszkody (albo to, ile czasu przeszkoda potrzebuje, by dotrzeć do gracza xP)
    public static movement: number //przemieszczenie postaci

    public static async process(): Promise<void>{
        console.log("UwU")
    }

    public static setLine(line: number): void{
        this.line = line
    }
}