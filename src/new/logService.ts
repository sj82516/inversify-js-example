import fs from "fs/promises";
import {injectable} from "inversify";

export const LogServiceTypes = {
   slack: Symbol("slack"),
   local: Symbol("local")
}
export type LogServiceTypeValueTypes = typeof LogServiceTypes[keyof typeof LogServiceTypes];

export interface LogService {
    log(message: string): void;
    error(message: string): void;
}

@injectable()
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

@injectable()
export class SlackLogService implements LogService {
    async log(message: string) {
        console.log("send log to slack", message)
    }

    async error(message: string) {
        console.log("send error log to slack", message)
    }
}