export type CommitPrompt = {
  type: {
    hint: string;
    choices: string[];
    default: string;
  };
  message: {
    hint: string;
  };
  quitMessage?: string;
};
