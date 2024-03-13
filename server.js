"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const mime_types_1 = __importDefault(require("mime-types"));
let lookup = mime_types_1.default.lookup;
const port = process.env.PORT || 3000;
const server = http_1.default.createServer((req, res) => {
    let path = req.url;
    if (path == "/" || path === "/home") {
        path = "/index.html";
    }
    let mime_type = lookup(path.substring(1));
    fs_1.default.readFile(__dirname + path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end("Error 404 " + err.message);
            return;
        }
        if (!mime_type) {
            mime_type = "text/plain";
        }
        res.setHeader("X-Content-Type-Option", "nosniff");
        res.writeHead(200, { 'Content-Type': mime_type });
        res.end(data);
    });
});
server.listen(port, () => {
    console.log(`server :${port} /`);
});
//# sourceMappingURL=server.js.map