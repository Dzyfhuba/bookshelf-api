var http = require('http'),
    fs = require('fs'),
    port = 3000,
    pathToJSONFile = 'model/Books.json',
    Buffer = require('buffer').Buffer;

http.createServer(function(request, response) {
    if (request.method == 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(fs.readFile(pathToJSONFile, 'utf8'));
        response.end();
    } else if (request.method == 'POST') {
        var body = [];

        request.on('data', function(chunk) {
            body.push(chunk);
        });

        request.on('end', function() {
            body = Buffer.concat(body).toString();
            var myJSONdata = body.split('=')[1];
            fs.writeFileSync(pathToJSONFile, myJSONdata); //default: 'utf8'
        });
    }
}).listen(port);