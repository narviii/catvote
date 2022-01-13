// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract CatVote {
    mapping (address => bool) public votes;
    mapping (address => bool) public isVoted;
    uint public voteCount = 0;
    event voteCasted (bool vote, address addr);

    constructor () {

    }

    function recordVote( bool _vote ) public {
        require(isVoted[msg.sender] != true, "You already voted!");
        isVoted[msg.sender] = true;
        voteCount++;
        votes[msg.sender] = _vote;
        emit voteCasted(_vote,msg.sender);
    }

}