import db from "../models/index";

let getAllEventService = (date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!date) {
        resolve({
          errCode: 1,
          errMessage: "Thiếu tham số bắt buộc !",
        });
      } else {
        let data = await db.Event.findAll({
          where: { date: date },
          nest: true,
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllEventService1 = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Thiếu tham số đầu vào !",
        });
      } else {
        let event = "";
        if (inputId === "ALL") {
          event = await db.Event.findAll({});
        }
        if (inputId && inputId !== "ALL") {
          event = await db.Event.findOne({
            where: { id: inputId },
          });
        }
        resolve({
          errCode: 0,
          data: event,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getCreateNewEventService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.date) {
        resolve({
          errCode: 1,
          errMessage: "Thiếu tham số bắt buột!",
        });
      } else {
        await db.Event.create({
          nameEvent: data.nameEvent,
          description: data.description,
          date: data.date,
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getDeleteEventService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Thiếu tham số bắt buộc !",
        });
      } else {
        let event = await db.Event.findOne({
          where: { id: id },
        });
        if (!event) {
          resolve({
            errCode: 2,
            errMessage: "Sự kiện không tồn tại !",
          });
        }
        await db.Event.destroy({
          where: { id: id },
        });
        resolve({
          errCode: 0,
          errMessage: "Xóa Thàng công !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getEditEventService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Thiếu tham số bắt buột !",
        });
      }
      let event = await db.Event.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (event) {
        event.nameEvent = data.nameEvent;
        event.description = data.description;
        event.date = data.date;
        await event.save();
        resolve({
          errCode: 0,
          errMessage: "Edit Thành công !",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Không tìm thấy!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllEventService: getAllEventService,
  getAllEventService1: getAllEventService1,
  getCreateNewEventService: getCreateNewEventService,
  getDeleteEventService: getDeleteEventService,
  getEditEventService: getEditEventService,
};
