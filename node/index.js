"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ganache_cli_1 = __importDefault(require("ganache-cli"));
var ethers_1 = require("ethers");
var pollenium_buttercup_1 = require("pollenium-buttercup");
exports.gaillardiaDefaults = {
    gasLimit: 8000000,
    gasPrice: 5000000000
};
var Gaillardia = /** @class */ (function () {
    function Gaillardia(struct) {
        this.struct = struct;
        this.gasLimit = new pollenium_buttercup_1.Uint256(struct.gasLimit);
        this.gasPrice = new pollenium_buttercup_1.Uint256(struct.gasPrice);
        this.ganacheProvider = ganache_cli_1["default"].provider({
            gasLimit: this.gasLimit.uu.toPhex(),
            gasPrice: this.gasPrice.uu.toPhex(),
            accounts: struct.accounts.map(function (account) {
                var privateKey = new pollenium_buttercup_1.Bytes32(account.privateKey);
                var startBalance = new pollenium_buttercup_1.Uint256(account.startBalance);
                return {
                    secretKey: new Buffer(privateKey.u),
                    balance: account.startBalance
                };
            })
        });
        this.ethersWeb3Provider = new ethers_1.ethers.providers.Web3Provider(this.ganacheProvider, { name: 'ganache', chainId: 1 });
    }
    return Gaillardia;
}());
exports.Gaillardia = Gaillardia;
