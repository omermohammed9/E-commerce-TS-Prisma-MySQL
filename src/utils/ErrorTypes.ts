 export class UserNotFoundError  extends Error {
    constructor(message?: string) {
        super(message || `User not found.`);
        this.name = `ErrorTypes`;
    }
}

export class OrderNotFoundError extends Error {
    constructor(message?: string) {
        super(message ||   `Order not found.`);
        this.name = `OrderNotFoundError`;
    }
}

export class InvalidPasswordError extends Error {
    constructor(message?: string) {
        super(message || `Invalid password.`);
        this.name = `InvalidPasswordError`;
    }
}

export class ProductNotFoundError extends Error {
    constructor(message?: string) {
        super(message || `Product not found.`);
        this.name = `ProductNotFoundError`;
    }
}