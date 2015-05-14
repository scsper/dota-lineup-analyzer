var app = require('./server/app.js'),
    DEFAULT_PORT = 3000;

app.listen(DEFAULT_PORT, function() {
    console.log('listening for connection on port ' + DEFAULT_PORT);
});
