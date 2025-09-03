//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
* @dev A simple erc20 token built for nnaji stanely interview with a mint, burn, transfer, pause and unpa
unpaused function using openzeppelin smart contract */

contract InterviewToken is ERC20, Pausable, Ownable {
    /**
* @dev Constructor that help to mint interview token to the deployer of the contract 
using openzeppelin erc20 constructor to set the name and symbol of the token and 
mint an inital supply to the deployer
 */
    constructor() ERC20("InterviewToken", "ITK") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    /** 
@dev Function to mint new tokens, only the owner can call this function
@param to The address to which the minted tokens will be sent
@param amount The amount of tokens to be minted
 */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * 10 ** decimals());
    }

    /** 
@dev Function to burn tokens, only the owner can call this function
@param amount The amount of tokens to be burned
 */
    function burn(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount * 10 ** decimals());
    }
    /** 
@dev Function to pause all token transfers, only the owner can call this function
 */
    function pause() public onlyOwner {
        _pause();
    }
    /** 
@dev Function to unpause all token transfers, only the owner can call this function
 */
    function unpause() public onlyOwner {
        _unpause();
    }

    /** 
@dev Override the _beforeTokenTransfer function to include the whenNotPaused modifier
@param from The address from which the tokens are being transferred
@param to The address to which the tokens are being transferred
@param value The value of tokens being transferred
 */

    function _update(
        address from,
        address to,
        uint256 value
    ) internal override whenNotPaused {
        super._update(from, to, value);
    }
}
