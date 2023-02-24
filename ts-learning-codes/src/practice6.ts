// Q1
class Logger {
    constructor(public fileName: string) {}

    public writeMessage(message?: string): void {
        const fileMessage: string = message ? message : "N/A";
        console.log(fileMessage);
    }
}

const loggers: Logger[] = [
    new Logger("File 1"),
    new Logger("File 2"),
    new Logger("File 3")
];
writeAndDisplayMessageByFile("File 1", "This is confidential");

function writeAndDisplayMessageByFile(fileName: string, message?: string) {
    loggers.forEach((logger: Logger) => {
        if (logger.fileName === fileName) {
            logger.writeMessage(message);
        }
    });
}