"use strict";

import http from 'http';
import fs from 'fs';
import mime from 'mime-types';

let lookup = mime.lookup;

const port = process.env.PORT || 3000;

const server = http.createServer((req,res)=>{
    let path =req.url as string;
    if (path == "/" || path === "/home"){
        path = "/index.html";
    }

    let mime_type = lookup(path.substring(1));

    fs.readFile(__dirname + path, function (err, data){
    if(err){
        res.writeHead(404);
        res.end("Error 404 "+ err.message)
        return
    }
    if(!mime_type){
        mime_type ="text/plain";

    }

    res.setHeader("X-Content-Type-Option", "nosniff");
    res.writeHead(200, {'Content-Type' : mime_type})
        res.end(data);
    });
});


server.listen(port, () =>{
    console.log(`server :${port} /`)

});
