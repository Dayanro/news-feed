import { UNAUTHORIZED } from "../../../src/utils/constants";
import { AuthorizationError } from "../../../src/errors";

describe(" AuthorizationError ", () => {
    const authorizationError = new AuthorizationError();
    it("should throw an 'You do not have the rigth permissions' if a message is not provided", () => {
      expect(authorizationError.message).toBe(UNAUTHORIZED);
    });
    it("should assign message if it is provided", () => {
      const errorMessage = new AuthorizationError("ERROR");
      expect(errorMessage.message).toBe("ERROR");
    });
});
