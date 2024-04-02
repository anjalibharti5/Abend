const express = require("express");
const abendDataController = require("./../controllers/abendDataController");

const router = express.Router();

router
  .route("/abendData")
  .get(abendDataController.getAllData)
  .post(abendDataController.filterData);

router
  .route("/abendData/:entry")
  .get(abendDataController.getByEntry)
  .put(abendDataController.updateEntry)
  .delete(abendDataController.deleteEntry);

router.route("/abendData/add").post(abendDataController.addNewData);

module.exports = router;
