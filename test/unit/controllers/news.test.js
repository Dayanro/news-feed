import "core-js/stable";
import "regenerator-runtime/runtime";

import httpMock from "node-mocks-http";
import { fakeNewsModel } from "../../mocks/news";
import { fakeUserId } from "../../mocks/authentications";
import * as newsService from "../../../src/services/news";
import * as newsController from "../../../src/controllers/news";
import { ROLE_ADMIN } from "../../../src/utils/constants";

describe("News controller", () => {
  let res, req, next;
  beforeEach(() => {
    res = httpMock.createResponse();
    req = httpMock.createRequest();
    next = jest.fn((error) => {
      res.status(500);
      res.send(error.message);
    });
    jest.clearAllMocks();
  });

  describe("Create news", () => {
    beforeEach(() => {
      req.body = fakeNewsModel;
      req.user = { id: fakeUserId, role: ROLE_ADMIN };
    });

    it("should call addNews service", async () => {
      const spyCreateNews = jest
        .spyOn(newsService, "addNews")
        .mockResolvedValueOnce();

      await newsController.createNews(req, res, next);

      expect(spyCreateNews).toHaveBeenCalledWith(req.user.id, req.body);
    });

    it("should return status 201 if the news is created", async () => {
      jest.spyOn(newsService, "addNews").mockResolvedValueOnce();

      await newsController.createNews(req, res, next);

      expect(res.statusCode).toBe(201);
    });

    it("should pass error to the next middleware", async () => {
      jest.spyOn(newsService, "addNews").mockRejectedValueOnce(new Error());

      try {
        await newsController.createNews(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(next).toHaveBeenCalledWith(error);
      }
    });
  });
});
