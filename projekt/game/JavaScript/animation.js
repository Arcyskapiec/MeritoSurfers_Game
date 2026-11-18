export class Animation {
    static interval_id = null; // ID aktywnego timera setInterval (do zatrzymania pętli)
    static current_frame = 1; // numer aktualnie wyswietlanej klatki (1-total_frames)
    static total_frames = 12; // liczba wszystkich klatek w cyklu animacji
    static animated_characters = ["AS"]; // postacie z gotową animacją (reszta dostaje tmp_character.png)
    static preloaded_images = []; // trzyma obrazki w pamięci RAM, żeby nie znikaly z cache (nie migaly)
    static is_paused = false; // czy animacja jest tymczasowo wstrzymana? (pod skok)
    // uruchamia petle animacji biegu dla wybranej postaci
    static startRunAnimation(html_handler, character_initials) {
        Animation.stopAnimation(); // czyści poprzednią petle
        Animation.is_paused = false; // resetuje pauzę przy starcie nowej gry
        // jesli postac nie ma animacji ustawia wilka i konczy startRunAnimation()
        if (!Animation.animated_characters.includes(character_initials)) {
            html_handler.setImage("characters/" + character_initials + "/tmp_character.png");
            return;
        }
        Animation.preloadFrames(character_initials); // laduje wszystkie klatki do pamięci
        Animation.current_frame = 1; // startuje od 1 klatki
        html_handler.setImage("characters/" + character_initials + "/" + character_initials + "_run_1.png");
        // zmienia klatke co 60 ms
        // mozna podmienic to jako zmienna zeby dalo sie adaptowac z przyspieszaniem gry jesli bedzie dodane??
        // do ew. poprawy
        Animation.interval_id = window.setInterval(() => {
            if (Animation.is_paused) {
                return; // podczas skoku zamraza klatke
            }
            // przechodzi do kolejnej klatki, jesli to byla ostatnia to wraca na początek
            Animation.current_frame++;
            if (Animation.current_frame > Animation.total_frames) {
                Animation.current_frame = 1;
            }
            // podmienia obrazek gdy jest w pelni zaladowany
            const next_img = Animation.preloaded_images[Animation.current_frame - 1];
            if (next_img && next_img.complete) {
                html_handler.setImage("characters/" + character_initials + "/" + character_initials + "_run_" + Animation.current_frame + ".png");
            }
        }, 60);
    }
    // wstrzymuje zmiane klatek (wywolane przy starcie skoku w player.ts)
    static pauseAnimation() {
        Animation.is_paused = true;
    }
    // wznawia animacje od zatrzymanej klatki (wywolane po zakonczeniu skoku w player.ts)
    static resumeAnimation() {
        Animation.is_paused = false;
    }
    // calkowicie zatrzymuje petle animacji, np. smierc gracza
    static stopAnimation() {
        if (Animation.interval_id !== null) {
            clearInterval(Animation.interval_id);
            Animation.interval_id = null;
        }
        Animation.is_paused = false;
    }
    // wczytuje i dekoduje z gory wszystkie klatki postaci do pamieci przegladarki
    static preloadFrames(character_initials) {
        Animation.preloaded_images = [];
        for (let i = 1; i <= Animation.total_frames; i++) {
            const img = new Image();
            img.src = "./img/characters/" + character_initials + "/" + character_initials + "_run_" + i + ".png";
            img.decode().catch(() => { }); // dekoduje PNG w tle przed pierwszym wyswietleniem
            Animation.preloaded_images.push(img);
        }
    }
}
