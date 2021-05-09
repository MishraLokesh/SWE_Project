const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotterypath = path.resolve(__dirname, 'Contracts', 'Lottery.sol');
const source = fs.readFileSync(lotterypath, 'UTF-8');

var input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol' : {
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

const abi = output.contracts['Lottery.sol']['Lottery'].abi;
const bytecode = output.contracts['Lottery.sol']['Lottery'].evm.bytecode.object;
module.exports = {abi, bytecode}

// console.log(output.contracts['Lottery.sol']['Lottery'].abi)
// console.log(output.contracts['Lottery.sol']['Lottery'].evm.bytecode.object)
