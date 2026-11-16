import { Globals } from "./globals.js";
import { Line } from "./line.js";
export class htmlElementHandler {
    static html_element_handlers = [];
    html_element;
    constructor(class_name) {
        this.html_element = htmlElementHandler.createHtmlElement(class_name);
    }
    static createHtmlElement(class_name) {
        var new_element = document.createElement("div");
        new_element.className = class_name;
        new_element.style.position = "absolute";
        Globals.game_window.appendChild(new_element);
        return new_element;
    }
    setImage(file_name) {
        this.html_element.style.backgroundImage = 'url("./img/' + file_name + '")';
        this.html_element.style.backgroundSize = "contain";
        this.html_element.style.backgroundRepeat = "no-repeat";
        this.html_element.style.backgroundPosition = "bottom";
        this.html_element.style.height = "1000px"; //PLACEHOLDER
    }
    //public setLine()
    moveTo(line, distance) {
        this.html_element.style.width = Line.getWidthAtDistance(distance).toString() + "px";
        this.html_element.style.left = Line.getLeftPositionAtDistance(line, distance).toString() + "px";
        this.html_element.style.bottom = Line.getBottomPositionAtDistance(distance).toString() + "px";
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
