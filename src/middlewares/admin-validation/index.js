import { ROLE_ADMIN } from "../../utils/constants";
import { AuthorizationError } from "../../errors";

export const adminValidation = (req, res, next) => {
  if (req.user.role !== ROLE_ADMIN) throw new AuthorizationError();
  next();
};
