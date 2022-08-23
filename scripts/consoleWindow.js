import {ConsoleParser} from "./consoleParser.js";

class ConsoleWindow
{
    //Computing
    command;
    commandResult;
    configData;

    //Objects
    parser;

    //UI Elements
    terminalWindow;
    inputContainer;
    terminalInput;

    constructor()
    {
        this.terminalWindow = document.querySelector(".terminalWindow");
        this.parser  = new ConsoleParser();

        this.initInputField();
        this.initConsoleInteraction();
        this.readConfigData();

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

        this.terminalInput.insertAdjacentHTML("beforebegin",
            "<span style='color: lawngreen; font-weight: bold;'>&gt; </span>");
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
                    this.clearConsoleWindow();
                    break;

                case "exe_date":
                    this.displayCurrentDate();
                    break;
            }
        }
        else
        {
            this.inputContainer.insertAdjacentHTML('beforebegin',
                "<div class='resultContainer'>" + this.commandResult + "<br></div>");
        }

        this.terminalWindow.scrollTop = this.terminalWindow.scrollHeight;
    }

    //Maintenance commands
    clearConsoleWindow()
    {
        let elements = document.querySelectorAll(".resultContainer");

        elements.forEach((el) => {
            this.terminalWindow.removeChild(el);
        })
    }

    displayCurrentDate()
    {
        let today = new Date();

        let year = (today.getFullYear() < 10) ? ('0' + today.getFullYear()) : today.getFullYear();
        let month = (today.getMonth() < 10) ? ('0' + today.getMonth()) : today.getMonth();
        let day = (today.getDate() < 10) ? ('0' + today.getDate()) : today.getDate();

        let date = day + "/" + month + "/" + year;

        let hours = (today.getHours() < 10) ? ('0' + today.getHours()) : today.getHours();
        let minutes = (today.getMinutes() < 10) ? ('0' + today.getMinutes()) : today.getMinutes();
        let seconds = (today.getSeconds() < 10) ? ('0' + today.getSeconds()) : today.getSeconds();

        let time = hours + ":" + minutes + ":" + seconds;

        this.inputContainer.insertAdjacentHTML('beforebegin',
            "<div class='resultContainer'>" + date + " " + time  + "<br></div>");
    }

    //Misc.
    readConfigData()
    {
        fetch("scripts/config.json")
            .then(res => res.json())
            .then(res => {
                this.configData = res;
                this.adjustTerminalVersion();
                this.displayWelcomeMessage(this.configData["welcomeMessage"]);
            });
    }

    displayWelcomeMessage(message)
    {
        this.inputContainer.insertAdjacentHTML('beforebegin',
            "<div class='resultContainer' style='color: lightgreen;'>" + message + "<br></div>");
    }

    adjustTerminalVersion()
    {
        //Page Title
        document.title = "WebTerminal - Template " + this.configData["version"];

        //Welcome Message
        this.configData["welcomeMessage"] = this.configData["welcomeMessage"].replace("[version]",
            "[" + this.configData["version"] + "]");
    }

}

const terminal = new ConsoleWindow();