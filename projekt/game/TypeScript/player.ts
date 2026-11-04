export abstract class Player{
    private static line: number; //linia, na której znajduje się postać
    private static character: number; //DO WYBRANIA POSTACI, DO ZROBIENIA

    private static base_speed: number = 0.1 //bazowa prędkość postaci na sekundę. 1 to długość całej widocznej drogi
    public static movement: number //przemieszczenie postaci

    public static setLine(line: number): void{
        this.line = line
    }
}