const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const Web3 = require("web3");

const showBalance = async (web3, fromAddress, toAddress) => {
  console.log(
    `From Account balance: ${await web3.eth.getBalance(fromAddress)} Wei`
  );
  console.log(
    `To Account balance: ${await web3.eth.getBalance(toAddress)} Wei`
  );
};

/**
 * Need Options:
 *  --http.api eth,personal
 *  --allow-insecure-unlock
 */
const sendEth = async (web3, fromAddress, toAddress) => {
  const password = fs
    .readFileSync(
      "../../files/node01/password_6ce0ba981dd9b3bc259bbd868be14f957dbe6dcf.txt",
      "utf8"
    )
    .trim();

  const unlock = await web3.eth.personal.unlockAccount(
    fromAddress,
    password,
    30
  );
  if (!unlock) {
    throw new Error("Failed to unlock account.");
  }

  const receipt = await web3.eth.sendTransaction({
    from: fromAddress,
    to: toAddress,
    value: 1000,
    gasPrice: 0,
    gasLimit: 50000,
  });

  console.log("Transaction hash:", receipt.transactionHash);
};

const registerContract = async (web3, fromAddress) => {
  const abi = JSON.parse(
    fs.readFileSync("../contract/output/SingleNumRegister.abi", "utf8")
  );

  const bin = fs
    .readFileSync("../contract/output/SingleNumRegister.bin", "utf8")
    .trim();

  const password = fs
    .readFileSync(
      "../../files/node01/password_6ce0ba981dd9b3bc259bbd868be14f957dbe6dcf.txt",
      "utf8"
    )
    .trim();

  const unlock = await web3.eth.personal.unlockAccount(
    fromAddress,
    password,
    30
  );
  if (!unlock) {
    throw new Error("Failed to unlock account.");
  }

  const contract = new web3.eth.Contract(abi);
  const tx = await contract.deploy({ data: "0x" + bin });

  const deployedContract = await tx.send({
    from: fromAddress,
    gasPrice: "1",
    gas: 1000000000,
  });

  console.log(deployedContract.options.address);
};

const executeContract = async (web3, fromAddress, contractAddress) => {
  const abiJson = fs
    .readFileSync("../contract/output/SingleNumRegister.abi", "utf8")
    .trim();
  const abi = JSON.parse(abiJson);

  const contract = new web3.eth.Contract(abi, contractAddress);
  const receipt = await contract.methods.set(1000).send({
    from: fromAddress,
    gas: 300000,
  });

  console.log(receipt.transactionHash);

  const val = await contract.methods.get().call();
  console.log(val);
};

const main = async (web3) => {
  const argv = yargs(hideBin(process.argv))
    .command("contract", "send eth", (yargs) =>
      yargs.option("contract", {
        alias: "c",
        description: "Contract Account",
        type: "string",
        demandOption: true,
      })
    )
    .parse();

  const fromAddress = "0x6ce0ba981dd9b3bc259bbd868be14f957dbe6dcf";
  const toAddress = "0xa2217dd10357c20ace9b1a7dd71625151cfcf386";

  switch (argv._[0]) {
    case "show":
      await showBalance(web3, fromAddress, toAddress);
      break;
    case "send":
      await sendEth(web3, fromAddress, toAddress);
      break;
    case "register":
      await registerContract(web3, fromAddress);
      break;
    case "contract":
      await executeContract(web3, fromAddress, argv.contract);
      break;
  }
};

main(new Web3("http://localhost:8545"));
