export declare class Validators {
    static CPF_LENGTH: number;
    static CPF_LENGTH_WITH_MASK: number;
    static CNPJ_LENGTH: number;
    static CNPJ_LENGTH_WITH_MASK: number;
    static VALID_PHONE_LENGTH: number;
    static VALID_PHONE_WITH_COUNTRY_CODE_LENGTH: number;
    static RANDOM_KEY_LENGTH: number;
    static EMAIL_REGEX: RegExp;
    static required(value: string): boolean;
    static isEmail(email: string): string;
    static validateCPF(cpf: string): boolean;
    static isCPF(cpf: string): string | boolean;
    static isCNPJ(cnpj: string): string;
    static isPhone(phone: string): string;
    static isRandomKey(key: string): string;
}
