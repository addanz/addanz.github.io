"use strict";

import {promises} from 'fs';
const fsPromise = promises;

export async function getData() {
    return await fsPromise.readFile("./data/users.json", "utf-8");
}

