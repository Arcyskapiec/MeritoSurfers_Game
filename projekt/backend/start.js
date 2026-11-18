const { createServer } = require('node:http');
const fs = require('fs');
const { Database } = require('node:sqlite');

const db = new Database('players.db');

const hostname = 'localhost';
const port = 80;

const server = createServer((req, res) =>
    {

        let file_name = req.url.substring(1);

        if(req.method == "POST")
        {
            console.log(`[INFO] POST ${file_name}, `);
            processPost(req, res, file_name);
        }

        else if(fs.existsSync(file_name))
        {
            content_type = getContentType(file_name);
            res.statusCode = 200;
            res.setHeader('Content-Type', content_type);
            res.write(fs.readFileSync(file_name));
            console.log(`[INFO] Uploading ${file_name}, ${content_type}`);
        }
        else
        {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            console.log(`[ERROR] Can\'t find file "${file_name}"`);
            res.write(fs.readFileSync('./backend/error_404/index.html'));
        }
        res.end()
    }
);

server.listen(port, hostname, () =>
    {
        console.log(`Server running at http://${hostname}:${port}/`);
        db.exec(`
            create table players
            (   
                id integer primary key autoincrement,
                username text,
                max_points integer
            )`);
    }
);

const getContentType = (file_name) =>
{
    let file_extention = file_name.substring(file_name.indexOf('.')+1);

    switch(file_extention)
    {
        case "html": return "text/html"; break;
        case "ico": 
        case "png": return "image/png"; break;
        case "wav": return "audio/wav"; break;
        case "js": return "text/javascript"; break;
        case "css": return "text/css"; break;
        default: console.log(`[ERROR] undefined content-type: ${file_extention}`); return "text/plain";
    }
}

const processPost = (req, res, url) =>
{
    req_body = "";
    if(url == "post/upload_points")
    {
        req.on("data", data_chunk =>
        {
            req_body += data_chunk;
        });
        
        req.on("end", () =>
        {
            const req_data = JSON.parse(req_body);
            const points = req_data.points;
            savePoints(randUsername(10), points);

        });
        res.statusCode = 200;
    }
    else
    {
        console.log(`[Error] Undefined POST request ${url}`);
        res.statusCode = 404;

    }
}

const savePoints = (username, points) =>
{
    db.exec(`insert into players(username, max_points) values ('${username}', ${points})`);
}

// Source - https://stackoverflow.com/a/1349426
// Posted by csharptest.net, modified by community. See post 'Timeline' for change history
// Retrieved 2026-11-18, License - CC BY-SA 4.0
function randUsername(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

