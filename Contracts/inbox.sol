// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Inbox{
    string public message;
    
    constructor(string memory initialMessage) {
        message = initialMessage;
    }
    function setMeassage(string memory newMEssage) public {
        message = newMEssage;
    }
}

