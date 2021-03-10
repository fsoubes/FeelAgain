"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJSON = void 0;
const fs = require("fs");
const readJSON = (filename) => {
    return JSON.parse(fs.readFileSync(filename, (err, data) => {
        if (err)
            throw err;
        return data;
    }));
};
exports.readJSON = readJSON;
//# sourceMappingURL=readJson.js.map