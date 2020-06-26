import ganache from 'ganache-cli'
import { ethers } from 'ethers'
import { Uish, Uu } from 'pollenium-uvaursi'
import { Uintable, Uint256, Bytes32 } from 'pollenium-buttercup'
import { Keypair } from 'pollenium-ilex'
import Web3 from 'web3'
import { Bellflower } from 'pollenium-bellflower'
import { GWEI } from 'pollenium-weigela'
import { MILLION } from 'pollenium-ursinia'

export interface AccountStruct {
  privateKey: Uish,
  startBalance: Uintable
}

export interface GaillardiaStruct {
  gasLimit: Uintable,
  gasPrice: Uintable,
  accounts: Array<AccountStruct>,
  blockTimeSeconds?: number,
}

export const gaillardiaDefaults: Omit<GaillardiaStruct, 'accounts'> = {
  gasLimit: 8 * MILLION,
  gasPrice: GWEI.opMul(5)
}

export class Gaillardia {

  readonly gasLimit: Uint256
  readonly gasPrice: Uint256

  readonly ganacheProvider
  readonly ethersWeb3Provider: ethers.providers.Web3Provider
  readonly web3
  readonly bellflower: Bellflower

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
          balance: new Uint256(account.startBalance).uu.toPhex(),
        }
      }),
      blockTime: struct.blockTimeSeconds ? struct.blockTimeSeconds : undefined
    })

    this.ethersWeb3Provider = new ethers.providers.Web3Provider(this.ganacheProvider, { name: 'ganache', chainId: 1 })
    this.web3 = new Web3(this.ganacheProvider)
    this.bellflower = new Bellflower(this.ethersWeb3Provider)
  }

  genWallet(privateKey: Uish): ethers.Wallet {
    return new ethers.Wallet(
      Uu.wrap(privateKey).u,
      this.ethersWeb3Provider
    )
  }

  async takeSnapshot(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.web3.currentProvider.sendAsync({
        method: "evm_snapshot",
        params: [],
        jsonrpc: "2.0",
        id: new Date().getTime()
      }, (error, res) => {
        if (error) {
          reject(error)
        } else {
          resolve(res.result)
        }
      })
    })
  }

  async restoreSnapshot(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.web3.currentProvider.sendAsync({
        method: "evm_revert",
        params: [id],
        jsonrpc: "2.0",
        id: new Date().getTime()
      }, (error, res) => {
        if (error) {
          return reject(error)
        } else {
          if (res.result === true) {
            resolve()
          } else {
            reject(new Error('Failed to Restore'))
          }
        }
      })
    })
  }
}
