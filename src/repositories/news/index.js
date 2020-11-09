import { async } from "regenerator-runtime";
import { NewsModel } from "../../models";

export const saveNews = async (news) => { 
    try {
        return await NewsModel.create(news);
    } catch (error) {
        throw error
    }
}

export const findNews = async (pageSize, documenToSkip) => {
    try {
        return await NewsModel.find()
          .populate("author")
          .limit(pageSize)
          .skip(documenToSkip);
    } catch (error) {
        throw error 
    }
};