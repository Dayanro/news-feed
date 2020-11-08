import {saveNews} from "../../repositories/news"
import { BadRequestError } from "../../errors"


export const addNews = async (id, news) => {
    const { title, headline,content, date} = news
    try {
        if (!title || !headline || !content|| !date || !id ) throw new BadRequestError();
        news.author = id
        await saveNews(news)
    } catch (error) {
        throw error
    }
}