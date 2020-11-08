import express from "express";
import { createNews } from "../../controllers";
import { adminValidation, LoginAuth } from "../../middlewares";

const router = express.Router()

router.post("/", LoginAuth, adminValidation, createNews);

export const newsRoute = {path:'/news',router }