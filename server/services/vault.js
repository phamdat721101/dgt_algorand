const axios = require('axios');
const Web3 = require('web3');
const Contract = require('web3-eth-contract');
const {dgtCfg, vaultParams} = require('../config/vars')
const vault_abi = require('../config/abi/dgt_vault.json')
const {provider} = require('../utils/provider')

exports.contractProvider = require('web3-eth-contract');
const web3 = new Web3(dgtCfg.providerUrl)

Contract.setProvider(provider)

exports.get_vault_return = async (vault_id) =>{
    let contract = new Contract(vault_abi, vaultParams.dgtVaultAddres)
    let receipt = await contract.methods.get_return(1).call()
    console.log("Return info: ", receipt)
    return receipt
}


exports.list_vault = async (data) =>{
    let vaults = [
        {
            "vault_id":0,
            "symbol":"N-DGT",
            "asset":[
                "https://dd.dexscreener.com/ds-data/tokens/sui/0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::fud.png"
            ],
            "vault_name":"Native vault",
            "price":"9$",
            "return":24,
            "tvl":2000,
            "monthly_return":"24.32%",
            "daily_return":"1.8%",
            "manager":"Dgt invest",
            "des":"DigiTrust ecosystem",
            "timestamp":2424,
            "chain":"EVM",
            "url":"https://dd.dexscreener.com/ds-data/tokens/sui/0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::fud.png"
        },
        {
            "url":"https://xkqpczltzicnmbqvihbc.supabase.co/storage/v1/object/public/logos/okb_887.png",
            "vault_id":1,
            "vault_name":"Meme vault",
            "symbol":"M-DGT",
            "price":"18$",
            "return":24,
            "tvl":1809,
            "monthly_return":"18%",
            "daily_return":"1.8%",
            "manager":"Dgt invest",
            "des":"DigiTrust ecosystem",
            "timestamp":2424,
            "chain":"EVM",
            // "url":"https://dd.dexscreener.com/ds-data/tokens/sui/0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::fud.png"
        },
        {
            "url":"https://xkqpczltzicnmbqvihbc.supabase.co/storage/v1/object/public/logos/ton_7768.png",
            "vault_id":2,
            "vault_name":"High risk",
            "symbol":"H-DGT",
            "price":"27$",
            "return":24,
            "tvl":639,
            "monthly_return":"9.36%",
            "daily_return":"1.8%",
            "manager":"Dgt invest",
            "des":"DigiTrust ecosystem",
            "timestamp":2424,
            "chain":"EVM",
            // "url":"https://dd.dexscreener.com/ds-data/tokens/sui/0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::fud.png"
        }
    ]

    return vaults
}

exports.portfolio_structure = async (data) =>{
    let url = 'https://api.dexscreener.com/latest/dex/pairs'
    let chain = data.chain || 'ton'
    let pool = data.pool || 'EQBCwe_IObXA4Mt3RbcHil2s4-v4YQS3wUDt1-DvZOceeMGO'
    let asset_info = await axios.get(`${url}/${chain}/${pool}`)

    console.log("Asset info: ", asset_info)

    let structure = {
        "price": "1348$",
        "vault_id":"finX",
        "vault_name":"High risk",
        "vault_type":1,
        "holding_value":"368000$",
        "amount_raised":"45%",
        "package":"dgt_low_risk",
        "assets":[
            {
                "asset": "NOT coin",
                "symbol": "NOT",
                "contract": "0x138234234",
                "chain": "btc layer-2",
                "invest_amount":10, 
                "weight":"67.4%", 
                "holding":"1348$",
                "price_change":{
                    "24h":"5.5",                
                },
                "dgt_score": 8,
                "status":true,
                "logo_url":"https://dd.dexscreener.com/ds-data/tokens/ton/eqavlwfdxgf2lxm67y4yzc17wykd9a0guwpkms1gosm__not.png",
                "asset_url": "https://app.dappflow.org/explorer/asset/3797/transactions"
            },
            {
                "asset": "Resistance DOG",
                "symbol": "REDO",
                "contract": "0x138234234",
                "chain": "btc layer-2",
                "invest_amount":90, 
                "weight":"32.6%", 
                "holding":"652$",
                "price_change":{
                    "24h":"6.5",                
                },
                "dgt_score": 8,
                "status":true,
                "logo_url":"https://dd.dexscreener.com/ds-data/tokens/ton/eqbz_cafpydr5kuts0anxh0ztdhkpezonmlja2sngllm4cko.png",
                "asset_url": "https://app.dappflow.org/explorer/asset/10984/transactions"
            }
        ]
    }

    return structure
}

exports.vault_detail = async (vault_id) =>{
    let vault_return = await this.get_vault_return(vault_id)
    if(!vault_return || vault_return == undefined){
        vault_return = 18
    }

    let vault_detail = [
        {
            "vault_id": 1,
            "vault_name": "dgt_info_1",
            "manager": "dgt_manager",
            "logo":"http://localhost:3000/image/logo",
            "vault_desc": "",
            "vault_adr": vaultParams.dgtVaultAddres,
            "return": vault_return,
            "assets":["CETUS", "SUI", "SUILIEN"],
            "created_at":1231,
            "updated_at":12312,
            "tvl": 2000, 
            "volume": 15,
            "price": 24,
            "currency":"$"
        }
    ]

    // if(data.)

    return vault_detail
}