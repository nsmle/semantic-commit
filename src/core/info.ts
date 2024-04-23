import docs from "@doc/index";
import { PackageType } from "@type/package.json.type";
import { readFileSync } from "fs";

const packageFile = readFileSync("package.json", "utf8");
const pkg: PackageType = JSON.parse(packageFile);

export const version = (): string => {
  // TODO: check latest version from repo
  return `${pkg.name} version v${pkg.version}`;
};

const help = (): Promise<string> => Promise.resolve(docs.help);

export default {
  help: help(),
  version: version(),
};
