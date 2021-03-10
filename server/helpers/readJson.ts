const fs = require("fs");

export const readJSON = (filename: string) => {
  return JSON.parse(
    fs.readFileSync(filename, (err: Error, data: any) => {
      if (err) throw err;
      return data;
    })
  );
};
