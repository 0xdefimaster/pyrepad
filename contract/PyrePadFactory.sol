// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./PyrePadToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PyrePadFactory
 * @dev Factory contract for creating new burn-to-launch tokens
 */
contract PyrePadFactory is Ownable {
    // Platform fee (0.1%)
    uint256 public constant PLATFORM_FEE = 1000000000000000; // 0.001 ETH
    
    // All deployed tokens
    address[] public allTokens;
    mapping(address => bool) public isToken;
    
    // User's tokens
    mapping(address => address[]) public userTokens;
    
    // Events
    event TokenCreated(
        address indexed token,
        address indexed creator,
        string name,
        string symbol,
        uint256 totalSupply,
        uint256 timestamp
    );
    
    /**
     * @dev Create a new token
     */
    function createToken(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint256 burnThresholdPercent,
        uint256 vestingDays,
        address devWallet,
        string memory description,
        string memory imageUrl,
        string memory twitter,
        string memory telegram,
        string memory website
    ) external payable returns (address) {
        require(msg.value >= PLATFORM_FEE, "Insufficient fee");
        require(bytes(name).length > 0, "Name required");
        require(bytes(symbol).length > 0, "Symbol required");
        require(totalSupply > 0, "Supply must be > 0");
        
        // Deploy new token
        PyrePadToken newToken = new PyrePadToken(
            name,
            symbol,
            totalSupply,
            burnThresholdPercent,
            vestingDays,
            devWallet,
            description,
            imageUrl,
            twitter,
            telegram,
            website
        );
        
        address tokenAddress = address(newToken);
        
        // Store token
        allTokens.push(tokenAddress);
        isToken[tokenAddress] = true;
        userTokens[msg.sender].push(tokenAddress);
        
        emit TokenCreated(
            tokenAddress,
            msg.sender,
            name,
            symbol,
            totalSupply,
            block.timestamp
        );
        
        return tokenAddress;
    }
    
    /**
     * @dev Get all tokens
     */
    function getAllTokens() external view returns (address[] memory) {
        return allTokens;
    }
    
    /**
     * @dev Get user's tokens
     */
    function getUserTokens(address user) external view returns (address[] memory) {
        return userTokens[user];
    }
    
    /**
     * @dev Get total token count
     */
    function getTokenCount() external view returns (uint256) {
        return allTokens.length;
    }
    
    /**
     * @dev Withdraw platform fees
     */
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Transfer failed");
    }
    
    /**
     * @dev Update platform fee
     */
    function updatePlatformFee(uint256 newFee) external onlyOwner {
        // Platform fee is constant for security, but kept function for future upgrades
        revert("Fee is constant");
    }
}
