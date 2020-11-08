
require("dotenv").config({ path: require("find-config")(".env") });
import { mongoConnection, mongoDisconnect } from "../utils/dbConection";
import { UserModel } from "../models/user";
import "core-js/stable";
import "regenerator-runtime/runtime";


const user = [
  {
    username: "Admin",
    password: "©",
    role: "ADMIN",
  },
  {
    username: "User",
    password: "User123",
    role: "USER",
  },
];

const createUsers = async () => {
  try {
    const db = await mongoConnection;
    UserModel.collection.drop();
    await UserModel.create(user);
  } catch (error) {
    console.error({ error }
    );
  } finally {
    mongoDisconnect();
  }
};

createUsers();
