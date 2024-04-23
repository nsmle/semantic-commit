import { execSync } from "child_process";
import { Commit } from "@type/commit.type";

export const commitMessage = ({ type, message }: Commit): string => `git commit -m "${type}: ${message}"`;
export const commit = (commit: string): string => execSync(commit).toString();

export default { commitMessage, commit };
