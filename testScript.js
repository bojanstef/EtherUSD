const numeral = require('numeral');
const price = "555505.521";
const formattedPrice = numeral(price).format('$0,0');
console.log(`$ETH: ${formattedPrice} USD`);
