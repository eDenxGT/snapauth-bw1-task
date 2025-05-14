export const ERROR_MESSAGES = {
    REQUIRED_DATA: "Required data not provided",
    USER_NOT_FOUND: "User not found",
    USER_ID_NOT_PROVIDED: "User ID not provided",
    EMAIL_EXISTS: "Email Exists",
    WRONG_PASSWORD: "Wrong password",
    SET_DIFF_PASSWORD: "Set a new password other than you old.",
    UNAUTHORIZED: "Unauthorized access",
    SERVER_ERROR: "Internal server error",
    INVALID_CREDENTIALS: "Invalid email or password",
    VALIDATION_ERROR: "Validation failed",
} as const;


export const SUCCESS_MESSAGES = {
    USER_CREATED: "Account created successfully",
}



export const Messages = {
  USER_CREATED: "Account created successfully",
  REQUIRED_DATA: "Required data not provided",
  USER_NOT_FOUND: "User not found",
  USER_ID_NOT_PROVIDED: "User ID not provided",
  EMAIL_EXISTS: "Email Exists",
  WRONG_PASSWORD: "Wrong password",
  SET_DIFF_PASSWORD: "Set a new password other than you old.",
  UNAUTHORIZED: "Unauthorized access",
  SERVER_ERROR: "Internal server error",
  INVALID_CREDENTIALS: "Invalid email or password",
  VALIDATION_ERROR: "Validation failed",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  PASSWORD_UPDATE_SUCCESS: "Password reset successful",
  TOKEN_MISSING: "Access token missing",
  TOKEN_EXPIRED: "Invalid or expired token",
  TOKEN_INVALID_REUSED: "Invalid or reused token",
  TOKEN_VALID: "Token is valid",
  TOKEN_INVALID: "Token is invalid",
  REFRESH_TOKEN_INVALID: "Refresh token is invalid",
  IMAGE_UPLOAD_SUCCESS: "Images uploaded successfully",
  IMAGE_NOT_FOUND: "Image not found",
  IMAGE_DELETED: "Image deleted successfully",
  IMAGE_ORDER_WRONG: "imageOrder must be an array",
  IMAGE_ORDER_UPDATED: "Image order updated successfully",
  IMAGE_UPDATED: "Image updated successfully",
} as const;
