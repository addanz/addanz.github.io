"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const fs_1 = require("fs");
const fsPromise = fs_1.promises;
async function getData() {
    return await fsPromise.readFile("./data/users.json", "utf-8");
}
exports.getData = getData;
//# sourceMappingURL=users.data.js.map