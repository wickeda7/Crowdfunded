// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./FundToken.sol";
contract CrowdFunded  is Ownable {

    // Emitted when the stored value changes
    event ValueChanged(uint goal, uint32 end);
    event Pledge(address indexed caller, uint amount);

    // Amount of tokens to raise
    uint private s_goal;
    //  End of campaign
    uint32 private s_endAt;
    // Total amount pledged
    uint private s_pledgedAmount;
    
    FundToken token;

     mapping(address => uint256) public s_addressToAmountFunded;
    address[] public s_funders;
     address public /* immutable */ i_owner;
    
    
    function store(uint _goal, uint32 _endAt, address _token) public {
        s_goal = _goal;
        s_endAt = _endAt;
        token = FundToken(_token);
         i_owner = token.owner();
         console.log("i_owner %s", i_owner);
        emit ValueChanged(_goal, _endAt);
    }

    function pledge(uint256 _amount) external {
        //require(block.timestamp <= s_endAt, "ended");
        s_addressToAmountFunded[msg.sender] += _amount;
        s_funders.push(msg.sender);
        s_pledgedAmount += _amount;
        token.transferFrom(msg.sender , address(this), _amount);
        emit Pledge(msg.sender, _amount);
    }
   
    function refund(uint256 _amount) external{
        uint  amount = s_addressToAmountFunded[msg.sender];
        require(amount > 0, "No refund available");
        require(block.timestamp > s_endAt, "not ended");
        require(s_pledgedAmount / 1 ether < s_goal, "pledged > goal");
        s_pledgedAmount -= amount;
        s_addressToAmountFunded[msg.sender] = 0;
        s_funders = new address[](0);
        token.transfer(msg.sender, _amount);
    }
    function withdraw(uint256 _amount) external{
        require(i_owner == msg.sender, "not owner");
        require(block.timestamp > s_endAt, "not ended");
        require(s_pledgedAmount >= s_goal, "pledged < goal");
        s_pledgedAmount = 0;
        address[] memory funders = s_funders;
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        token.transfer(msg.sender, _amount);
        
    }
    // function getContractBalance2() external view returns (uint256) {
    //     return address(this).balance;
    // }

    function getContractBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function getRefundAmount() external view returns (uint) {
        return s_addressToAmountFunded[msg.sender];
    }

    function balanceOf() external view returns (uint256) {
        return token.allowance(msg.sender, address(this));
    }

    function getGoal() public view returns (uint) {
        return s_goal;
    }

    function getEDate() external view returns (uint32) {
        return s_endAt;
    }

    function getPledgeAmount() external view returns (uint) {
        return s_pledgedAmount;
    }

    function getOwner() external view returns (address) {
        return i_owner;
    }
}
