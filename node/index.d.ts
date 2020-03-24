import { ethers } from 'ethers';
import { Uish } from 'pollenium-uvaursi';
import { Uintable, Uint256 } from 'pollenium-buttercup';
import { Bellflower } from 'pollenium-bellflower';
export interface AccountStruct {
    privateKey: Uish;
    startBalance: Uintable;
}
export interface GaillardiaStruct {
    gasLimit: Uintable;
    gasPrice: Uintable;
    accounts: Array<AccountStruct>;
}
export declare const gaillardiaDefaults: Omit<GaillardiaStruct, 'accounts'>;
export declare class Gaillardia {
    readonly struct: GaillardiaStruct;
    readonly gasLimit: Uint256;
    readonly gasPrice: Uint256;
    readonly ganacheProvider: any;
    readonly ethersWeb3Provider: ethers.providers.Web3Provider;
    readonly web3: any;
    readonly bellflower: Bellflower;
    constructor(struct: GaillardiaStruct);
    genWallet(privateKey: Uish): ethers.Wallet;
    takeSnapshot(): Promise<number>;
    restoreSnapshot(id: number): Promise<void>;
}
