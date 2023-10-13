import { DataTypes, Sequelize } from "sequelize";
export default (sequelize: Sequelize) => {
  const StrayRequest = sequelize.define("StrayRequest", {
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    token: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    point: {
      type: DataTypes.GEOGRAPHY,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    observations: {
      type: DataTypes.STRING,
    },
    found: {
      type: DataTypes.DATE,
    },
  });

  return StrayRequest;
};
