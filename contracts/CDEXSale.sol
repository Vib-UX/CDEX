pragma solidity 0.6.1;
import "./Crowdsale.sol";
import "./KycContract.sol";
contract CDEXSale is Crowdsale {

    KycContract kyc;

    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        KycContract _kyc
    )
        
        Crowdsale(rate, wallet, token)
        public
    {
        kyc = _kyc;
    }
     function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary,weiAmount);
        require(kyc.KycCompleted(msg.sender), "KYC not completed, Purchase not allowed");
    }
}

