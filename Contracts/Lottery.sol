// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Lottery {
    address public manager;
    address[] public players;  //dynamic array
    address payable winner;
    
    constructor () {
        manager = msg.sender;
    }
    
    function getPlayers() public view returns(address[] memory) {
        return players;
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;   //the entire code of the function will be placed here in place of _
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        
        players.push(msg.sender);
    }
    
    function random() private view returns(uint256) {
        return uint( keccak256(abi.encodePacked(block.difficulty, block.timestamp, players))); 
        //sha3() keccak256() are are global functions, no need to import them
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        winner = payable(players[index]);
        winner.transfer(address(this).balance);   //this refers to the current contract and this.balance is the total balance of this contract
        players = new address[](0); //this (0) means create a new array but of size 0, if we give like 5, then it will create the array with 5 initial addresses like [0x000,0x000,0x000,0x000,0x000]
    }

}

