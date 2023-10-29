import { PixJSProps } from "./types";

import { Validators } from "./validators";

import calcCRC16CCITT from "./utils/calcCRC16CCITT";

export class CopyAndPastePixJS {
  private COUNT_MERCHANT_NAME: string;
  private COUNT_MERCHANT_CITY: string;
  private COUNT_TRANSACTION_AMOUNT: string;
  private COUNT_KEY: string;
  private COUNT_MERCHANT_ACCOUNT: string;
  private COUNT_ID: string;

  private PAYLOAD: string;
  private MERCHANT_ACCOUNT: string;
  private MERCHANT_CATEGORY: string;
  private CURRENCY: string;
  private COUNTRY_CODE: string;
  private TRANSACTION_AMOUNT: string;
  private MERCHANT_NAME: string;
  private MERCHANT_CITY: string;
  private ADDITIONAL_DATA_FIELD: string;
  private CRC_16: string;

  constructor(private readonly data: PixJSProps) {
    this.verifyFieldsAreCorrect();
    this.verifyKeyType();

    this.COUNT_MERCHANT_NAME = data.name.length.toString();
    this.COUNT_MERCHANT_CITY = data.city.length.toString();
    this.COUNT_TRANSACTION_AMOUNT = data.amount.toFixed(2).length.toString();
    this.COUNT_KEY = data.key.length.toString();
    this.COUNT_MERCHANT_ACCOUNT = `0014BR.GOV.BCB.PIX01${this.COUNT_KEY}${data.key}`;
    this.COUNT_ID = data.id.length.toString();

    this.PAYLOAD = "000201";
    this.MERCHANT_ACCOUNT = `26${this.COUNT_MERCHANT_ACCOUNT.length}${this.COUNT_MERCHANT_ACCOUNT}`;
    this.MERCHANT_CATEGORY = "52040000";
    this.CURRENCY = "5303986";
    this.COUNTRY_CODE = "5802BR";
    this.TRANSACTION_AMOUNT = "54";
    this.MERCHANT_NAME = "59";
    this.MERCHANT_CITY = "60";
    this.ADDITIONAL_DATA_FIELD = "62";
    this.CRC_16 = "6304";
  }

  private verifyKeyType() {
    if (!this.data.key) {
      throw new Error("The key is required");
    } else {
      const key = this.data.key;
      // Verifica se o tipo da chave é email, cpf ou cnpj ou telefone
      if (Validators.isPhone(key).isValid) {
        this.data.key = Validators.isPhone(key).value!;
      } else if (Validators.isEmail(key).isValid) {
        this.data.key = Validators.isEmail(key).value!;
      } else if (Validators.isCPF(key).isValid) {
        this.data.key = Validators.isCPF(key).value!;
      } else if (Validators.isCNPJ(key).isValid) {
        this.data.key = Validators.isCNPJ(key).value!;
      } else if (Validators.isRandomKey(key).isValid) {
        this.data.key = Validators.isRandomKey(key).value!;
      } else {
        throw new Error("The key type is not valid");
      }
    }
  }

  private getNamePayload() {
    if (parseInt(this.COUNT_MERCHANT_NAME) <= 9) {
      return `0${this.COUNT_MERCHANT_NAME}${this.data.name}`;
    } else {
      return `${this.COUNT_MERCHANT_NAME}${this.data.name}`;
    }
  }

  private getCityPayload() {
    if (parseInt(this.COUNT_MERCHANT_CITY) <= 9) {
      return `0${this.COUNT_MERCHANT_CITY}${this.data.city}`;
    } else {
      return `${this.COUNT_MERCHANT_CITY}${this.data.city}`;
    }
  }

  private getAdditionDataFieldTemplate() {
    const addtionalDataFieldFormat = `050${this.COUNT_ID.toString()}${
      this.data.id
    }`;
    if (parseInt(this.COUNT_ID) <= 9) {
      return `${addtionalDataFieldFormat.length}050${this.COUNT_ID.toString()}${
        this.data.id
      }`;
    } else {
      return `${addtionalDataFieldFormat.length}05${this.COUNT_ID}${this.data.id}`;
    }
  }

  private getMerchantAmountPayload() {
    if (parseInt(this.COUNT_TRANSACTION_AMOUNT) <= 9) {
      return `0${this.COUNT_TRANSACTION_AMOUNT}${this.data.amount.toFixed(2)}`;
    } else {
      return `${this.COUNT_TRANSACTION_AMOUNT}${this.data.amount.toFixed(2)}`;
    }
  }

  private verifyFieldIsRequired(value: string, fieldName: string) {
    if (!Validators.required(value)) {
      throw new Error(`The value '${fieldName}' is required`);
    }
  }

  private verifyFieldsAreCorrect() {
    this.verifyFieldIsRequired(this.data.name, "name");
    this.verifyFieldIsRequired(this.data.city, "city");
    this.verifyFieldIsRequired(this.data.key, "key");
    this.verifyFieldIsRequired(this.data.id, "id");
  }

  getTransactionAmount() {
    return this.TRANSACTION_AMOUNT + this.getMerchantAmountPayload();
  }

  getMerchantName() {
    return this.MERCHANT_NAME + this.getNamePayload();
  }

  getMerchantCity() {
    return this.MERCHANT_CITY + this.getCityPayload();
  }

  getAdditionDataField() {
    return this.ADDITIONAL_DATA_FIELD + this.getAdditionDataFieldTemplate();
  }

  private generatePayload() {
    const payload = (
      this.PAYLOAD +
      this.MERCHANT_ACCOUNT +
      this.MERCHANT_CATEGORY +
      this.CURRENCY +
      this.getTransactionAmount() +
      this.COUNTRY_CODE +
      this.getMerchantName() +
      this.getMerchantCity() +
      this.getAdditionDataField() +
      this.CRC_16
    ).toString();

    return `${payload}${calcCRC16CCITT(payload)}`;
  }

  public generate(): string {
    return this.generatePayload();
  }
}
