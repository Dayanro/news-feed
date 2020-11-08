import { BaseError } from "../../../src/errors";

describe("BaseError", () => {
  const baseError = new BaseError();
  it("should throw an  500 if status is not provided", () => {
    expect(baseError.statusCode).toBe(500);
  });
  it("should assign statusCode if it is provided", () => {
    const errorMessage = new BaseError(400, "ERROR");
    expect(errorMessage.statusCode).toBe(400);
  });
  it("should show a Internal error in case that message is not provided", () => {
    expect(baseError.message).toBe("Internal error");
  });
  it("should assign message if it is provided", () => {
    const errorMessage = new BaseError(400, "ERROR");
    expect(errorMessage.message).toBe("ERROR");
  });
});
