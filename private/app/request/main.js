const Web3 = require('web3');

const nodeUrl = 'http://localhost:8545';

const web3 = new Web3(nodeUrl);

const main = async() => {
  const accountAddress = '0x6ce0ba981dd9b3bc259bbd868be14f957dbe6dcf'
  const balance = await web3.eth.getBalance(accountAddress);
  console.log(`Account balance: ${balance} Wei`);
}

main()
