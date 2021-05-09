const assert = require('assert');
const ganache = require('ganache-cli');  //all local test networks automatically boots up
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {abi, bytecode} = require('../compile.js');

// console.log(abi)
// console.log(bytecode)

let accounts;
let lottery;
// let message;

beforeEach(async () => {
  // web3.eth.getAccounts().then(fetchedAccounts => {console.log(fetchedAccounts);
  
  accounts = await web3.eth.getAccounts()
  lottery = await new web3.eth.Contract(JSON.parse(JSON.stringify(abi))).deploy({data: bytecode}).send({from: accounts[0], gas:'1000000'});

});

describe('Lottery Contract', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address)  //if an address exists, then it's deployed (is this(inbox.options.address) a defined value ?)
    // console.log(inbox);
  })

  it('allows one account to enter', async () => {
    await lottery.methods.enter().send({from: accounts[0], value: web3.utils.toWei('0.02', 'ether')}); //.messgae('here we can pass any arguments if that function requires some (check in the sol file)') 
    const players = await lottery.methods.getPlayers().call({from: accounts[0]});
    assert.strictEqual(accounts[0], players[0]);
    assert.strictEqual(1, players.length);
  })

  it('allows multiple account to enter', async () => {
    await lottery.methods.enter().send({from: accounts[0], value: web3.utils.toWei('0.02', 'ether')}); //.messgae('here we can pass any arguments if that function requires some (check in the sol file)') 
    await lottery.methods.enter().send({from: accounts[1], value: web3.utils.toWei('0.02', 'ether')}); //.messgae('here we can pass any arguments if that function requires some (check in the sol file)') 
    await lottery.methods.enter().send({from: accounts[2], value: web3.utils.toWei('0.02', 'ether')}); //.messgae('here we can pass any arguments if that function requires some (check in the sol file)') 
    
    const players = await lottery.methods.getPlayers().call({from: accounts[0]});
    assert.strictEqual(accounts[0], players[0]);
    assert.strictEqual(accounts[1], players[1]);
    assert.strictEqual(accounts[2], players[2]);

    assert.strictEqual(3, players.length);
  })
  
  it('allows minimum amount of ether', async () => {
    try{
      await lottery.methods.enter().send({from: accounts[0], value: web3.utils.toWei('0', 'ether')}); //.messgae('here we can pass any arguments if that function requires some (check in the sol file)') 
      assert(false);
    }
    catch(error) {
      assert(error);
    }
  })

  it('sends money to the winner', async () => {
    await lottery.methods.enter().send({from: accounts[0], value: web3.utils.toWei('2', 'ether')}); //.messgae('here we can pass any arguments if that function requires some (check in the sol file)') 
    const initialBalance = await web3.eth.getBalance(accounts[0])

    await lottery.methods.pickWinner().send({from: accounts[0]});
    const finalBalance = await web3.eth.getBalance(accounts[0])
    const difference = finalBalance - initialBalance;
    // console.log(difference) // 2 - difference will be the amount spent on gas
    assert( difference > web3.utils.toWei('1.8', 'ether'))   //as some amout is spent in gas therefore 1.8
  })

  it('players array gets emptied out', async () => {
    await lottery.methods.enter().send({from: accounts[0], value: web3.utils.toWei('2', 'ether')}); //.messgae('here we can pass any arguments if that function requires some (check in the sol file)') 
    await lottery.methods.enter().send({from: accounts[1], value: web3.utils.toWei('2', 'ether')}); //.messgae('here we can pass any arguments if that function requires some (check in the sol file)') 
    await lottery.methods.enter().send({from: accounts[2], value: web3.utils.toWei('2', 'ether')}); //.messgae('here we can pass any arguments if that function requires some (check in the sol file)') 
  
    await lottery.methods.pickWinner().send({from: accounts[0]});
    const players = await lottery.methods.getPlayers().call({from: accounts[0]});
    assert(1, players.length)   //as some amout is spent in gas therefore 1.8
  })
});

