//INPUT HANDLER OSBŁUGUJE TYLKO KLASY ZGODNE Z TYPEM HandleInput. NIE DZIEDZICZYĆ (implements) DLA KLAS STATYCZNYCH. Dla przykładowej implementacji można zobaczyć player.ts
export interface HandleInput{
    html_element: HTMLElement
    handleInput(input: string): void
}

export class InputHandler{
    private static read_input: Boolean = true;
    private static input_handlers: InputHandler[] = []

    private inputs: string[] // przyciski na klawiaturze, które listener ma zwrócić związanej klasie w metodzie handleInput(input: string)
    private tied_class: HandleInput

    public constructor(self: HandleInput, inputs: string[]){
        this.tied_class = self
        this.inputs = inputs

        this.tied_class.html_element.tabIndex = -1 //umożliwia zczytywanie keyboard input dla elementów bez pola na inputu

        InputHandler.input_handlers.push(this)
        this.createEventListener()
    }

    public async turnOffUntil(async_function: Promise<void>): Promise<void>{
        this.deleteEventListener
        await async_function.then(() => this.createEventListener())
    }

    private createEventListener(): void{
        this.tied_class.html_element.addEventListener("keydown", (e) => this.handleKeyboardInput(e), true)
    }

    private deleteEventListener(): void{
        this.tied_class.html_element.removeEventListener("keydown", (e) => this.handleKeyboardInput(e), true)
    }

    private handleKeyboardInput(input: KeyboardEvent): void{
        if(this.inputs.includes(input.key)){
            this.tied_class.handleInput(input.key)
        }
    }

    public delete(): void{
        this.deleteEventListener()

        let i: number = InputHandler.input_handlers.indexOf(this)
        InputHandler.input_handlers.splice(i, 1)
    }

}
