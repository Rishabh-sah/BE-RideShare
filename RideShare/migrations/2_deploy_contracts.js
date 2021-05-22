const CarShare = artifacts.require("CarShare");

module.exports = function(deployer) {
  deployer.deploy(CarShare);
};
