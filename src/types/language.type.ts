export type Language = "en" | "id" | "pt";

export interface LanguageContent {
  type: {
    chore: string;
    docs: string;
    feat: string;
    fix: string;
    refactor: string;
    style: string;
    test: string;
    default: string;
    hint: string;
  };
  message: {
    hint: string;
  };
  quitMessage?: string;
}
