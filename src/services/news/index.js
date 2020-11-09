import { saveNews, findNews } from "../../repositories/news";
import { BadRequestError } from "../../errors";
import {MISSING_PAGINATION} from "../../utils/constants"
import {pageSize,documenToSkip} from "../../utils/pagination"

export const addNews = async (id, news) => {
  const { title, headline, content, date } = news;
  try {
    if (!title || !headline || !content || !date || !id)
      throw new BadRequestError();
    news.author = id;
    return await saveNews(news);
  } catch (error) {
    throw error;
  }
};

export const retrieveNews = async (page, limit) => {
    try {
        if (!page || !limit) throw new BadRequestError(MISSING_PAGINATION);
        return await findNews(pageSize(limit), documenToSkip(page, limit));
  } catch (error) {
    throw error;
  }
};
