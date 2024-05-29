const http = require('node:http');
const fs = require( 'node:fs');
const path = require('path');
const mime = require('mime-types');
const router = require('./router.js')


 const server = http.createServer((req, res) => {
     try {
         if (req.url.startsWith('/api')) {
             router(req, res);
             return;
         }
         if (req.url !== '/') {
             if (!mime.lookup(req.url)) {
                 return    fs.readFile(path.join(__dirname, 'static', 'pages', 'error.html'), (err, data) => {
                     if (err) throw err;
                     res.end(data);
                 });
             }
             res.setHeader('Content-type', mime.lookup(req.url));
             fs.createReadStream(path.join(__dirname, 'static', req.url)).pipe(res)
         }
         fs.readFile(path.join(__dirname, 'static', 'pages', 'index.html'), (err, data) => {
             if (err) throw err;
             res.end(data);
         });
     } catch (err)  {
         res.writeHead(500, {'Content-Type': 'text/plain'});
         res.end('Server error');
     }
 });

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
