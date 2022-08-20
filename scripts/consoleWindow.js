import "./consoleParser";

class ConsoleWindow
{
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

        const sign = document.createElement("span");
        sign.classList.add("inputMark");
        sign.innerHTML = "&gt;";
        this.cin.before(sign);

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
        let command = this.cin.value;
        this.cin.value = "";
        //Send the string to the parser
        //Get the result of executing the command
        this.inputBox.insertAdjacentHTML('beforebegin', command + '</br>');
    }
}

const cmd = new ConsoleWindow();