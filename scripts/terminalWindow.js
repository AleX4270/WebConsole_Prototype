import {TerminalParser} from "./terminalParser.js";
import {TerminalManager} from "./terminalManager.js";

class TerminalWindow
{
    //Computing
    command;
    commandResult;

    //Objects
    parser;
    manager;

    //UI Elements
    terminalWindow;
    inputContainer;
    terminalInput;

    constructor()
    {
        this.terminalWindow = document.querySelector(".terminalWindow");

        this.parser = new TerminalParser();
        this.manager = new TerminalManager();

        this.initInputField();
        this.initConsoleInteraction();
        this.manager.readConfigData(this.inputContainer);
    }

    initInputField()
    {
        this.inputContainer = document.createElement("div");
        this.inputContainer.classList.add("inputContainer")

        this.terminalWindow.append(this.inputContainer);

        this.terminalInput = document.createElement("input");
        this.terminalInput.classList.add("terminalInput");
        this.terminalInput.maxLength = 100;
        this.terminalInput.type = "text";
        this.terminalInput.autofocus = true;

        this.inputContainer.append(this.terminalInput);

        this.displayNewLineMark();
    }

    initConsoleInteraction()
    {
        this.terminalWindow.addEventListener("keyup", (event) => {
            if(event.key === "Enter") this.readConsoleInput();
        });
    }

    readConsoleInput()
    {
        this.command = this.terminalInput.value.trim();

        if(this.command.length === 0) return;

        this.terminalInput.value = "";
        this.commandResult = this.parser.parseCommand(this.command);

        if(this.commandResult.includes("exe_"))
        {

            switch(this.commandResult)
            {
                case "exe_clear":
                    this.manager.CMD_clearTerminalWindow(this.terminalWindow);
                    break;

                case "exe_date":
                    this.manager.CMD_displayCurrentDate(this.inputContainer);
                    break;
            }
        }
        else
        {
            this.manager.displayMessage(this.inputContainer, this.commandResult);
        }

        this.terminalWindow.scrollTop = this.terminalWindow.scrollHeight;
    }

    displayNewLineMark()
    {
        this.terminalInput.insertAdjacentHTML("beforebegin",
            "<span style='color: lawngreen; font-weight: bold;'>&gt; </span>");
    }
}

const terminal = new TerminalWindow();