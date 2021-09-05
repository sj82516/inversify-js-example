import fs from "fs/promises";

export interface LogService {
    log(message: string): void;
    error(message: string): void;
}

export class LocalLogService implements LogService {
    static NORMAL_FILE = './normal.log'
    static ERROR_FILE = './error.log'
    async log(message: string) {
       await fs.appendFile(LocalLogService.NORMAL_FILE, message);
    }

    async error(message: string) {
        await fs.appendFile(LocalLogService.ERROR_FILE, message);
    }
}

export class SlackLogService implements LogService {
    async log(message: string) {
        console.log("send log to slack", message)
    }

    async error(message: string) {
        console.log("send error log to slack", message)
    }
}