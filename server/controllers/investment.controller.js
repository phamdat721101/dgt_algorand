const { Investment } = require('../model/investment')
exports.user_investment = async (req, res, next) => {
    try {
        let user_adr = req.query.user_adr
        console.log("User_adr: ", user_adr)
        const user_invest = {
            "investment_id":"dgt_1",
            "user_adr":"pnha2411",
            "vault_id":"dgt",
            "amount":2411,
            "timestamp":24111998
        }
        const investment = await new Investment({
            assetId: "dgt_02",
            amount:2411,
            owner: "PQD_01",
            investContract:"dgt_ox",
            transactionHash: "8nx13123"
        });
        
        let save_resp = investment.save().then((resp) =>{
            return resp
        });
        if(!save_resp){
            console.log("Error saving investment: ", save_resp)
        }
        res.json({
            code: 0,
            data: user_invest
        });
    } catch (error) {
        console.log("Error to get user profile: ", error)
        next(error);
    }
};