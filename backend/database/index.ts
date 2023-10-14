import { Sequelize } from "sequelize";
import createStrayRequest from "./models/strayRequest";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite",
});

const db = {
  sequelize,
  StrayRequest: createStrayRequest(sequelize),
};

(async () => {
  await sequelize.sync({ force: Boolean(process.env.RESET_DATABASE) });
  // Code here
})();

export default db;
