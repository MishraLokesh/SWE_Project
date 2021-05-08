const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxpath = path.resolve(__dirname, 'Contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxpath, 'UTF-8');

var input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
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

const abi = output.contracts['Inbox.sol']['Inbox'].abi;
const bytecode = output.contracts['Inbox.sol']['Inbox'].evm.bytecode.object;
module.exports = {abi, bytecode}

// console.log(output.contracts['Inbox.sol']['Inbox'].abi)
// console.log(output.contracts['Inbox.sol']['Inbox'].evm.bytecode.object)
