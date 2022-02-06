var SupplyChain = artifacts.require("./supply_block.sol");

module.exports = function(deployer) {
  deployer.deploy(SupplyChain);
};
