"use strict";

import http from 'http';
import fs from 'fs';
import mime from 'mime-types';

let lookup = mime.lookup;

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    let path = req.url as string;

    if (path === "/" || path === "/home") {
        path = "/index.html";
    }

    let mime_type = lookup(path.substring(1));

    fs.readFile(__dirname + path, function (err, data) {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end("Error 404 - File Not Found");
            } else {
                res.writeHead(500);
                res.end("Error 500 - Internal Server Error");
                console.error("File read error:", err);
            }
        } else {
            if (!mime_type) {
                mime_type = "text/plain";
            }

            res.setHeader('X-Content-Type-Options', "nosniff");
            res.writeHead(200, {'Content-Type': mime_type});
            res.end(data);
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
