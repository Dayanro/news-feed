import { addNews, retrieveNews } from "../../services";

export const createNews = async (req, res, next) => {
    try {
        const { id } = req.user
        const news = await addNews(id, req.body)
        res.status(201).json(news);
    } catch (error) {
        next(error)
    }
}
export const getNews = async (req, res, next) => {
  try {
      const { page, limit } = req.query;
      const news = await retrieveNews(Number(page), Number(limit));
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};