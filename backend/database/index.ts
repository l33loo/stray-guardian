import { Sequelize } from "sequelize";
import createAnimal from "./models/animal";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite",
});

const animal = createAnimal(sequelize);

const db = {
  sequelize,
  Animal: animal,
};

(async () => {
  await sequelize.sync({ force: Boolean(process.env.RESET_DATABASE) });
  // Code here
})();

export default db;
