export class HttpError extends Error {
    public statusCode: number;
    protected success: boolean;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.name = "HttpError";
        this.statusCode = statusCode;
        this.success = false;

        Object.setPrototypeOf(this, HttpError.prototype);
    }

    public toJSON() {
        return {
            success: this.success,
            message: this.message,
        };
    }
}
