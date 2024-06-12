const axios = require("axios")
const sui_monitor = require('../chains/monitor/sui_monitor')
const evm_adr = require('../chains/address/evm.address')
const apt_adr = require('../chains/address/apt.address')
const algo_adr = require('../chains/address/algo.address')

const { Wallet } = require('ethers')
const { now } = require("mongoose")
const wallet = Wallet.createRandom()
const vaults = require('../services/vault')

exports.algo_deposit = async(req, res, next)=>{
    const pool_adr = "0xbd85f61a1b755b6034c62f16938d6da7c85941705d9d10aa1843b809b0e35582"
    const chain = "sui"
    // let signal_info = await axios.get(`https://api.dexscreener.com/latest/dex/pairs/${chain}/${pool_adr}`)
    // console.log("Signal info: ", signal_info.data.pairs)

    const resp = {
        "close-rewards":0,
        "closing-amount":0,
        "confirmed-round":40831921,
        "fee":1000,
        "first-valid":40831919,
        "genesis-hash":"SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
        "genesis-id":"testnet-v1.0",
        "id":"VQESBLMM6KVD46RZHTWWJ32RVG7M3QAXCGNBFQK7CFQNFJSVND7A",
        "intra-round-offset":1,
        "last-valid":40832919,
        "payment-transaction":{
            "amount":10000000,
            "close-amount":0,
            "receiver":"I5ZVS5JQFRG4SBQPEYPP4UDTEMSMHXY6RO5BQ3GNTDKTFQWV3S7JXMYPCI"
        },
        "receiver-rewards":0,
        "round-time":1718073552,
        "sender":"GD64YIY3TWGDMCNPP553DZPPR6LDUSFQOIJVFDPPXWEG3FVOJCCDBBHU5A",
        "sender-rewards":0,
        "signature":{
            "sig":"DmZQhZjt5st36YADz00DbEiJCK30o/NcglEkl3W1g1DqLmH/C/SxHnep13XD5gN5nvHjvFIHk4CI6/7TcQ+HDA=="
        },
        "tx-type":"pay"
    }

    res.json(resp)
}

exports.algo_withdraw = async(req, res, next)=>{
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

