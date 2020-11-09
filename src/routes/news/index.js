import express from "express";
import { createNews, getNews } from "../../controllers";
import { adminValidation, LoginAuth } from "../../middlewares";

const router = express.Router()
router.get("/", LoginAuth, getNews);
router.post("/", LoginAuth, adminValidation, createNews);


export const newsRoute = {path:'/news',router }