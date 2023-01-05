import request from "supertest";
import mockRoutes from "../../../mocks/mockRoutes.js";
import app from "../../app.js";
import routes from "../routes.js";

const { ping, endpoints } = routes.general;

describe("Given a '/' endpoint", () => {
  describe("When it recives message Pong 🏓", () => {
    test("Then it should respond with a code 200 and their message Pong 🏓", async () => {
      const bodyExpected = {
        message: "Pong 🏓",
      };
      const expectedStatus = 200;

      const response = await request(app).get(ping).expect(expectedStatus);

      expect(response.body).toStrictEqual(bodyExpected);
      expect(response.status).toBe(expectedStatus);
    });
  });
});

describe("Given a '/endpoints' endpoint", () => {
  describe("When it recives list of endpoints", () => {
    test("Then it should respond with a code 200 and their list of endpoint", async () => {
      const bodyExpected = mockRoutes;
      const expectedStatus = 200;

      const response = await request(app).get(endpoints).expect(expectedStatus);

      expect(response.body).toStrictEqual(bodyExpected);
      expect(response.status).toBe(expectedStatus);
    });
  });
});
