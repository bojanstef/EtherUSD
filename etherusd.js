const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const schedule = require('node-schedule');

const Coinbase = require('coinbase').Client;
const coinbase_client = new Coinbase({
	'apiKey': 'YPa0WtPxisDx6ScT',
	'apiSecret': 'hlpnSYpvlrOMyNoZkNe6ryG9kNk4WdsA'
});

const Twitter = require('twitter');
const twitter_client = new Twitter({
	consumer_key: 'vdmrnHiiq4GI1DIwauSJHdQkj',
	consumer_secret: 'gFF3C6yWpkcCI5kovk74fFBXa6V2naIYdTdMHZwkQL8bUdtKnb',
	access_token_key: '879561476121411584-2s7EE8JkTngX4K8kzFo0EKiC06fE4Ky',
	access_token_secret: 'YeJRKN9FPJDjbBJM5j5QZSxw73ivCLETJzlqsiwle7wlc'
});

app.get('/', function (req, res) {
	const job = schedule.scheduleJob('*/1 * * * *', function() {
		coinbase_client.getExchangeRates({'currency': 'ETH'}, function(err, rates) {
			const exchange = rates['data']['rates']['USD'];
			const tweet_text = "ETH: $" + exchange;

			twitter_client.post('statuses/update', {status: tweet_text}, function(error, tweet, response) {
		  		if (!error) console.log();
			});
		});
	});
});

app.listen(port, function () {
  console.log('EtherUSD listening on port 3000!');
});

