import { Globals } from "./globals.js";
export class htmlElementHandler {
    static html_element_handlers = [];
    html_element;
    constructor(class_name) {
        this.html_element = htmlElementHandler.createHtmlElement(class_name);
    }
    static createHtmlElement(class_name) {
        var new_element = document.createElement("div");
        new_element.className = class_name;
        Globals.game_window.appendChild(new_element);
        return new_element;
    }
    setImage(file_name) {
        this.html_element.style.backgroundImage = 'url("./img/' + file_name + '")';
        this.html_element.style.backgroundSize = "contain";
        this.html_element.style.backgroundRepeat = "no-repeat";
        this.html_element.style.backgroundPosition = "bottom";
        this.html_element.style.width = "20%";
        this.html_element.style.height = "400px";
    }
    getHtmlElement() {
        return this.html_element;
    }
    delete() {
        this.html_element.remove();
        let i = htmlElementHandler.html_element_handlers.indexOf(this);
        htmlElementHandler.html_element_handlers.splice(i, 1);
    }
    static deleteAllByClass(class_name) {
        htmlElementHandler.html_element_handlers.forEach(handler => {
            if (handler.html_element.className == class_name) {
                handler.delete();
            }
        });
    }
}
