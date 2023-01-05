import request from "supertest";
import mockUsers from "../../../mocks/mockUsers.js";
import app from "../../app.js";
import { usersCache } from "../../middlewares/manageCaches.js";
import routes from "../routes.js";

const { root, list } = routes.users;

beforeAll(() => {
  for (const mockUser of mockUsers) usersCache.push(mockUser);
});

afterAll(() => {
  usersCache.splice(0, usersCache.length);
});

describe("Given a '/users' endpoint", () => {
  describe("When it recives a list of users", () => {
    test("Then it should respond with a code 200 and their a list of users", async () => {
      const bodyExpected = mockUsers;
      const expectedStatus = 200;

      const response = await request(app)
        .get(`${root}${list}`)
        .expect(expectedStatus);

      expect(response.body).toStrictEqual(bodyExpected);
      expect(response.status).toBe(expectedStatus);
    });
  });
});
