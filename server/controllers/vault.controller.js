const Contract = require('web3-eth-contract');
const vault = require('../services/vault');

exports.list_vault = async(req, res, next) =>{
    const vaults = await vault.list_vault()

    res.json(vaults)
}

exports.information = async (req, res, next) => {
    try {
        let vault_id = req.query.vault_id
        const vault_info = await vault.vault_detail(vault_id)
        res.json(vault_info);
    } catch (error) {
        console.log("Error to get user profile: ", error)
        next(error);
    }
};

exports.public_signal = async(req, res, next) =>{
    const public_signal = {
        "name":"FinX",
        "amount":2411,
        "type": "Holding",
        "timestamp":2424,
        "chain":"EVM"
    }

    res.json({
        code: 0,
        data: public_signal
    })
}

exports.members = async(req, res, next) =>{
    const members = [{
        "name":"PQD",
        "lp_amount":2411,
        "created_at":2024,
        "risk_guard":6
    }]

    res.json({
        code: 0, 
        data: members
    })
}

exports.signal_fee = async(req, res, next) =>{
    const signal_fee = {
        "amount":2411,
        "leverage":6,
        "start_at":24,
        "end_at":2411
    }

    res.json({
        code: 0,
        data: signal_fee
    })
}

exports.signal_provider = async(req,res, next) =>{
    const signal_provider = {
        "provider_adr": "0x123msdf",
        "amount":2411,
    }

    res.json({
        code: 0,
        data: signal_provider
    })
}

exports.vault_allocation = async(req, res, next)=>{
    let vault_req = {
        chain: req.query.chain, 
        pool: req.query.pool  
    }
    const vault_allocation = await vault.portfolio_structure(vault_req)
    console.log("Allocation: ", vault_allocation)

    res.json(vault_allocation)
}