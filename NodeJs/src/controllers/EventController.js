import EventServices from "../services/EventServices";

let getAllEvent = async (req, res) => {
  try {
    let infor = await EventServices.getAllEventService(req.query.date);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getAllEvent1 = async (req, res) => {
  try {
    let infor = await EventServices.getAllEventService1(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getCreateNewEvent = async (req, res) => {
  try {
    let infor = await EventServices.getCreateNewEventService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getDeleteEvent = async (req, res) => {
  try {
    let infor = await EventServices.getDeleteEventService(req.body.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getEditEvent = async (req, res) => {
  try {
    let infor = await EventServices.getEditEventService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

module.exports = {
  getAllEvent: getAllEvent,
  getCreateNewEvent: getCreateNewEvent,
  getEditEvent: getEditEvent,
  getDeleteEvent: getDeleteEvent,
  getAllEvent1: getAllEvent1,
};
