var TestBlock = artifacts.require("./TestBlock.sol");

module.exports = function(deployer) {
  deployer.deploy(TestBlock);
};
