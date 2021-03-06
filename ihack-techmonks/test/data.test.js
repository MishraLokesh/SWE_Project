const assert = require('assert');
const ganache = require('ganache-cli'); 
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../build/Factory.json');
const compiledHealthHub = require('../build/HealthHub.json');

const abi1 = compiledFactory.abi;
const bytecode1 = compiledFactory.evm.bytecode.object;

let accounts;
let Factory;
let HealthHubaddress;
let HealthHub;


beforeEach(async () => {  
  accounts = await web3.eth.getAccounts()
  Factory = await new web3.eth.Contract(JSON.parse(JSON.stringify(abi1))).deploy({data: bytecode1}).send({from: accounts[0], gas:'1000000'});

  await Factory.methods.createContract().send({from: accounts[0], gas: '1000000'});
  [HealthHubaddress] = await Factory.methods.getDeployedContracts().call();

  HealthHub = await new web3.eth.Contract(JSON.parse(JSON.stringify(compiledHealthHub.abi)), HealthHubaddress);
});

describe('Health_Hub', () => {
  it('deploys a contract', () => {
    assert.ok(HealthHub.options.address) 
  })
});
