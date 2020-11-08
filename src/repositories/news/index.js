import { async } from "regenerator-runtime";
import { NewsModel } from "../../models";


export const saveNews = async (news) => { 
    try {
        await NewsModel.create(news);
    } catch (error) {
        throw error
    }
}