const http = require('http');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.url);

    const handleError = (err) => {
        console.error(err);
        res.writeHead(500);
        res.end('Server Error');
    };

    if (req.url === '/') {
        fs.readFile(path.join(__dirname, '/public', 'index.html'), (err, content) => {
            if (err) {
                handleError(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            }
        });
    } else if (req.url === '/style.css') {
        fs.readFile(path.join(__dirname, '/public', 'style.css'), (err, content) => {
            if (err) {
                handleError(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(content, 'utf-8');
            }
        });
    } else if (req.url === '/script.js') {
        fs.readFile(path.join(__dirname, '/public', 'script.js'), (err, content) => {
            if (err) {
                handleError(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(content, 'utf-8');
            }
        });
    } else if (req.url === '/api') {
        try {
            const uri = "mongodb+srv://kommich:vaishnavi@cluster0.dxtyao6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
            const client = new MongoClient(uri);
            await client.connect();
            console.log('Connected to MongoDB Atlas cluster');

            const phoneCollection = client.db('PhoneZoneData').collection('phones');
            const phoneDetails = await phoneCollection.find().toArray();
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ PhoneDetails: phoneDetails }));
        } catch (err) {
            handleError(err);
        } finally {
            if (client) await client.close();
            console.log('Disconnected from MongoDB Atlas cluster');
        }
    } else {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("<h1> 404 No Data Found</h1>");
    }
});

server.listen(9924, () => console.log('Server running successfully...'));
