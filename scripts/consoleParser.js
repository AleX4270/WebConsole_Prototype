export class ConsoleParser
{
    cmdResult = "";
    cmdResponses = "";

    constructor()
    {
        this.initCommandsFile();
    }

    initCommandsFile()
    {
        fetch("scripts/commands.json")
            .then(res => res.json())
            .then(res => {
                this.cmdResponses = res;
            });
    }

    parseCommand(command)
    {
        switch(command)
        {
            case "help":
                this.cmdResult = this.cmdResponses["help"];
                break;

            case "ping":
                this.cmdResult = this.cmdResponses["ping"];
                break;

            case "test":
                this.cmdResult = "Test";
                break;

            case "clear":
                this.cmdResult = this.cmdResponses["clear"];
                break;

            default:
                this.cmdResult = this.cmdResponses["unknown"];
        }

        return this.cmdResult;
    }

    //Commands
    cmdHelp()
    {
        return "";
    }


}