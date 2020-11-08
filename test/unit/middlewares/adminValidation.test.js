import "core-js/stable";
import "regenerator-runtime/runtime";

import httpMock from "node-mocks-http";
import { fakeAuthHeader} from "../../mocks/authentications";
import { ROLE_ADMIN } from "../../../src/utils/constants";
import { adminValidation } from "../../../src/middlewares";


describe("Middleware Admin Validations", () => {
  let res, req, next;
  beforeEach(() => {
    res = httpMock.createResponse();
    req = httpMock.createRequest();
    req.headers.authorization = fakeAuthHeader;
    next = jest.fn();
    jest.clearAllMocks();
  });
  it("should  allow accesss if role is admin", () => {
    req.user = { role: ROLE_ADMIN };
    adminValidation(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should throw an error if the user does not have the admin role", () => {
    try {
      adminValidation(req, res, next);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
