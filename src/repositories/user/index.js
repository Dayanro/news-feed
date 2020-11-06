import { UserModel } from "../../models/user";

export const findUserByUsernameWithPassword = async (username) => {
  try {
    return await UserModel.findOne({ username }).select("+password");
  } catch (error) {
    throw error;
  }
};
