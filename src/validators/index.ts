export class Validators {
  static required(value: string): boolean {
    return value !== "";
  }

  static minLength(value: string, minLength: number): boolean {
    return value.length >= minLength;
  }

  static maxLength(value: string, maxLength: number): boolean {
    return value.length <= maxLength;
  }

  static isEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
