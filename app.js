var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twitter = require('node-tweet-stream')

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendfile('index.html');
});

var buffer = [];

io.on('connection', function(socket){
    console.log('a user connected');
    io.emit('chat', { message: "welcome" });

    // emit last 100 tweets
    buffer.forEach(function(tweet, index) {
        setTimeout(function() {
            io.emit('tweet', tweet);
        }, index * 1000);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});


var t = new Twitter({
    consumer_key: 'DVJ7d5Hj2rQiGXzdkOTo4290c',
    consumer_secret: 'JYwXWoyGsfAQKUKGNEYWKTveqxCUZ14yje404KZy4MS8642gbh',
    token: '227471111-wgIRXCQR8hJBUGMqY60ekQFLKXPnjhJC8RrKQu6q',
    token_secret: 'vrV5e7dBAjhB00B9da8Z3bnGfH3GEKbo7YwFyCrLOUs31'
});


t.on('tweet', function (tweet) {
    if(tweet.coordinates || tweet.geo) {
        console.log(JSON.stringify(tweet));
        io.emit('tweet', tweet);

        buffer.push(tweet);
        if(buffer.length > 100) {
            buffer.splice(0, 1);
        }
    }
});

t.on('error', function (err) {
    console.log('Oh no')
});

t.track('goodmorning');
t.track('morning');
t.track('bonjour');
t.track('bom dia');
t.track('bomdia');
t.track('Доброе утро');
t.track('Buenos dias');
t.track('Buenosdias');
t.track('おはようございます');
t.track('ohayoo gozaimasu');
t.track('ohayoogozaimasu');
t.track('Guten Morgen');
t.track('GutenMorgen');
t.track('Dzień Dobry');
t.track('DzieńDobry');
t.track('Jó reggelt');
t.track('Jóreggelt');
t.track('Goedemorgen');
t.track('Bună dimineaţa');
t.track('Bunădimineaţa');
t.track('Gunaydin');
t.track('God morgon');
t.track('Godmorgon');
t.track('God morgen');
t.track('Godmorgen');
t.track('Buongiorno');
t.track('Huomenta');
t.track('Dobré ráno');
t.track('Dobréráno');
t.track('בוקר טוב');
t.track('בוקרטוב');
t.track('صباح الخير');
t.track('صباحالخير');
t.track('Καλή μέρα');
t.track('Καλήμέρα');
t.track('Bon dia');
t.track('Bondia');
t.track('Добро јутро');
t.track('Добројутро');
t.track('namastē');
t.track('नमस्ते');
t.track('สวัสดีครับ');
t.track('Chào');
t.track('Goeie môre');
t.track('Goeiemôre');
t.track('Góðan morgun');
t.track('Góðanmorgun');
t.track('selamat pagi');
t.track('selamatpagi');
t.track('Magandang umaga');
t.track('Magandangumaga');
t.track('早上好');
t.track('Miremengjes');