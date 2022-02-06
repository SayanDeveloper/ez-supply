var SupplyChain = artifacts.require("./supplyChain.sol");

module.exports = function(deployer) {
  deployer.deploy(SupplyChain);
};
