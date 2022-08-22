import {ConsoleParser} from "./consoleParser.js";

class ConsoleWindow
{
    //Computing
    command;
    commandResult;

    //Objects
    parser;

    //UI Elements
    consoleWindow;
    inputContainer;
    consoleInput;

    constructor()
    {
        this.consoleWindow = document.querySelector(".consoleWindow");
        this.parser  = new ConsoleParser();

        this.initInputField();
        this.initConsoleInteraction();
    }

    initInputField()
    {
        this.inputContainer = document.createElement("div");
        this.inputContainer.classList.add("inputContainer")

        this.consoleWindow.append(this.inputContainer);

        this.consoleInput = document.createElement("input");
        this.consoleInput.classList.add("consoleInput");
        this.consoleInput.maxLength = 100;
        this.consoleInput.type = "text";
        this.consoleInput.autofocus = true;

        this.inputContainer.append(this.consoleInput);

        this.consoleInput.insertAdjacentHTML("beforebegin",
            "<span style='color: lawngreen; font-weight: bold;'>&gt; </span>");
    }

    initConsoleInteraction()
    {
        this.consoleWindow.addEventListener("keyup", (event) => {
            if(event.key === "Enter") this.readConsoleInput();
        });
    }

    readConsoleInput()
    {
        this.command = this.consoleInput.value.trim();

        if(this.command.length === 0) return;

        this.consoleInput.value = "";
        this.commandResult = this.parser.parseCommand(this.command);

        if(this.commandResult.includes("exe_"))
        {

            switch(this.commandResult)
            {
                case "exe_clear":
                    this.clearConsoleWindow();
                    break;
            }
        }
        else
        {
            this.inputContainer.insertAdjacentHTML('beforebegin',
                "<div class='resultContainer'>" + this.commandResult + "<br></div>");
        }

        this.consoleWindow.scrollTop = this.consoleWindow.scrollHeight;
    }

    //Maintenance commands
    clearConsoleWindow()
    {
        let elements = document.querySelectorAll(".resultContainer");

        elements.forEach((el) => {
            this.consoleWindow.removeChild(el);
        })
    }
}

const terminal = new ConsoleWindow();