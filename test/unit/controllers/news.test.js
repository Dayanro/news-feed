import "core-js/stable";
import "regenerator-runtime/runtime";

import httpMock from "node-mocks-http";
import { fakeNewsModel, fakePage, fakeLimit } from "../../mocks/news";
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

  describe("getNews", () => {
    beforeEach(() => {
      req.query = { page: fakePage, limit: fakeLimit };
    });
    it("should call retrieveNews with page and limit", async () => {
      const spyGetNews = jest
        .spyOn(newsService, "retrieveNews")
        .mockResolvedValueOnce([]);

      await newsController.getNews(req, res, next);

      expect(spyGetNews).toHaveBeenCalledWith(fakePage, fakeLimit);
    });

    it("should return status 200 if the news are retrieved", async () => {
      jest.spyOn(newsService, "retrieveNews").mockResolvedValueOnce([]);

      await newsController.getNews(req, res, next);

      expect(res.statusCode).toBe(200);
    });

    it("should send the response of retrieveNews", async () => {
      jest.spyOn(newsService, "retrieveNews").mockResolvedValueOnce([]);

      await newsController.getNews(req, res, next);

      expect(res._getJSONData()).toStrictEqual([]);
    });

        it("should pass error to the next middleware", async () => {
          jest
            .spyOn(newsService, "retrieveNews")
            .mockRejectedValueOnce(new Error());

          try {
            await newsController.getNews(req, res, next);
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(next).toHaveBeenCalledWith(error);
          }
        });
    
  });
});
