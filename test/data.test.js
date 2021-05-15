const assert = require('assert');
const ganache = require('ganache-cli'); 
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {abi, bytecode} = require('../compile.js');

console.log(abi)
console.log(bytecode)

let accounts;
let Health_Hub;
// let message;


beforeEach(async () => {
  // web3.eth.getAccounts().then(fetchedAccounts => {console.log(fetchedAccounts);
  
  accounts = await web3.eth.getAccounts()
  Health_Hub = await new web3.eth.Contract(JSON.parse(JSON.stringify(abi))).deploy({data: bytecode}).send({from: accounts[0], gas:'1000000'});

});

describe('Health_Hub', () => {
  it('deploys a contract', () => {
    assert.ok(Health_Hub.options.address)  //if an address exists, then it's deployed (is this(inbox.options.address) a defined value ?)
    console.log(Health_Hub.options.address);
  })
});

