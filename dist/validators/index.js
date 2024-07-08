"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
class Validators {
    static required(value) {
        return value !== null && value !== undefined && value !== "";
    }
    static isEmail(email) {
        if (!this.EMAIL_REGEX.test(email)) {
            throw new Error("Invalid email address");
        }
        return email;
    }
    static validateCPF(cpf) {
        // Verificar se todos os dígitos são iguais (ex: 000.000.000-00)
        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }
        let sum = 0;
        let remainder;
        // Verifica o primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }
        if (remainder !== parseInt(cpf.substring(9, 10))) {
            return false;
        }
        // Verifica o segundo dígito verificador
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }
        if (remainder !== parseInt(cpf.substring(10, 11))) {
            return false;
        }
        return true;
    }
    static isCPF(cpf) {
        if (cpf.length !== this.CPF_LENGTH_WITH_MASK &&
            cpf.length !== this.CPF_LENGTH)
            return false;
        const cleanCpf = cpf.replace(/\D/g, "");
        if (!this.validateCPF(cleanCpf)) {
            return false;
        }
        return cleanCpf;
    }
    static isCNPJ(cnpj) {
        if (cnpj.length !== this.CNPJ_LENGTH_WITH_MASK &&
            cnpj.length !== this.CNPJ_LENGTH) {
            throw new Error("Invalid CNPJ");
        }
        return cnpj.replace(/\D/g, "");
    }
    static isPhone(phone) {
        let cleanedPhone = phone.replace(/\D/g, "");
        if (cleanedPhone.length !== this.VALID_PHONE_LENGTH &&
            cleanedPhone.length !== this.VALID_PHONE_WITH_COUNTRY_CODE_LENGTH) {
            throw new Error("Invalid phone number");
        }
        if (cleanedPhone.startsWith("55")) {
            cleanedPhone = `+${cleanedPhone}`;
        }
        else {
            cleanedPhone = `+55${cleanedPhone}`;
        }
        return cleanedPhone;
    }
    static isRandomKey(key) {
        if (key.length !== this.RANDOM_KEY_LENGTH) {
            throw new Error("Invalid key");
        }
        return key;
    }
}
exports.Validators = Validators;
Validators.CPF_LENGTH = 11;
Validators.CPF_LENGTH_WITH_MASK = 14;
Validators.CNPJ_LENGTH = 14;
Validators.CNPJ_LENGTH_WITH_MASK = 18;
Validators.VALID_PHONE_LENGTH = 11;
Validators.VALID_PHONE_WITH_COUNTRY_CODE_LENGTH = 13;
Validators.RANDOM_KEY_LENGTH = 36;
Validators.EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
