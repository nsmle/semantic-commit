import answers from "@core/answers";
import { commit, commitMessage } from "@core/commit";
import { CommitOptions } from "@type/commit.options.type";

export const semanticCommit = async (options?: Partial<CommitOptions>): Promise<any> => {
  const answer = await answers(options);
  if (answer == "quit" || typeof answer == "string") return answer;

  const gitCommand = commitMessage(answer);
  const stdout = commit(gitCommand);

  return stdout;
};

export default semanticCommit;
