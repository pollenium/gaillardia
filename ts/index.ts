import ganache from 'ganache-cli'
import { ethers } from 'ethers'
import { Uish, Uu } from 'pollenium-uvaursi'
import { Uintable, Uint256, Bytes32 } from 'pollenium-buttercup'
import { Keypair } from 'pollenium-ilex'

export interface AccountStruct {
  privateKey: Uish,
  startBalance: Uintable
}

export interface GaillardiaStruct {
  gasLimit: Uintable,
  gasPrice: Uintable,
  accounts: Array<AccountStruct>
}

export const gaillardiaDefaults: Omit<GaillardiaStruct, 'accounts'> = {
  gasLimit: 8000000,
  gasPrice: 5000000000
}

export class Gaillardia {

  readonly gasLimit: Uint256
  readonly gasPrice: Uint256

  readonly ganacheProvider
  readonly ethersWeb3Provider

  constructor(readonly struct: GaillardiaStruct) {

    this.gasLimit = new Uint256(struct.gasLimit)
    this.gasPrice = new Uint256(struct.gasPrice)


    this.ganacheProvider = ganache.provider({
      gasLimit: this.gasLimit.uu.toPhex(),
      gasPrice: this.gasPrice.uu.toPhex(),
      accounts: struct.accounts.map((account) => {
        const privateKey = new Bytes32(account.privateKey)
        const startBalance = new Uint256(account.startBalance)
        return {
          secretKey: new Buffer(privateKey.u),
          balance: account.startBalance,
        }
      })
    })

    this.ethersWeb3Provider = new ethers.providers.Web3Provider(this.ganacheProvider, { name: 'ganache', chainId: 1 })
  }
}
