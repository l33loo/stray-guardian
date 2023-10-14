import { Sequelize } from "sequelize";
import createStrayRequest from "./models/strayRequest";
import { generateRandomPoint } from "../utilities/geo";
import { faker } from "@faker-js/faker";
import crypto from "crypto";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite",
});

const db = {
  sequelize,
  StrayRequest: createStrayRequest(sequelize),
};

(async () => {
  const force = process.env.RESET_DATABASE;
  // const force = true;
  await sequelize.sync({ force: Boolean(force) });
  const P = {
    latitude: 38.73040422492318,
    longitude: -27.21501148626289,
  };

  if (force) {
    const range = (n: number) => Array.from({ length: n }, (value, key) => key);
    range(20).forEach(async (n) => {
      const randomPoint = generateRandomPoint(
        { lat: P.latitude, lng: P.longitude },
        7000
      );

      const colors = [
        "#FFA500",
        "#0000FF",
        "#FFFF00",
        "#FF0000",
        "#FFFFFF",
        "#000000",
        "#808080",
        "#008000",
        "#A52A2A",
      ];
      const classes = ["cat", "dog", "bird", "cow", "bat", "rabbit", "unicorn"];

      await db.StrayRequest.create({
        photoUrl: "photoUrl",
        type: classes[Math.floor(Math.random() * classes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        status: Math.floor(Math.random() * 2),
        lastSeen: faker.date.recent(),
        lat: randomPoint.lat,
        lon: randomPoint.lng,
        phone: faker.phone.number(),
        email: faker.internet.email(),
        observations: faker.lorem.sentence(),
        token: crypto.randomUUID(),
      });
    });
  }
})();

export default db;
