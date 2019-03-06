// Пишем сервер на ноде
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (request, responce) => {
    responce.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Определяем порт на котором будет работать наш сервер
const port = process.env.PORT || '9000';

app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`server running ${port}`));

