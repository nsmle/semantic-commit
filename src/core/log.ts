export const logError = (err: any): void => {
  console.log(err);

  let bufferOutput = err?.output[1];
  let stdout = bufferOutput.toString();

  console.log(stdout);
};

export const log = (callback: (value: any) => Promise<string>, args: any): void => {
  callback(args)
    .then((data) => console.log(data))
    .catch((err) => logError(err));
};
