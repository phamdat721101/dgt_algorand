const ethereumjs = require("ethereumjs-util");
const HDKey = require('hdkey');
const { evmCfg } = require('../../config/vars');


exports.generate = (accountIndex, addressId) => {
  try {
    let node = HDKey.fromExtendedKey(evmCfg.masterPubKey);
    let path = isNaN(addressId) ? evmCfg.hdPath + accountIndex : evmCfg.hdPath + accountIndex + '/' + addressId;
    let child = node.derive(path);
    let publicKey = ethereumjs.importPublic(child.publicKey);
    let address = '0x' + ethereumjs.pubToAddress(publicKey).toString('hex');

    console.log("User address: ", address)

    return {
      address: address,
      pubkey : child.publicExtendedKey,
      path   : path,
      tag    : ''
    };
  } catch (e) {
    console.error(e)
  }
};

exports.getPrivateKey = (path) => {
  try {
    let node = HDKey.fromExtendedKey(evmCfg.masterPrivKey);
    let child = node.derive(path);
    return child.privateKey.toString('hex');
  } catch (e) {
    console.error(e)
  }
};
