import { UNAUTHORIZED } from "../utils/constants";
import { BaseError } from "./baseError";

export class AuthorizationError extends BaseError {
  constructor(message) {
    super(403, message || UNAUTHORIZED);
  }
}
