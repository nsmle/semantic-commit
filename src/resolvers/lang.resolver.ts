import { CommitPrompt } from "@type/commit.prompt";
import { Language, LanguageContent } from "@type/language.type";
import { existsSync, readFileSync } from "fs";
import * as path from "path";

const langContentResolver = (langIso: string): LanguageContent => {
  const languageContent = readFileSync(langIso, "utf8");
  let match: any;
  const matches = {};
  const regex = /commit\.(\w+)\.(\w+)="([^"]*)"/g;
  while ((match = regex.exec(languageContent)) !== null) {
    const category = match[1];
    const name = match[2];
    const value = match[3];

    if (!matches[category]) {
      matches[category] = {};
    }

    matches[category][name] = value;
  }

  return matches as LanguageContent;
};

const langFile = (langIso: string): string => path.join(__dirname, "../", "i18n", `${langIso}.lang`);

export const langResolver = (langIso: any = "en"): CommitPrompt | string => {
  const langExist = existsSync(langFile(langIso));
  if (!langExist) return `Upps, Language '${langIso}' unsupported!`;

  const lang = langContentResolver(langFile(langExist ? langIso : "en"));

  return {
    type: {
      hint: lang.type.hint,
      choices: [
        lang.type.chore,
        lang.type.docs,
        lang.type.feat,
        lang.type.fix,
        lang.type.refactor,
        lang.type.style,
        lang.type.test,
      ],
      default: lang.type.default,
    },
    message: {
      hint: lang.message.hint,
    },
    quitMessage: lang.quitMessage,
  };
};
