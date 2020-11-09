import { NewsModel } from "../../src/models";
import { fakeUserId } from "../mocks/authentications";

export const fakeTitle = "fakeTitle";
export const fakeHeadline = "fakeHeadline";
export const fakeContent = "fakecontent";
export const fakeImage = "fakeImage";
export const fakeQuotations = "fakeQuotations";
export const fakeNewsId = "12345fdg780hj097";
export const fakedate = new Date();
export const fakePage = 1;
export const fakeLimit = 5;

export const fakeNews = {
  title: fakeTitle,
  headline: fakeHeadline,
  content: fakeContent,
  image: fakeImage,
  date: fakedate,
  quotations: fakeQuotations,
  author: fakeUserId,
};

export const fakeNewsModel = new NewsModel(fakeNews);