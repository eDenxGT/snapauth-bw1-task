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
    TOKEN_INVALID: "Token is invalid",
    TOKEN_EXPIRED: "Invalid or expired token",
    TOKEN_INVALID_REUSED: "Invalid or reused token",
    REFRESH_TOKEN_INVALID: "Refresh token is invalid",
    TOKEN_MISSING: "Token missing",
    INVALID_INPUT: "Invalid input",
} as const;

export const SUCCESS_MESSAGES = {
    USER_CREATED: "Account created successfully",
    TOKEN_VALID: "Token is valid",
    LOGIN_SUCCESS: "Login successful",
    LOGOUT_SUCCESS: "Logout successful",
}