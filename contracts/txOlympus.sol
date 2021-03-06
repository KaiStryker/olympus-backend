//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {IERC20, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable, Context} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC2771Context} from "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract txOlympus is Ownable, ERC2771Context {
    using SafeERC20 for IERC20;

    uint256 public vandalizeFee;
    uint256 public upgradeFee;

    IERC20 public OLYToken;

    event VandalizeFeePaid(address user, uint256 vandalizeFee);
    event UpgradeFeePaid(address user, uint256 upgradeFee);
    event TokensClaimed(address recipient, uint256 amount);

    constructor(
        uint256 _vandalizeFee,
        uint256 _upgradeFee,
        address forwarder
    ) 
        ERC2771Context(forwarder)
    {
        vandalizeFee = _vandalizeFee;
        upgradeFee = _upgradeFee; 
    }

    function vandalize() external{
        _transferFunds(vandalizeFee);
        emit VandalizeFeePaid(_msgSender(), vandalizeFee);
    }

    function upgrade() external{
        _transferFunds(upgradeFee);
        emit UpgradeFeePaid(_msgSender(), upgradeFee);
    }

    function claim(address recipient, uint256 amount) external {
        OLYToken.safeTransfer(recipient, amount);
        emit TokensClaimed(recipient, amount);
    }

    function _transferFunds(uint256 amount) internal {
        OLYToken.safeTransferFrom(_msgSender(), address(this), amount);
    }

    function setOLYToken(IERC20 _OLYToken) external onlyOwner {
        OLYToken = _OLYToken;
    }

    function _msgSender() internal view virtual override(Context, ERC2771Context) returns (address sender) {
        if (isTrustedForwarder(msg.sender)) {
            // The assembly code is more direct than the Solidity version using `abi.decode`.
            /// @solidity memory-safe-assembly
            assembly {
                sender := shr(96, calldataload(sub(calldatasize(), 20)))
            }
        } else {
            return super._msgSender();
        }
    }

    function _msgData() internal view virtual override(Context, ERC2771Context) returns (bytes calldata) {
        if (isTrustedForwarder(msg.sender)) {
            return msg.data[:msg.data.length - 20];
        } else {
            return super._msgData();
        }
    }
}
