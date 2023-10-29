export declare class Validators {
    static required(value: string): boolean;
    static isEmail(email: string): {
        isValid: boolean;
        value?: string;
    };
    static isCPF(cpf: string): {
        isValid: boolean;
        value?: string;
    };
    static isCNPJ(cnpj: string): {
        isValid: boolean;
        value?: string;
    };
    static isPhone(phone: string): {
        isValid: boolean;
        value?: string;
    };
    static isRandomKey(key: string): {
        isValid: boolean;
        value?: string;
    };
}
