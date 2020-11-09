//const { iterator } = require("core-js/fn/symbol");
const { async } = require("regenerator-runtime");
import * as newsRepository from "../../../src/repositories/news";
import * as newsService from "../../../src/services/news";
import { fakeNewsModel } from "../../mocks/news";
import { fakeUserId } from "../../mocks/authentications";
import { BadRequestError } from "../../../src/errors/badRequestError";
import { LIMIT_ITEMS, MISSING_PAGINATION } from "../../../src/utils/constants";

describe("Create news", () => {
  describe("addNews", () => {
    it("should assign author to the news and send a object to saveNews", async () => {
      const spyRepository = jest
        .spyOn(newsRepository, "saveNews")
        .mockResolvedValueOnce();

      await newsService.addNews(fakeUserId, fakeNewsModel);

      expect(spyRepository).toHaveBeenCalledWith(fakeNewsModel);
    });
    it("should throw an error if a pararameter is not provided", async () => {
      try {
        await newsService.addNews(fakeUserId, {});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });
    it("Should throw an error if something goes wrong when saving the news", async () => {
      const spyRepository = jest
        .spyOn(newsRepository, "saveNews")
        .mockResolvedValueOnce(new Error());
      try {
        await newsService.addNews(fakeUserId, fakeNewsModel);
      } catch (error) {
        expect(spyRepository).toHaveBeenCalledWith(fakeNewsModel);
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe("retrieveNews", () => {
    it(`should determine the max limit ${LIMIT_ITEMS} in case that provided number would be greater than`, async () => {
      const spyRepository = jest
        .spyOn(newsRepository, "findNews")
        .mockResolvedValueOnce([]);

      const result = await newsService.retrieveNews("1", "10");

      expect(spyRepository).toHaveBeenCalledWith(10, 0);
      expect(result).toStrictEqual([]);
    });

    it("should throw an error if a pararameter is not provided", async () => {
      try {
        await newsService.retrieveNews("", "");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error.message).toBe(MISSING_PAGINATION);
      }
    });

    it("Should throw an error if something goes wrong when retrieving the news", async () => {
      const spyRepository = jest
        .spyOn(newsRepository, "findNews")
        .mockResolvedValueOnce(new Error());
      try {
        await newsService.retrieveNews("10", "1");
      } catch (error) {
        expect(spyRepository).toHaveBeenCalledWith(fakeNewsModel);
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
