import "dotenv/config";
import express from "express";
import * as loaders from "./loaders";

const app = express();

loaders.mongodb();

export default app;
