const CmdType = {
    help: "help",
    ping: "ping",
    test: "test",
    clear: "clear",
    date: "date"
}

export class TerminalParser
{
    executionResult;
    commandResponses;

    constructor()
    {
        this.initCommandsFile();
    }

    initCommandsFile()
    {
        fetch("scripts/commands.json")
            .then(res => res.json())
            .then(res => {
                this.commandResponses = res;
            });
    }

    parseCommand(command)
    {
        switch(command)
        {
            case CmdType.help:
                this.executionResult = this.commandResponses["help"];
                break;

            case CmdType.ping:
                this.executionResult = this.commandResponses["ping"];
                break;

            case CmdType.clear:
                this.executionResult = this.commandResponses["clear"];
                break;

            case CmdType.date:
                this.executionResult = this.commandResponses["date"];
                break;

            default:
                this.executionResult = this.commandResponses["unknown"];
        }

        return this.executionResult;
    }
}