const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const numeral = require('numeral');
const schedule = require('node-schedule');
const request = require('request');
const Twitter = require('twitter');
const twitter_client = new Twitter({
	consumer_key: 'vdmrnHiiq4GI1DIwauSJHdQkj',
	consumer_secret: 'gFF3C6yWpkcCI5kovk74fFBXa6V2naIYdTdMHZwkQL8bUdtKnb',
	access_token_key: '879561476121411584-2s7EE8JkTngX4K8kzFo0EKiC06fE4Ky',
	access_token_secret: 'YeJRKN9FPJDjbBJM5j5QZSxw73ivCLETJzlqsiwle7wlc'
});

app.listen(port, function () {
    const job = schedule.scheduleJob('*/20 * * * *', function() {
        request.get('https://api.coinmarketcap.com/v1/ticker/ethereum/', function(err, res, body) {
            const json = JSON.parse(body);
            const price = json[0].price_usd;
			const formattedPrice = numeral(price).format('$0,0');
            const tweet_text = '$ETH: ' + formattedPrice + ' USD';
            twitter_client.post('statuses/update', {status: tweet_text}, function(error, tweet, response) {
            	if (!error) console.log(error);
            })
        })
	});
});
