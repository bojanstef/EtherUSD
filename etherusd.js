const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const numeral = require('numeral');
const schedule = require('node-schedule');
const request = require('request');
const Twitter = require('twitter');
const twitter_client = new Twitter({
	consumer_key: 'wsb1tZGo2NXLth2AMEW4bF1gg',
	consumer_secret: 'LlbQ6BVmlvfB0EYjX3xqRhwgIXzZxZMeC7G1VGTK8OEnYWq4Uk',
	access_token_key: '879561476121411584-7TmVIL7QsrksXke1KwwN4hQAcKcZHBB',
	access_token_secret: '4oteM7QdydFaEbvcw8vGz1XZqk4cTkrK2sztI0Dbg8wvn'
});

/*const stream = twitter_client.stream('statuses/filter', {track:'ethereum, vitalik'});
stream.on('data', (event) => {
    twitter_client.post('favorites/create', {id:event.id_str}, (error, response) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Like tweet with ID: ${response.id_str} - ${response.text}`);
        }
    });
});
stream.on("error", error => console.error(error));*/

app.listen(port, function () {
    const job = schedule.scheduleJob('*/20 * * * *', function() {
        request.get('https://api.coinmarketcap.com/v1/ticker/ethereum/', function(err, res, body) {
            const json = JSON.parse(body);
            const price = json[0].price_usd;
			const formattedPrice = numeral(price).format('$0,0');
            const tweet_text = '$ETH: ' + formattedPrice + ' USD';
            twitter_client.post('statuses/update', {status: tweet_text}, function(error, tweet, response) {
            	if (error) console.log(error);
            })
        })
    });
});
