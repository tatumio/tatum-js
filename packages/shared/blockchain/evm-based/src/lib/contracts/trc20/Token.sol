// 0.5.1-c8a2
// Enable optimization
pragma solidity ^0.5.0;

import "./ERC20.sol";
import "./ERC20Detailed.sol";

// Contract obtained from https://github.com/zyumingfit/TRC20-Contract-Template

/**
 * @title Tatum Token
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 */
contract Token is ERC20, ERC20Detailed {

    /**
     * @dev Constructor that gives _recipient all of existing tokens.
     */
    constructor (string memory _name, string memory _symbol, uint8 _decimals, address _recipient, uint256 _supply)
    public ERC20Detailed(_name, _symbol, _decimals) {
        _mint(_recipient, _supply * 10 ** uint256(_decimals));
    }
}
