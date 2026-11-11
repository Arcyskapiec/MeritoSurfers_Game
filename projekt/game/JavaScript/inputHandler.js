export class InputHandler {
    static read_input = true;
    static input_handlers = [];
    inputs; // przyciski na klawiaturze, które listener ma zwrócić związanej klasie w metodzie handleInput(input: string)
    tied_class;
    constructor(self, inputs) {
        this.tied_class = self;
        this.inputs = inputs;
        this.tied_class.html_element.tabIndex = -1; //umożliwia zczytywanie keyboard input dla elementów bez pola na inputu
        InputHandler.input_handlers.push(this);
        this.createEventListener();
    }
    async turnOffUntil(async_function) {
        this.deleteEventListener;
        await async_function.then(() => this.createEventListener());
    }
    createEventListener() {
        this.tied_class.html_element.addEventListener("keydown", (e) => this.handleKeyboardInput(e), true);
    }
    deleteEventListener() {
        this.tied_class.html_element.removeEventListener("keydown", (e) => this.handleKeyboardInput(e), true);
    }
    handleKeyboardInput(input) {
        if (this.inputs.includes(input.key)) {
            this.tied_class.handleInput(input.key);
        }
    }
    delete() {
        this.deleteEventListener();
        let i = InputHandler.input_handlers.indexOf(this);
        InputHandler.input_handlers.splice(i, 1);
    }
}
