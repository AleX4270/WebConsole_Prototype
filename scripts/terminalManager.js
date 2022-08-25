export class TerminalManager
{
    configData;

    constructor()
    {

    }

    //Commands
    CMD_clearTerminalWindow(terminalWindow)
    {
        let elements = document.querySelectorAll(".resultContainer");

        elements.forEach((el) => {
            terminalWindow.removeChild(el);
        })
    }

    CMD_displayCurrentDate(inputContainer)
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

        this.displayMessage(inputContainer, date + " " + time);
    }

    //UI
    displayMessage(inputContainer, message, color = "aquamarine")
    {
        let toPrint = "<div class='resultContainer' " +
            "style='color: " + color + "' >" + message + "<br></div>";
        inputContainer.insertAdjacentHTML('beforebegin', toPrint);
    }

    //Background
    readConfigData(inputContainer)
    {
        fetch("scripts/config.json")
            .then(res => res.json())
            .then(res => {
                this.configData = res;
                this.adjustTerminalVersion();
                this.displayMessage(inputContainer, this.configData["welcomeMessage"], "lightgreen");
            });
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