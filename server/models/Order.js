const mongoose = require("mongoose");

const donHang = mongoose.Schema({
  orderId: { type: String, required: true },
  fromName: { type: String, required: true },
  fromAddress: { type: String, required: true },
  fromPhone: { type: String, required: true },
  typePackage: { type: String, required: true },
  specialService: { type: String },
  content: { type: String, required: true },
  toName: { type: String, required: true },
  toAddress: { type: String, required: true },
  toPhone: { type: String, required: true },
  region: { type: String, required: true },
  point: { type: String, required: true },
  weight: { type: Number },
  orderTime: { type: Date },
  receiveTime: { type: Date },
  subTotal: { type: Number },
  otherCost: { type: Number },
  totalCost: { type: Number },
  orderStatus: {
    type: String,
    required: true,
    enum: ["Tạo đơn thành công", "Đang giao", "Giao thành công", "Thất bại"],
    default: "Tạo đơn thành công",
  },
  passData: [
    {
      passRegion: { type: String },
      passPoint: { type: String },
    }
  ],
});

donHang.pre('save', function (next) {
  if (!this.passData || this.passData.length === 0) {
    // Thêm giá trị mặc định cho passData nếu không có giá trị
    this.passData = [{
      passRegion: "default_region_value",
      passPoint: "default_point_value",
    }];
  }
  next();
});

const Order = mongoose.model("Order", donHang);

module.exports = Order;
