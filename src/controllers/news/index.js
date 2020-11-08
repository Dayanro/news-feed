import { addNews } from "../../services";

export const createNews = async (req, res, next) => {
    try {
        const { id } = req.user
        const news = await addNews(id, req.body)
        res.status(201).send()
    } catch (error) {
        next(error)
    }
}