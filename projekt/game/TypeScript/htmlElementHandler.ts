import { Globals } from "./globals.js"

export class htmlElementHandler{
    private static html_element_handlers: htmlElementHandler[] = []

    private html_element: HTMLElement

    constructor(class_name: string) {
        this.html_element = htmlElementHandler.createHtmlElement(class_name)
    }    

    private static createHtmlElement(class_name: string): HTMLElement{
        var new_element: HTMLElement = document.createElement("div")
        new_element.className = class_name
        Globals.game_window.appendChild(new_element)
        return new_element
    }

    public setImage(file_name: string): void{

        this.html_element.style.backgroundImage = 'url("./img/' + file_name + '")'
        this.html_element.style.backgroundSize = "contain"
        this.html_element.style.backgroundRepeat = "no-repeat"
        this.html_element.style.backgroundPosition = "bottom"
        this.html_element.style.width = "20%"
        this.html_element.style.height = "400px"
    }

    public getHtmlElement(): HTMLElement{
        return this.html_element
    }

    public delete(): void{
        this.html_element.remove()
        let i: number = htmlElementHandler.html_element_handlers.indexOf(this)
        htmlElementHandler.html_element_handlers.splice(i, 1)
    }

    public static deleteAllByClass(class_name: string): void{
        htmlElementHandler.html_element_handlers.forEach(handler => {
            if(handler.html_element.className == class_name){
                handler.delete()
            }
        })
    }
}
