export class Validators {
  static CPF_LENGTH = 11;
  static CPF_LENGTH_WITH_MASK = 14;

  static CNPJ_LENGTH = 14;
  static CNPJ_LENGTH_WITH_MASK = 18;

  static VALID_PHONE_LENGTH = 11;
  static VALID_PHONE_WITH_COUNTRY_CODE_LENGTH = 13;

  static RANDOM_KEY_LENGTH = 36;

  static EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  static required(value: string): boolean {
    return value !== null && value !== undefined && value !== "";
  }

  static isEmail(email: string): string {
    if (!this.EMAIL_REGEX.test(email)) {
      throw new Error("Invalid email address");
    }

    return email;
  }

  static isCPF(cpf: string): string {
    if (
      cpf.length !== this.CPF_LENGTH_WITH_MASK &&
      cpf.length !== this.CPF_LENGTH
    ) {
      throw new Error("Invalid CPF");
    }

    return cpf.replace(/\D/g, "");
  }

  static isCNPJ(cnpj: string): string {
    if (
      cnpj.length !== this.CNPJ_LENGTH_WITH_MASK &&
      cnpj.length !== this.CNPJ_LENGTH
    ) {
      throw new Error("Invalid CNPJ");
    }

    return cnpj.replace(/\D/g, "");
  }

  static isPhone(phone: string): string {
    let cleanedPhone = phone.replace(/\D/g, "");

    if (
      cleanedPhone.length !== this.VALID_PHONE_LENGTH &&
      cleanedPhone.length !== this.VALID_PHONE_WITH_COUNTRY_CODE_LENGTH
    ) {
      throw new Error("Invalid phone number");
    }

    if (cleanedPhone.startsWith("55")) {
      cleanedPhone = `+${cleanedPhone}`;
    } else {
      cleanedPhone = `+55${cleanedPhone}`;
    }

    return cleanedPhone;
  }

  static isRandomKey(key: string): string {
    if (key.length !== this.RANDOM_KEY_LENGTH) {
      throw new Error("Invalid key");
    }

    return key;
  }
}
