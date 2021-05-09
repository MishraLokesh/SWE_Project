const assert = require('assert');
const ganache = require('ganache-cli');  //all test networks 
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {abi, bytecode} = require('../compile.js');

// console.log(abi)
// console.log(bytecode)

let accounts;
let inbox;
// let message;

beforeEach(async () => {
  // web3.eth.getAccounts().then(fetchedAccounts => {console.log(fetchedAccounts);
  
  accounts = await web3.eth.getAccounts()
  inbox = await new web3.eth.Contract(JSON.parse(JSON.stringify(abi))).deploy({data: bytecode, arguments: ['Hii there!!']}).send({from: accounts[0], gas:'1000000'});
  console.log(inbox);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address)  //if an address exists, then it's deployed (is this(inbox.options.address) a defined value ?)
    // console.log(inbox);
  });

  it('has a default messgae', async () => {
    const message = await inbox.methods.message().call(); //.messgae('here we can pass any arguments if that function requires some (check in the sol file)') 
    assert.strictEqual(message, 'Hii there!!');
  })
  
  it('can change the message', async () => {
    await inbox.methods.setMeassage('Byee!').send({from: accounts[0]});  //we get back anytime when we send a transaction to a function, as we get back a  hash of the transaction, so we do not assign it to something as if it goes wrong, it will automatically throw an error here
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, 'Byee!');
  })
});

