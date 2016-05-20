require('dotenv').config();

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twitter = require('node-tweet-stream');

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendfile('index.html');
});

app.get('/mapbox', function(req, res) {
    res.json({ access_token: process.env.MAPBOX_ACCESS_TOKEN });
});

var maxTweetBufferLength = process.env.MAX_TWEET_BUFFER_LENGTH || 250;
var tweetBufferSpeed = process.env.TWEET_BUFFER_SPEED || 300;

var buffer = [];

io.on('connection', function(socket){
    console.log('a user connected');
    io.emit('chat', { message: "welcome" });

    // emit last 100 tweets
    buffer.forEach(function(tweet, index) {
        setTimeout(function() {
            io.emit('tweet', tweet);
        }, index * tweetBufferSpeed);
    });
});

var port = process.env.PORT || 3000;
http.listen(port, function(){
    console.log('listening on *:'+port);
});

var t = new Twitter({
    consumer_key:       process.env.TW_CONSUMER_KEY,
    consumer_secret:    process.env.TW_CONSUMER_SECRET,
    token:              process.env.TW_TOKEN,
    token_secret:       process.env.TW_SECRET
});


t.on('tweet', function (tweet) {
    if(tweet.coordinates || tweet.geo) {
        console.log(JSON.stringify(tweet));
        io.emit('tweet', tweet);

        buffer.push(tweet);
        if(buffer.length > maxTweetBufferLength) {
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

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

function createRandomTweet() {
    return {
        text: "Hello",
        user: {
            screen_name: "bello"
        },
        geo: {
            coordinates: [
                getRandomInRange(-90, 90, 6),
                getRandomInRange(-180, 180, 6)
            ]
        }
    };
}
