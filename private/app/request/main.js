const fs = require('fs');
const Web3 = require('web3');

/**
 * Need Options:
 *  --http.api eth,personal
 *  --allow-insecure-unlock
 */
const main = async(web3) => {
  const fromAddress = '0x6ce0ba981dd9b3bc259bbd868be14f957dbe6dcf';
  const toAddress = '0xa2217dd10357c20ace9b1a7dd71625151cfcf386';

  const password = fs.readFileSync('../../files/node01/password_6ce0ba981dd9b3bc259bbd868be14f957dbe6dcf.txt', 'utf8').trim();

  console.log(`From Account balance: ${await web3.eth.getBalance(fromAddress)} Wei`);
  console.log(`To Account balance: ${await web3.eth.getBalance(toAddress)} Wei`);

  const unlock = await web3.eth.personal.unlockAccount(fromAddress, password, 30)
  if (!unlock) {
    throw new Error('Failed to unlock account.');
  }

  const receipt = await web3.eth.sendTransaction({
    chain: 1,
    from: fromAddress,
    to: toAddress,
    value: 1000,
    gasPrice: 0,
    gasLimit: 50000,
  });

  console.log('Transaction hash:', receipt.transactionHash);

  console.log(`From Account balance: ${await web3.eth.getBalance(fromAddress)} Wei`);
  console.log(`To Account balance: ${await web3.eth.getBalance(toAddress)} Wei`);
}

main(new Web3('http://localhost:8545'))
