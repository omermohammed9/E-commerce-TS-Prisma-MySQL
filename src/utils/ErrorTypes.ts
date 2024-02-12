export class UserNotFoundError  extends Error {
    constructor(message?: string) {
        super(message || "User not found.");
        this.name = "ErrorTypes";
    }
}

export class InvalidPasswordError extends Error {
    constructor(message?: string) {
        super(message || "Invalid password.");
        this.name = "InvalidPasswordError";
    }
}