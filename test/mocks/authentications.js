import { UserModel } from "../../src/models/user";

export const fakeUsername = 'Dayan'
export const fakePassword = 'dayan123'
export const fakeRole = 'USER'
let data = `${fakeUsername}:${fakePassword}`;
let buff = new Buffer(data);
let base64data = buff.toString("base64");
export const fakeAuthHeader = `Basic ${base64data}`;

export const fakeUser = {
    username: fakeUsername,
    password: fakePassword,
    role: fakeRole
};

export const fakeUserExtract = { fakeUser };

export const fakeUserModel = new UserModel(fakeUser);