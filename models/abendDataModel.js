const mongoose = require("mongoose");

const abendDataSchema = new mongoose.Schema({
  ENTRY: {
    type: Number,
    unique: true,
    required: [true, "must have"],
  },
  "JOB NAME": {
    type: String,
    required: [true, "must have"],
  },
  "ABEND CODE": {
    type: String,
    required: [true, "must have"],
  },
  "ABENDED PROGRAM": {
    type: String,
    required: [true, "must have"],
  },
  DATE: {
    type: Date,
    required: [true, "must have"],
  },
  TIME: {
    type: String,
    required: [true, "must have"],
  },
  "IPC ACTV PROGRAM": {
    type: String,
    required: [true, "must have"],
  },
  "IPC RTC": {
    type: String,
    required: [true, "must have"],
  },
  "ALL PGMS LISTED": String,
  "PRODUCT FAMILY": {
    type: String,
    required: [true, "must have"],
  },
  TRANSACTION: {
    type: String,
    required: [true, "must have"],
  },
});

const AbendData = mongoose.model("AbendData", abendDataSchema, "abendData");
module.exports = AbendData;
