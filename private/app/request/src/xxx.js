const Web3 = require('web3');
const web3 = new Web3('http://localhost:8551');

web3.eth.getBlock('latest', function(error, result) {
  if (!error) {
    const txs = result.transactions;
    console.log(txs);
  } else {
    console.error(error);
  }
});
