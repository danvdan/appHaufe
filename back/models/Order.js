const Mongoose = require("mongoose");

var Order = Mongoose.model(
  "Order",
  new Mongoose.Schema({
    orderId: {
      unique: true,
      required: true,
      type: Number
    },
    customerName: {
      required: true,
      type: String
    },
    items: { type: [String] },
    total: {
      type: Number,
      required: true
    }
  })
);

module.exports = Order;
