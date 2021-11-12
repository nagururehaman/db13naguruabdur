const mongoose = require("mongoose")
const pancakeSchema = mongoose.Schema({
    pancake_type: String,
    price: Number,
    quantity: Number
})
module.exports = mongoose.model("pancake", pancakeSchema)