const axios = require("axios")
const sui_monitor = require('../chains/monitor/sui_monitor')
const evm_adr = require('../chains/address/evm.address')
const apt_adr = require('../chains/address/apt.address')
const algo_adr = require('../chains/address/algo.address')

const { Wallet } = require('ethers')
const { now } = require("mongoose")
const wallet = Wallet.createRandom()
const vaults = require('../services/vault')

// const {
// 	DEFAULT_ED25519_DERIVATION_PATH,
// 	Ed25519Keypair,
// 	JsonRpcProvider,
// 	RawSigner,
// 	devnetConnection,
// 	TransactionBlock,
//     toB64,
//     fromExportedKeypair,
//     testnetConnection
// } = require('@mysten/sui.js/client');
// const req = require('express/lib/request');
// const provider = new JsonRpcProvider(testnetConnection);
// const privkey = '0xbc59c0992aa183ca50134fb7734844f473f43428bddf6cc55c95bd87ede72ad2'
// const privateKeyBytes = Uint8Array.from(Buffer.from(privkey.slice(2), "hex")); 

// const keypair = fromExportedKeypair({
//     schema: "ED25519",
//     privateKey: toB64(privateKeyBytes)
// });

// const signer = new RawSigner(keypair, provider);
// const PACKAGE_ID = '0x2f8a1bdc3977cc134bf7bac4699712009878c7bd8ef72d144325a5f032d1c8ef'
// const TREASURY_ID = '0x5fa75f3cc2bae39c34310a13809c507e027933f4acf5b9e3c5129402d7af2bde'

// async function subscribe_signal(data) {
//     try {
//         const tx = new TransactionBlock();
//         await tx.moveCall({
//             target: `${PACKAGE_ID}::dgt::mint`,
//             arguments: [
//                 tx.object("0x270875b1dbe6ad01ae1bf1ce0bf3e1526bbe32e9c879765cb6fed3ea4109d748"),
//                 tx.pure("2411"),
//                 tx.pure(data.wallet)
//             ],
//         });

//         const transaction = await signer.signAndExecuteTransactionBlock({
//             transactionBlock: tx,
//             options: {
//                 showInput: true,
//                 showEffects: true,
//                 showEvents: true,
//                 showObjectChanges: true,
//             }
//         });

//         console.log("DGT resp: ", transaction);
//         return transaction.transaction.data.transaction.inputs
//     } catch (error) {
//         console.log(error);
//     }
// }

exports.subscribe = async(req, res, next) =>{
    let user_info = {
        "chain": req.body.chain, 
        "wallet": req.body.wallet, 
    }
    let resp = await subscribe_signal(user_info)
    if(resp.length <= 0){
        return "Error subscrtiption"
    }
    res.json({
        "dgt_id": resp[0].objectId,
        "digest": resp[0].digest
    })
}
exports.vault_balance = async(req, res, next) =>{
    let vault_id = req.query.vault_id
    const vault_balance = [
        {
            "vault_id":"dgt_v1",
            "balance":24111306, 
            "staked": 20051998
        }
    ]

    res.json(vault_balance)
}

exports.profile = async (req, res, next) => {
    try {
        const user_email = req.query.email

        const user_resp = {
            "name":"Pnha2411",
            "wallet":"0x7D...E95",
            "adr_url":"https://app.dappflow.org/explorer/account/I5ZVS5JQFRG4SBQPEYPP4UDTEMSMHXY6RO5BQ3GNTDKTFQWV3S7JXMYPCI/transactions",
            "des":"It is the best capital for funding allocation",
            "holding_amount":100, 
            "twitter": "https://x.com/pqd_2411",
            "managed_amount":2411,
            "dgt_amount":100, 
            "logo_url":"https://drive.google.com/file/d/1PHKQkJsCCvxi1PWc1kDoCsCZgsMHMK0O/view?usp=sharing",
            "vaults": vaults.list_vault()
        }
        res.json(user_resp);
    } catch (error) {
        console.log("Error to get user profile: ", error)
        next(error);
    }
};

exports.user_portfolio = async(req, res, next)=>{
    const pool_adr = "0xbd85f61a1b755b6034c62f16938d6da7c85941705d9d10aa1843b809b0e35582"
    const chain = "sui"
    let signal_info = await axios.get(`https://api.dexscreener.com/latest/dex/pairs/${chain}/${pool_adr}`)
    // console.log("Signal info: ", signal_info.data.pairs)

    const portfolio = signal_info.data.pairs

    res.json(portfolio)
}

exports.user_history = async(req, res, next)=>{
    const user_history = [
        {
            "date": "0x6123m",
            "name": "dgt_rwa_bucket",
            "type": "hedge",
            "invest_amount":2411, 
            "profit":"18%", 
            "daily_loss":"1%",
            "total_loss":"5%",
            "dgt_score": 8,
            "status":true
        }
    ]

    res.json(user_history)
}

exports.user_history = async(req, res, next)=>{
    let adr = req.query.email
    console.log("User address: ", adr)
    const user_tracker = [
        {
            "date": "7/6/2024",
            "manager": "DigiTrust",
            "package_type": "Low-risk",
            "amount":100,
            "price":36,
            "expected_return": 27,
            "tx_hash": "0x123",
            "expire_date": "9/10/2024"
        }
    ]

    res.json(user_tracker)
}

exports.sub_deposit_event = async(req, res, next) =>{
    //making connection + 
    const event_resp = await sui_monitor.emit_investor_deposit()
    res.json(event_resp)
}

exports.get_evm_address = async(req, res, next) =>{
    let account_id = req.query.account_id
    let address_id = req.query.address_id

    let adr_resp = await evm_adr.generate(account_id, address_id)

    res.json(adr_resp)
}

exports.get_apt_address = async(req, res, next) =>{
    let account_id = req.query.account_id

    let adr_resp = await apt_adr.aptos_address(wallet.mnemonic.phrase, account_id)

    res.json(adr_resp)
}

exports.get_algo_address = async(req, res, next) =>{
    let account_id = req.query.account_id

    let adr_resp = await algo_adr.createAddress()

    res.json(adr_resp)
}