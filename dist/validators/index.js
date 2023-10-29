"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
class Validators {
    static required(value) {
        return value !== "";
    }
    static minLength(value, minLength) {
        return value.length >= minLength;
    }
    static maxLength(value, maxLength) {
        return value.length <= maxLength;
    }
    static isEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
}
exports.Validators = Validators;
