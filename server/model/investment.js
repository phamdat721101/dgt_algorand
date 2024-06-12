const mongoose = require("mongoose");
const investSchema = mongoose.Schema({
  assetId: {
    required: true,
    type: String,
    unique: true
  },
  amount:{
    type: Number
  },
  owner: {
    required: true,
    type: String,
    unique: true
  },
  investContract: {
    required: true,
    type: String
    // unique: 1
  },
  transactionHash: {
    required: true,
    type: String
  }
});

const Investment = mongoose.model("Investment", investSchema);

module.exports = { Investment };
