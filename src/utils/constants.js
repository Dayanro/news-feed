
// Patterns
export const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;

// Encrypt
export const SALT = 10;

// Routes
export const PREFIX_API_URL = "/api";

// Roles
export const ROLE_ADMIN = "ADMIN"
export const ROLE_USER ="USER"

//Error Messages
export const INVALID_CREDENTIALS = "Invalid Credentials"
export const BAD_REQUEST = "Invalid request missing data";
export const UNAUTHORIZED= "You do not have the rigth permissions"
