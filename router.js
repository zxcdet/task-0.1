const fs = require( 'node:fs');
const path = require('path');


  function router(req, res) {
    if (req.url === '/api/data') {
        res.end(JSON.stringify({name: 'data'}));
        return;
    }
    if (req.url === '/api/second-route') {
        fs.readFile(path.join(__dirname, 'static', 'pages', 'second.html'), (err, data) => {
            if (err) throw err;
            res.end(data);
        });
    }
    if (req.url === '/api/open-file1') {
        fs.readFile(path.join(__dirname, 'static', 'text', 'main.txt'), (err, data) => {
            if (err) throw err;
            res.end(data);
        });
    }

    if (req.url === '/api/open-file2') {
        fs.readFile(path.join(__dirname, 'static', 'json',  'data.json'), (err, data) => {
            if (err) throw err;
            res.end(data);
        });
    }
}
module.exports = router;