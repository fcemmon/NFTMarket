module.exports = app => {
  const tokenController = require("../controllers/erc1155.controller.js");

  var router = require("express").Router();

  // Create a new Client
  router.get("/:token_id", tokenController.get);
  router.post("/", tokenController.create);
  router.get("/", tokenController.list);

  app.use("/api/erc1155", router);
};