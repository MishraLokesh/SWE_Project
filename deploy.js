require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const {abi, bytecode} = require('./compile.js');

// console.log(  process.env.mnemonic, `https://rinkeby.infura.io/v3/${process.env.infura_API}` )


let provider = new HDWalletProvider(
  process.env.mnemonic, `https://rinkeby.infura.io/v3/${process.env.infura_API}`
);

const web3 = new Web3(provider)

const deploy = async () => {
  try {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);
  const results = await new web3.eth.Contract(JSON.parse(JSON.stringify(abi)))
     .deploy({data: '0x' + bytecode, arguments: ['Hi there!']}) // add 0x bytecode
     .send({from: accounts[0], gas:'100000000'});
  console.log("contract deployed to address: ", results.options.address[0]);
  }
  catch(error) {
    console.error('error: ', error);
  }
};

deploy();


