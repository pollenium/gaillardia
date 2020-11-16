"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ganache_cli_1 = __importDefault(require("ganache-cli"));
var ethers_1 = require("ethers");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var web3_1 = __importDefault(require("web3"));
var pollenium_bellflower_1 = require("pollenium-bellflower");
var pollenium_weigela_1 = require("pollenium-weigela");
var pollenium_ursinia_1 = require("pollenium-ursinia");
exports.gaillardiaDefaults = {
    gasLimit: 8 * pollenium_ursinia_1.MILLION,
    gasPrice: pollenium_weigela_1.GWEI.opMul(5)
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
                    balance: new pollenium_buttercup_1.Uint256(account.startBalance).uu.toPhex()
                };
            }),
            blockTime: struct.blockTimeSeconds ? struct.blockTimeSeconds : undefined
        });
        this.ethersWeb3Provider = new ethers_1.ethers.providers.Web3Provider(this.ganacheProvider, { name: 'ganache', chainId: 1337 });
        this.web3 = new web3_1["default"](this.ganacheProvider);
        this.bellflower = new pollenium_bellflower_1.Bellflower(this.ethersWeb3Provider);
    }
    Gaillardia.prototype.genWallet = function (privateKey) {
        return new ethers_1.ethers.Wallet(pollenium_uvaursi_1.Uu.wrap(privateKey).u, this.ethersWeb3Provider);
    };
    Gaillardia.prototype.takeSnapshot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.web3.currentProvider.sendAsync({
                            method: "evm_snapshot",
                            params: [],
                            jsonrpc: "2.0",
                            id: new Date().getTime()
                        }, function (error, res) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve(res.result);
                            }
                        });
                    })];
            });
        });
    };
    Gaillardia.prototype.restoreSnapshot = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.web3.currentProvider.sendAsync({
                            method: "evm_revert",
                            params: [id],
                            jsonrpc: "2.0",
                            id: new Date().getTime()
                        }, function (error, res) {
                            if (error) {
                                return reject(error);
                            }
                            else {
                                if (res.result === true) {
                                    resolve();
                                }
                                else {
                                    reject(new Error('Failed to Restore'));
                                }
                            }
                        });
                    })];
            });
        });
    };
    Gaillardia.prototype.increaseTime = function (seconds) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.web3.currentProvider.sendAsync({
                            method: "evm_increaseTime",
                            params: [seconds],
                            jsonrpc: "2.0",
                            id: new Date().getTime()
                        }, function (error, res) {
                            if (error) {
                                return reject(error);
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            });
        });
    };
    return Gaillardia;
}());
exports.Gaillardia = Gaillardia;
