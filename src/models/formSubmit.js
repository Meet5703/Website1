const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  ID: {
    type: String, // Default value is "EIFPE-" + a new uuid
    required: true,
    unique: true
  },
  Name: { type: String, required: true },
  FatherName: { type: String, required: true },
  MotherName: { type: String, required: true },
  Address: { type: String, required: true },
  email: { type: String, required: true },
  ActingRole: { type: String, required: true },
  MobileNumber: { type: String, required: true },
  WhatsAppNumber: {
    type: String,
    required: true
  },
  VideoUpload: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "pending" }
});

const Forms = mongoose.models.Forms || mongoose.model("Forms", formSchema);

module.exports = Forms;
