import { langResolver } from "@resolver/lang.resolver";
import { CommitOptions } from "@type/commit.options.type";
import { CommitPrompt } from "@type/commit.prompt";
import { select, input } from "@inquirer/prompts";
import { Answers } from "@type/answers.type";

export const answers = async (options?: Partial<CommitOptions>): Promise<Answers> => {
  const prompts: CommitPrompt | string = langResolver(options?.lang);
  if (typeof prompts == "string") return prompts;

  const answers = {
    type: await select<string>({
      message: prompts.type.hint,
      pageSize: 10,
      choices: [...prompts.type.choices, "quit"].map((choice): any => ({
        name: choice,
        value: choice,
        checked: choice == prompts.type.default,
        ...(choice == "quit" && { description: prompts.quitMessage ?? "Cancel commit & exit program" }),
      })),
      loop: false,
    }),
    message: "",
  };

  if (answers.type == "quit") return answers.type;
  answers.message = await input({ message: prompts.message.hint });

  return answers;
};

export default answers;
