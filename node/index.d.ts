import { Uish } from 'pollenium-uvaursi';
import { Uintable, Uint256, Bytes32 } from 'pollenium-buttercup';
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
    readonly ethersWeb3Provider: any;
    readonly web3: any;
    constructor(struct: GaillardiaStruct);
    fetchLatestBlockNumber(): Promise<number>;
    fetchLatestBlockHash(): Promise<Bytes32>;
    takeSnapshot(): Promise<number>;
    restoreSnapshot(id: number): Promise<void>;
}
