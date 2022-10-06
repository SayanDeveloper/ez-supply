const HDWalletProvider = require("truffle-hdwallet-provider");
const path = require("path");
require("dotenv").config();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: '127.0.0.1',
      port: 7545,
      network_id: "*",
    },
    goerli: {
      provider: () => {
        return new HDWalletProvider(process.env.MNEMONIC, 'https://goerli.infura.io/v3/'+process.env.GOERLI_API_KEY)
      },
      network_id: 5,
    },
  }
};
