export class Globals {
    static frames_per_second = 60; //w tyle klatek na sekundę będzie gra celowała
    static game_window = document.getElementById("game_window");
    static character_initials = "AS"; //inicjały osoby, używane przy szukaniu ścieżki do grafiki po folderze z inicjałami, "AS" JAKO PLACEHOLDER
    //JD edit
    static player_nickname = "";
    //JD edit
    // SKALOWANIE OKNA GRY ORAZ JEJ ELEMENTÓW 0 0 - górny lewy róg okna, 1 1 - dolny prawy róg okna. czyli 1 to długość całego okna
    static horizon_height = 0.2;
    static horizon_width = 0.1;
    static player_position = 0.9;
    static monster_position = 0.95;
    static frame_elapse_time_ms = 1000 / Globals.frames_per_second;
    static getFramesPerSecond() {
        return Globals.frames_per_second;
    }
    static getFrameElapseTimeMS() {
        return Globals.frame_elapse_time_ms;
    }
    static getFrameElapseTimeout() {
        return new Promise(resolve => setTimeout(resolve, Globals.getFrameElapseTimeMS()));
        //return new Promise(resolve => setTimeout(resolve, 2000))
    }
    static getGameWindowWidth() {
        return Globals.game_window.offsetWidth;
    }
    static getGameWindowHeight() {
        return Globals.game_window.offsetHeight;
    }
    static getHorizonWidth() {
        return Globals.getGameWindowWidth() * Globals.horizon_width;
    }
    //strefa nad horyzontem
    static getUnusedGameWindowHeight() {
        return Globals.getGameWindowHeight() * Globals.horizon_height;
    }
    //strefa od wysokości gracza, do horyzontu
    static getGameWindowHeightInFrontOfPlayer() {
        return Globals.getGameWindowHeight() - Globals.getGameWindowHeightBehindPlayer() - Globals.getUnusedGameWindowHeight();
    }
    //strefa od dołu okna, do wysokości gracza
    static getGameWindowHeightBehindPlayer() {
        return Globals.getGameWindowHeight() - Globals.getGameWindowHeight() * Globals.player_position;
    }
}
