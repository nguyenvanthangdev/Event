const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {}
  }
  Event.init(
    {
      nameEvent: DataTypes.STRING,
      description: DataTypes.TEXT,
      date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Event",
      freezeTableName: true,
    }
  );
  return Event;
};
