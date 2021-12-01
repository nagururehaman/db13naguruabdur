const mongoose = require("mongoose")
const pancakeSchema = mongoose.Schema({
    pancake_type: String,
    price: {type: Number, min: 7, max: 65, default: 0},
    quantity: Number
})
module.exports = mongoose.model("pancake", pancakeSchema)