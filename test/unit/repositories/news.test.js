const { async } = require("regenerator-runtime");

import { NewsModel } from "../../../src/models";
import { fakeNews } from "../../mocks/news";
import * as newsRepository from "../../../src/repositories/news";
jest.mock("../../../src/models/news");

describe("Create news", () => {
  describe("saveNews", () => {
    it("should insert one `news` document", async () => {
      const spyCreate = jest
        .spyOn(NewsModel, "create")
        .mockReturnValueOnce(fakeNews);
      await newsRepository.saveNews(fakeNews);
      expect(spyCreate).toHaveBeenCalled();
    });

    it("should throw an error when ther is a problem creating a news document", async () => {
      const spyCreate = jest
        .spyOn(NewsModel, "create")
        .mockReturnValueOnce(new Error());
      try {
        await newsRepository.saveNews(fakeNews);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(spyCreate).toHaveBeenCalled();
      }
    });
  });

  describe("findNews", () => {
    it("should return an array of news", async () => {
      NewsModel.find = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockImplementation(() => ({
          limit: jest.fn().mockImplementation(() => ({
            skip: jest.fn().mockResolvedValueOnce([]),
          })),
        })),
      }));
      const result = await newsRepository.findNews(5, 0);

      expect(result).toStrictEqual([]);
    });

    it("should throw an error when ther is a problem retrieve the news", async () => {
      NewsModel.find = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockImplementation(() => ({
          limit: jest.fn().mockImplementation(() => ({
            skip: jest.fn().mockResolvedValueOnce(new Error()),
          })),
        })),
      }));
      try {
        await newsRepository.findNews(5, 0);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
