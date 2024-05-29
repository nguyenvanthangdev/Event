import express from "express";

import EventController from "../controllers/EventController";

let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/api/get-all-event", EventController.getAllEvent);
  router.get("/api/get-all-event1", EventController.getAllEvent1);
  router.post("/api/create-new-event", EventController.getCreateNewEvent);
  router.put("/api/get-edit-event", EventController.getEditEvent);
  router.delete("/api/get-delete-event", EventController.getDeleteEvent);
  return app.use("/", router);
};
module.exports = initWebRoutes;
