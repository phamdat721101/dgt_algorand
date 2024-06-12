exports.asset = async (req, res, next) => {
    try {
        const asset = {
            "asset_id":"dgt_1",
            "name":"meme coin",
            "symbol":"dgt_ass_1",
            "decimal":2411,
            "price":24111998,
            "owner":"pqd_dgt_adr"
        }
        res.json({
            code: 0,
            data: asset
        });
    } catch (error) {
        console.log("Error to get user profile: ", error)
        next(error);
    }
};

exports.sub_signal = async(req, res, next) =>{
    const signal = [
        {
            "name":"Bogdanoff",
            "symbol":"BOG",
            "contract":"4MfE9u6TquEspTnzFBw1zGUSeLiYGEMeFzN1xTzw3GR2",
            "chain":"solana",
            "entry":"0.03309",
            "stop_loss":"65.25%",
            "profit":"82%",
            "link":"https://www.dextools.io/app/en/solana/pair-explorer/FE9BLDtUvndtwBc46EpAvEBCcndBTWuJSZiBkFL51VAH?t=1711419586565",
            "dex_protocol":"raydium",
            "total_cap":"36.31K",
            "created_at":"3/26/2024 04:23",
        }
    ]

    res.json(signal)
}