export class Player {
    static line; //linia, na której znajduje się postać
    static character; //DO WYBRANIA POSTACI, DO ZROBIENIA
    static base_speed = 3000; //prędkość biegu postaci. Ilość milisekund, jakich potrzebuje by dobiec do nowej przeszkody (albo to, ile czasu przeszkoda potrzebuje, by dotrzeć do gracza xP)
    static movement; //przemieszczenie postaci
    static async process() {
        console.log("UwU");
    }
    static setLine(line) {
        Player.line = line;
    }
}
