module.exports = app => {
  const tokenController = require("../controllers/erc721.controller.js");

  var router = require("express").Router();

  // Create a new Client
  router.get("/:token_id", tokenController.get);
  router.post("/", tokenController.create);
  router.post("/makeSell:token_id", tokenController.makeSell);
  router.get("/", tokenController.list);

  app.use("/api/erc721", router);
};