/* const fs = require('fs');
const express = require('express');
const { URL } = require('url');

const app = express();

const todoDir = './todo';
const shopDir = './shop';

fs.readdir(todoDir, (err, content) => {
    if (err) {
        fs.mkdir(todoDir, (err) => {
            if (err) throw err;
        })
    }
});

fs.readdir(shopDir, (err, content) => {
    if (err) {
        fs.mkdir(shopDir, (err) => {
            if (err) throw err;
        })
    }
});

const todoFile = './todo/todo.json';
const shopFile = './shop/shop.json';

// Helper Functions
function loadInitializeList(file, cb) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(data));
        }
    });
}

function storeList(file, list) {
    fs.writeFile(file, JSON.stringify(list), (err) => {
        if (err) throw err;
    })
}

// Handlers
const POSTHandler = (file, newItem, cb) => {
    loadInitializeList(file, (list) => {
        list.push(newItem);
        storeList(file, list);
        cb(200, 'OK\n');
    });
}

// Serve index.html when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.json());
//In POST
// In your POST route handlers for /todo and /shop
app.post('/todo', (req, res) => {
    const newItem = {
        item: req.body.item,
        priority: req.body.priority,
        category: req.body.category
    };
    POSTHandler(todoFile, newItem, (statusCode, response) => {
        res.setHeader('Content-Type', 'text/plain; charset="utf8"');
        res.status(statusCode).end(response);
    });
});

app.post('/shop', (req, res) => {
    const newItem = {
        item: req.body.item,
        priority: req.body.priority,
        category: req.body.category
    };
    POSTHandler(shopFile, newItem, (statusCode, response) => {
        res.setHeader('Content-Type', 'text/plain; charset="utf8"');
        res.status(statusCode).end(response);
    });
});
//In GET
app.get('/todo', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let stream = fs.createReadStream(todoFile);
    stream.on('error', (err) => {
        res.status(500);
        if (err.code === 'ENOENT') {
            res.end('file not found');
        } else {
            res.end('Internal Server error');
        }
    });
    res.status(200);
    stream.pipe(res);
});

app.get('/shop', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let stream = fs.createReadStream(shopFile);
    stream.on('error', (err) => {
        res.status(500);
        if (err.code === 'ENOENT') {
            res.end('file not found');
        } else {
            res.end('Internal Server error');
        }
    });
    res.status(200);
    stream.pipe(res);
});

//In DELETE
app.delete('/todo', (req, res) => {
    res.end('In DELETE - todo');
});

app.delete('/shop', (req, res) => {
    res.end('In DELETE - shop');
});

app.put('/todo', (req, res) => {
    res.end('In PUT - todo');
});

app.put('/shop', (req, res) => {
    res.end('In PUT - shop');
});

const PORT = process.env.PORT || 3033;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});

*/

const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

const todoDir = './todo';
const shopDir = './shop';

// Middleware setup
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure todo and shop directories exist
fs.mkdirSync(todoDir, { recursive: true }, (err) => {
    if (err) throw err;
});

fs.mkdirSync(shopDir, { recursive: true }, (err) => {
    if (err) throw err;
});

const todoFile = './todo/todo.json';
const shopFile = './shop/shop.json';

// Helper Functions
function loadInitializeList(file, cb) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(data));
        }
    });
}

function storeList(file, list) {
    fs.writeFile(file, JSON.stringify(list), (err) => {
        if (err) throw err;
    });
}

// Handlers
const POSTHandler = (file, newItem, cb) => {
    loadInitializeList(file, (list) => {
        list.push(newItem);
        storeList(file, list);
        cb(200, 'OK\n');
    });
};

// Serve index.html when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'TSList', 'public', 'index.html'));
});

// POST route handlers for /todo and /shop
app.post('/todo', (req, res) => {
    const newItem = {
        text: req.query.text || '',
        priority: req.query.priority || '',
        category: req.query.category || ''
    };
    POSTHandler(todoFile, newItem, (statusCode, response) => {
        res.setHeader('Content-Type', 'text/plain; charset="utf8"');
        res.status(statusCode).end(response);
    });
});

app.post('/shop', (req, res) => {
    const newItem = {
        text: req.query.text || '',
        priority: req.query.priority || '',
        category: req.query.category || ''
    };
    POSTHandler(shopFile, newItem, (statusCode, response) => {
        res.setHeader('Content-Type', 'text/plain; charset="utf8"');
        res.status(statusCode).end(response);
    });
});

// GET route handlers for /todo and /shop
app.get('/todo', (req, res) => {
    loadInitializeList(todoFile, (list) => {
        res.status(200).json(list);
    });
});

app.get('/shop', (req, res) => {
    loadInitializeList(shopFile, (list) => {
        res.status(200).json(list);
    });
});

// GET route handlers for /todo and /shop
app.get('/todo', (req, res) => {
    loadInitializeList(todoFile, (list) => {
        res.status(200).json(list);
    });
});

app.get('/shop', (req, res) => {
    loadInitializeList(shopFile, (list) => {
        res.status(200).json(list);
    });
});

// DELETE and PUT route handlers
app.delete('/todo', (req, res) => {
    res.end('In DELETE - todo');
});

app.delete('/shop', (req, res) => {
    res.end('In DELETE - shop');
});

app.put('/todo', (req, res) => {
    res.end('In PUT - todo');
});

app.put('/shop', (req, res) => {
    res.end('In PUT - shop');
});

const PORT = process.env.PORT || 3033;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});