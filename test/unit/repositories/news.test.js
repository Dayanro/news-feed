const { async } = require("regenerator-runtime");

import { NewsModel } from "../../../src/models";
import { fakeNews } from "../../mocks/news";
import * as newsRepository from "../../../src/repositories/news";


describe("Create news", () => {
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
