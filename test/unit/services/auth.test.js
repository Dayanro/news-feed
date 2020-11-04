import "core-js/stable";
import "regenerator-runtime/runtime";

import * as authService from "../../../src/services/auth";
import * as userRepository from "../../../src/repositories/user";
import { fakeUserModel, fakeUserExtract, fakeUsername, fakePassword, fakeUser } from '../../mocks/authentications';
import {AuthenticationError,BadRequestError } from "../../../src/errors"

describe("Login", () => {
    it("should return a object with username and role", async () => {
        const spyfindUserByUsername = jest
            .spyOn(userRepository, "findUserByUsernameWithPassword")
            .mockResolvedValueOnce(fakeUserModel);
        
        const spyValidatePassword = jest
            .spyOn(fakeUserModel, "validatePassword")
            .mockReturnValueOnce(true);
     

        const result = await authService.login(fakeUsername, fakePassword);

        expect(spyfindUserByUsername).toHaveBeenCalledWith(fakeUsername);
        expect(spyValidatePassword).toHaveBeenCalledWith(fakePassword);
        expect(result.username).toEqual(fakeUserExtract.fakeUser.username);
        expect(result.role).toEqual(fakeUserExtract.fakeUser.role);
    });
  
    it("should throw an error when user does not exist ", async () => {
        jest.spyOn(userRepository, "findUserByUsernameWithPassword").mockResolvedValueOnce(null);
        try {
            await authService.login(fakeUsername, fakePassword);
        } catch (error) {
            expect(error).toBeInstanceOf(AuthenticationError);
        }

    })
    it("should throw an error when password is incorrect", async () => {
      jest
        .spyOn(userRepository, "findUserByUsernameWithPassword")
        .mockResolvedValueOnce(fakeUserModel);
      try {
        await authService.login(fakeUsername, "123");
      } catch (error) {
        expect(error).toBeInstanceOf(AuthenticationError);
      }
    });
  
      it("should throw an error when there is missing data in the request ", async () => {
        jest
          .spyOn(userRepository, "findUserByUsernameWithPassword")
          .mockResolvedValueOnce(fakeUserModel);
        try {
          await authService.login(fakeUsername);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestError);
        }
      });
})
