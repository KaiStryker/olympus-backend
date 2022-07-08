//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {IERC20, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";


contract txOlympus is Ownable {
    using SafeERC20 for IERC20;

    uint256 public vandalizeFee;
    uint256 public upgradeFee;

    IERC20 public OLYToken;

    event VandalizeFeePaid(address user, uint256 vandalizeFee);
    event UpgradeFeePaid(address user, uint256 upgradeFee);
    event TokensClaimed(address recipient, uint256 amount);

    constructor(uint256 _vandalizeFee, uint256 _upgradeFee) {
        vandalizeFee = _vandalizeFee;
        upgradeFee = _upgradeFee; 
    }

    function vandalize() external{
        _transferFunds(vandalizeFee);
        emit VandalizeFeePaid(msg.sender, vandalizeFee);
    }

    function upgrade() external{
        _transferFunds(upgradeFee);
        emit UpgradeFeePaid(msg.sender, upgradeFee);
    }

    function claim(address recipient, uint256 amount) external {
        OLYToken.safeTransfer(recipient, amount);
        emit TokensClaimed(recipient, amount);
    }

    function _transferFunds(uint256 amount) internal {
        OLYToken.safeTransferFrom(msg.sender, address(this), amount);
    }

    function setOLYToken(IERC20 _OLYToken) external onlyOwner {
        OLYToken = _OLYToken;
    }
}
