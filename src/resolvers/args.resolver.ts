import semanticCommit from "@core/semantic.commit";
import info from "@core/info";
import { ArgsOptions } from "@type/args.options.type";

export const args = process.argv.slice(2);

const getArgOptions = (args: string[]): ArgsOptions => {
  const options = {};
  args
    .join("=")
    .split("-")
    .filter((arg): string => arg)
    .map((arg): string => arg.replace(/^=|=$/g, ""))
    .map((arg): any => {
      const [key, val] = arg.split("=");
      options[key] = val;
    });

  return options as ArgsOptions;
};

const existOptKey = (options: ArgsOptions, option: Array<keyof ArgsOptions>): boolean => {
  for (const opts of Object.keys(options)) {
    for (const opt of option) {
      if (opts == opt) return true;
    }
  }

  return false;
};

export const resolveArgs = async (args: string[]): Promise<string | any> => {
  const options: ArgsOptions = getArgOptions(args);
  if (existOptKey(options, ["v", "version"])) return info.version;
  if (existOptKey(options, ["h", "help"])) return info.help;

  return semanticCommit({
    ...(options?.lang || options?.l ? { lang: options?.lang || options?.l } : {}),
  });
};
