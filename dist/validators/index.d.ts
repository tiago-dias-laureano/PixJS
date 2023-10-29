export declare class Validators {
    static required(value: string): boolean;
    static minLength(value: string, minLength: number): boolean;
    static maxLength(value: string, maxLength: number): boolean;
    static isEmail(email: string): boolean;
}
