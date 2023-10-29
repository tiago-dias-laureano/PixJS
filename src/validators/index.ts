export class Validators {
  static required(value: string): boolean {
    return value !== "" && value !== undefined && value !== null;
  }

  static isEmail(email: string): { isValid: boolean; value?: string } {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return {
      isValid: emailRegex.test(email),
      value: email,
    };
  }

  static isCPF(cpf: string): { isValid: boolean; value?: string } {
    const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    if (
      (cpfRegex.test(cpf) && phoneRegex.test(cpf) === false) ||
      (cpf.length == 11 && phoneRegex.test(cpf) === false)
    ) {
      return {
        isValid: true,
        value: cpf.replace(".", "").replace(".", "").replace("-", ""),
      };
    } else {
      return {
        isValid: false,
      };
    }
  }

  static isCNPJ(cnpj: string): { isValid: boolean; value?: string } {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    if (cnpjRegex.test(cnpj) || cnpj.length == 14) {
      return {
        isValid: true,
        value: cnpj
          .replace(".", "")
          .replace(".", "")
          .replace("-", "")
          .replace("/", ""),
      };
    } else {
      return {
        isValid: false,
      };
    }
  }

  static isPhone(phone: string): { isValid: boolean; value?: string } {
    const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

    if (phoneRegex.test(phone) || phone.length == 11) {
      return {
        isValid: true,
        value: phone.replace(/\D/g, ""),
      };
    } else {
      return {
        isValid: false,
      };
    }
  }

  static isRandomKey(key: string): { isValid: boolean; value?: string } {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (uuidRegex.test(key)) {
      return {
        isValid: true,
        value: key,
      };
    } else {
      return {
        isValid: false,
      };
    }
  }
}
