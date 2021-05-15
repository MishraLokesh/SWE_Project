const path = require('path');
const fs = require('fs');
const solc = require('solc');

const Contractpath = path.resolve(__dirname, 'Contracts', 'Health_Hub.sol');
const source = fs.readFileSync(Contractpath, 'UTF-8');

var input = {
    language: 'Solidity',
    sources: {
        'Health_Hub.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

// module.exports = output.contracts;

const abi = output.contracts['Health_Hub.sol']['Health_Hub'].abi;
const bytecode = output.contracts['Health_Hub.sol']['Health_Hub'].evm.bytecode.object;
module.exports = {abi, bytecode}

// console.log(output.contracts['Lottery.sol']['Lottery'].abi)
// console.log(output.contracts['Lottery.sol']['Lottery'].evm.bytecode.object)

