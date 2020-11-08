//const { iterator } = require("core-js/fn/symbol");
const { async } = require("regenerator-runtime");
import * as newsRepository from "../../../src/repositories/news";
import * as newsService from "../../../src/services/news";
import { fakeNewsModel } from "../../mocks/news";
import { fakeUserId } from "../../mocks/authentications";
import { BadRequestError } from "../../../src/errors/badRequestError";

describe("Create news", () => {
  it("should assign author to the news and send a object to saveNews", async () => {
    const spyRepository = jest
      .spyOn(newsRepository, "saveNews")
      .mockResolvedValueOnce();

    await newsService.addNews( fakeUserId ,fakeNewsModel);

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
