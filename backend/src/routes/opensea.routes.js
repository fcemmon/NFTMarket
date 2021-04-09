module.exports = app => {
  const openseaController = require("../controllers/opensea.controller.js");

  var router = require("express").Router();

  // Create a new Client
  router.get("/:token_id", openseaController.view);
  router.post("/:token_id", openseaController.publish);

  app.use("/api/opensea", router);
};