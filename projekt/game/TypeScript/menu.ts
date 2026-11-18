//JD edit
import { Globals } from "./globals.js"
import { Game } from "./game.js"
export class Menu {
    // pobranie głównych kontenerów z index.html
    private static menu_container = document.getElementById("menu_container") as HTMLDivElement
    private static screen_main = document.getElementById("screen_main") as HTMLDivElement
    private static screen_nickname = document.getElementById("screen_nickname") as HTMLDivElement
    private static screen_character = document.getElementById("screen_character") as HTMLDivElement

    // uruchamiane raz przy starcie gry - podpina akcje pod przyciski z HTML
    public static init(): void {
        const input = document.getElementById("input_nickname") as HTMLInputElement

        // wczytuje nick zapisany wcześniej w przeglądarce
        Globals.player_nickname = localStorage.getItem("player_nickname") || ""
        input.value = Globals.player_nickname

        // KROK 1: przyciski ekran głowny
        document.getElementById("btn_menu_start")!.onclick = () => {
            Menu.showScreen(Menu.screen_nickname)
        }
        document.getElementById("btn_menu_leaderboard")!.onclick = () => {
            window.location.href = "./leaderboard.html"
            // to jest temp przekierowanie na nowa strone
            // jesli zrobisz leaderboard jako popup w index.html wystarczy tutaj otworzyć kontener z tabela zamiast przekierowania
        }

        // KROK 2: przyciski nick
        document.getElementById("btn_nickname_next")!.onclick = () => {
            const nick = input.value.trim()
            if (!nick) {
                alert("Wpisz nick, aby przejść dalej.")
                return
            }

            // zapisuje nick globalnie (pod backend info dot punktow) oraz w pamieci przegladarki
            Globals.player_nickname = nick
            localStorage.setItem("player_nickname", nick)

            Menu.showScreen(Menu.screen_character)
        }
        //przycisk wroc z etapu podawania nick
        document.getElementById("btn_nickname_back")!.onclick = () => {
            Menu.showScreen(Menu.screen_main)
        }

        // KROK 3: przyciski wybor postaci 
        document.querySelectorAll<HTMLButtonElement>(".character_btn").forEach((btn) => {
            btn.onclick = () => {
                //odczyt inicjalow z `data-character', zabezpieczenie awaryjne "AS"
                Globals.character_initials = btn.dataset.character || "AS"
                // od razu po wybraniu postaci gra startuje
                Menu.hide()      // chowa całe menu
                Game.startGame() // uruchamia rozgrywkę
            }
        })

        //przycisk wroc z etapu wyboru postaci
        document.getElementById("btn_character_back")!.onclick = () => {
            Menu.showScreen(Menu.screen_nickname)
        }

        //na starcie widoczny jest ekran główny
        Menu.showMainMenu()
    }

    // pokazuje menu po zakończeniu gry (wywoływane w `Game.endGame()`)
    //idk czy chcemy po przegranej wyswietlenie menu
    //lepiej by bylo np. wyswietlic osiagniety wynik 
    // + pytanie czy chcesz kontynuowac gre(co by automatycznie startowalo gre z obecnymi danymi np dodac Menu.showGameOver())/wycowac sie do menu/przejsc do leaderboard
    //ale to jak bedziesz chcial renji
    public static show(): void {
        Menu.menu_container.style.display = "flex"
        Menu.showMainMenu()
    }

    // ukrywa menu na czas gry
    public static hide(): void {
        Menu.menu_container.style.display = "none"
    }

    // resetuje widok do ekranu głównego
    private static showMainMenu(): void {
        Menu.showScreen(Menu.screen_main)
    }

    // chowa wszystkie 3 ekrany i pokazuje tylko ten przekazany w active_screen, 
    private static showScreen(active_screen: HTMLDivElement): void {
        Menu.screen_main.style.display = "none"
        Menu.screen_nickname.style.display = "none"
        Menu.screen_character.style.display = "none"
        active_screen.style.display = "flex"
    }
}
//JD edit