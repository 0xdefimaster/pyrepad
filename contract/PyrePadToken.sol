// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title PyrePadToken
 * @dev Burn-to-launch token with automatic LP creation and vesting
 */
contract PyrePadToken is ERC20, Ownable, ReentrancyGuard {
    // Token configuration
    uint256 public immutable TOTAL_SUPPLY;
    uint256 public immutable DEV_ALLOCATION; // 3%
    uint256 public immutable BURNABLE_SUPPLY; // 97%
    uint256 public immutable BURN_THRESHOLD; // Configurable %
    uint256 public immutable VESTING_DURATION;
    
    // State variables
    uint256 public totalBurned;
    uint256 public vestingStartTime;
    uint256 public devTokensClaimed;
    bool public tradingEnabled;
    bool public lpCreated;
    
    // Addresses
    address public devWallet;
    address public liquidityPool;
    
    // Metadata
    string public projectDescription;
    string public imageUrl;
    string public twitter;
    string public telegram;
    string public website;
    
    // Events
    event TokensBurned(address indexed burner, uint256 amount, uint256 totalBurned);
    event TradingEnabled(uint256 timestamp);
    event LiquidityPoolCreated(address indexed pool, uint256 liquidity);
    event DevTokensClaimed(address indexed dev, uint256 amount);
    
    // Modifiers
    modifier whenTradingEnabled() {
        require(tradingEnabled || msg.sender == owner() || msg.sender == devWallet, "Trading not enabled yet");
        _;
    }
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint256 burnThresholdPercent, // 30-90
        uint256 vestingDays,
        address _devWallet,
        string memory _description,
        string memory _imageUrl,
        string memory _twitter,
        string memory _telegram,
        string memory _website
    ) ERC20(name, symbol) {
        require(burnThresholdPercent >= 30 && burnThresholdPercent <= 90, "Invalid threshold");
        require(vestingDays >= 30 && vestingDays <= 180, "Invalid vesting");
        require(_devWallet != address(0), "Invalid dev wallet");
        
        TOTAL_SUPPLY = totalSupply;
        DEV_ALLOCATION = (totalSupply * 3) / 100; // 3%
        BURNABLE_SUPPLY = totalSupply - DEV_ALLOCATION; // 97%
        BURN_THRESHOLD = (BURNABLE_SUPPLY * burnThresholdPercent) / 100;
        VESTING_DURATION = vestingDays * 1 days;
        
        devWallet = _devWallet;
        projectDescription = _description;
        imageUrl = _imageUrl;
        twitter = _twitter;
        telegram = _telegram;
        website = _website;
        
        // Mint burnable supply to contract
        _mint(address(this), BURNABLE_SUPPLY);
        
        // Start vesting immediately
        vestingStartTime = block.timestamp;
    }
    
    /**
     * @dev Burn tokens to progress towards launch
     * @param amount Amount of tokens to burn from sender's balance
     */
    function burn(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be > 0");
        require(!tradingEnabled, "Trading already enabled");
        
        // Transfer tokens from user to contract
        _transfer(msg.sender, address(this), amount);
        
        // Burn from contract
        _burn(address(this), amount);
        totalBurned += amount;
        
        emit TokensBurned(msg.sender, amount, totalBurned);
        
        // Check if threshold reached
        if (totalBurned >= BURN_THRESHOLD && !tradingEnabled) {
            _enableTrading();
        }
    }
    
    /**
     * @dev Internal function to enable trading
     */
    function _enableTrading() internal {
        tradingEnabled = true;
        emit TradingEnabled(block.timestamp);
        
        // Create LP with remaining tokens
        _createLiquidityPool();
    }
    
    /**
     * @dev Create liquidity pool with remaining tokens
     */
    function _createLiquidityPool() internal {
        require(!lpCreated, "LP already created");
        
        uint256 remainingTokens = balanceOf(address(this));
        require(remainingTokens > 0, "No tokens for LP");
        
        // In production, integrate with Monad DEX here
        // For now, transfer to LP address (to be set by admin)
        lpCreated = true;
        
        emit LiquidityPoolCreated(liquidityPool, remainingTokens);
    }
    
    /**
     * @dev Set liquidity pool address (called by factory/router)
     */
    function setLiquidityPool(address _pool) external onlyOwner {
        require(_pool != address(0), "Invalid pool");
        require(!lpCreated, "LP already set");
        liquidityPool = _pool;
        
        // Transfer remaining tokens to LP
        uint256 remainingTokens = balanceOf(address(this));
        if (remainingTokens > 0) {
            _transfer(address(this), _pool, remainingTokens);
        }
    }
    
    /**
     * @dev Claim vested dev tokens
     */
    function claimDevTokens() external nonReentrant {
        require(msg.sender == devWallet, "Not dev wallet");
        
        uint256 vestedAmount = getVestedAmount();
        uint256 claimable = vestedAmount - devTokensClaimed;
        
        require(claimable > 0, "No tokens to claim");
        
        devTokensClaimed += claimable;
        _mint(devWallet, claimable);
        
        emit DevTokensClaimed(devWallet, claimable);
    }
    
    /**
     * @dev Calculate vested amount based on time
     */
    function getVestedAmount() public view returns (uint256) {
        if (block.timestamp < vestingStartTime) {
            return 0;
        }
        
        uint256 timeElapsed = block.timestamp - vestingStartTime;
        
        if (timeElapsed >= VESTING_DURATION) {
            return DEV_ALLOCATION;
        }
        
        return (DEV_ALLOCATION * timeElapsed) / VESTING_DURATION;
    }
    
    /**
     * @dev Get claimable dev tokens
     */
    function getClaimableDevTokens() external view returns (uint256) {
        return getVestedAmount() - devTokensClaimed;
    }
    
    /**
     * @dev Get burn progress
     */
    function getBurnProgress() external view returns (uint256 burned, uint256 threshold, uint256 percentage) {
        burned = totalBurned;
        threshold = BURN_THRESHOLD;
        percentage = (totalBurned * 100) / BURN_THRESHOLD;
        if (percentage > 100) percentage = 100;
    }
    
    /**
     * @dev Get all token info
     */
    function getTokenInfo() external view returns (
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        uint256 _burnThreshold,
        uint256 _totalBurned,
        bool _tradingEnabled,
        string memory _description,
        string memory _imageUrl
    ) {
        return (
            name(),
            symbol(),
            TOTAL_SUPPLY,
            BURN_THRESHOLD,
            totalBurned,
            tradingEnabled,
            projectDescription,
            imageUrl
        );
    }
    
    /**
     * @dev Override transfer to enforce trading lock
     */
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override whenTradingEnabled {
        super._transfer(from, to, amount);
    }
    
    /**
     * @dev Emergency function to enable trading (only if stuck)
     */
    function emergencyEnableTrading() external onlyOwner {
        require(!tradingEnabled, "Already enabled");
        require(totalBurned > 0, "No burns yet");
        _enableTrading();
    }
}
