import {ConsoleParser} from "./consoleParser.js";

class ConsoleWindow
{
    command = "";
    exeResult = "";
    parser = new ConsoleParser();

    constructor()
    {
        this.cform = document.querySelector(".consoleWindow");

        this.initInputField();
        this.initConsoleInteraction();
    }

    initInputField()
    {
        this.inputBox = document.createElement("div");
        this.inputBox.classList.add("inputBox")

        this.cform.append(this.inputBox);

        this.cin = document.createElement("input");
        this.cin.classList.add("consoleInput");
        this.cin.maxLength = 100;
        this.cin.type = "text";
        this.cin.autofocus = true;

        this.inputBox.append(this.cin);

        this.cin.insertAdjacentHTML("beforebegin",
            "<span style='color: lightgreen;'>&gt;</span>");

    }

    initConsoleInteraction()
    {
        this.cform.addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleConsoleInput();
        });
    }

    handleConsoleInput()
    {
        this.command = this.cin.value;
        this.cin.value = "";
        this.exeResult = this.parser.parseCommand(this.command);
        this.inputBox.insertAdjacentHTML('beforebegin', this.exeResult.toString() + '</br>');
    }
}

const cmd = new ConsoleWindow();