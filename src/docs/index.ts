import { readFileSync } from "fs";
import * as path from "path";

export const help: string = readFileSync(path.join(__dirname, "help.doc"), "utf8");
export default { help };
