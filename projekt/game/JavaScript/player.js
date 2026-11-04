export class Player {
    static line; //linia, na której znajduje się postać
    static character; //DO WYBRANIA POSTACI, DO ZROBIENIA
    static base_speed = 0.1; //bazowa prędkość postaci na sekundę. 1 to długość całej widocznej drogi
    static movement; //przemieszczenie postaci
    static setLine(line) {
        this.line = line;
    }
}
