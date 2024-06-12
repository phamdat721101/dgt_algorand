const { HDNodeWallet, Mnemonic, toBeHex, Wallet } = require('ethers')
const { AptosAccount } = require('aptos')
const {aptosCfg} = require('../../config/vars')

const wallet = Wallet.createRandom()

exports.aptos_address = (mnemonic, index) => {
    const aptos = AptosAccount.fromDerivePath(aptosCfg.hdPath+`${index}'`, mnemonic)

    return {
      address: aptos.address().toString(),
      key: aptos.toPrivateKeyObject().privateKeyHex
    }
}
