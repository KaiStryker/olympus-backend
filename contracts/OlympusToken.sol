//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract OlympusToken is Ownable, ERC20{

    constructor(address txContract) ERC20("OLYMPUS", "OLY"){
        _mint(txContract, 1000000000000000000000000000000000000);
    }

    function mint(address recipient, uint256 amount) external onlyOwner {
        _mint(recipient, amount);
    }
}
