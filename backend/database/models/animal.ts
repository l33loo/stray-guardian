import { DataTypes, Sequelize } from "sequelize";
export default (sequelize: Sequelize) => {
  const Animal = sequelize.define("animal", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Animal;
};
 