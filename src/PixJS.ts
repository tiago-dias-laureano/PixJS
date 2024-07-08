import { PixJSProps, PixJSPropsImage } from "./types";
import { Validators } from "./validators";
import QRcode from "qrcode";
import fs from "fs";

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

  private URL_QR_CODE: string;
  private QR_CODE_SAVE_PATH: string | null;

  constructor(private readonly data: PixJSProps | PixJSPropsImage) {
    this.verifyFieldsAreCorrect();
    this.determineKeyType();

    this.COUNT_MERCHANT_NAME = this.data.name.length.toString();
    this.COUNT_MERCHANT_CITY = this.data.city.length.toString();
    this.COUNT_TRANSACTION_AMOUNT = this.data.amount
      .toFixed(2)
      .length.toString();
    this.COUNT_KEY = this.data.key.length.toString();
    this.COUNT_MERCHANT_ACCOUNT = `0014BR.GOV.BCB.PIX01${this.COUNT_KEY}${this.data.key}`;
    this.COUNT_ID = this.data.id.replace(/\s+/g, "").length.toString();

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

    this.URL_QR_CODE = "";
    this.QR_CODE_SAVE_PATH = (this.data as PixJSPropsImage).path || null;
  }

  private formatText(text: string) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z ]/g, "");
  }
  private determineKeyType() {
    const key = this.data.key;

    if (Validators.EMAIL_REGEX.test(key)) {
      this.data.key = Validators.isEmail(key);
    } else if (key.replace(/\D/g, "").length === Validators.CPF_LENGTH) {
      if (Validators.isCPF(key)) {
        this.data.key = Validators.isCPF(key) as string;
      } else {
        if (
          key.replace(/\D/g, "").length === Validators.VALID_PHONE_LENGTH ||
          key.replace(/\D/g, "").length ===
            Validators.VALID_PHONE_WITH_COUNTRY_CODE_LENGTH
        ) {
          this.data.key = Validators.isPhone(key);
        } else {
          throw new Error("The key type is invalid");
        }
      }
    } else if (key.replace(/\D/g, "").length === Validators.CNPJ_LENGTH) {
      this.data.key = Validators.isCNPJ(key);
    } else if (key.length === Validators.RANDOM_KEY_LENGTH) {
      this.data.key = Validators.isRandomKey(key);
    } else {
      throw new Error("The key type is invalid");
    }
  }

  private getNamePayload() {
    if (this.data.name.length > 25) {
      throw new Error("The name field is invalid, need a max lenght of 25");
    }

    if (parseInt(this.COUNT_MERCHANT_NAME) <= 9) {
      return `0${this.COUNT_MERCHANT_NAME}${this.data.name}`;
    } else {
      return `${this.COUNT_MERCHANT_NAME}${this.data.name}`;
    }
  }

  private getCityPayload() {
    if (this.data.city.length > 25) {
      throw new Error("The name field is invalid, need a max lenght of 25");
    }

    if (parseInt(this.COUNT_MERCHANT_CITY) <= 9) {
      return `0${this.COUNT_MERCHANT_CITY}${this.data.city}`;
    } else {
      return `${this.COUNT_MERCHANT_CITY}${this.data.city}`;
    }
  }

  private getAdditionDataFieldTemplate() {
    if (parseInt(this.COUNT_ID) <= 9) {
      const addtionalDataFieldFormat = `050${this.COUNT_ID.toString()}${this.data.id.replace(
        /\s+/g,
        ""
      )}`;
      return `${
        addtionalDataFieldFormat.length
      }050${this.COUNT_ID.toString()}${this.data.id.replace(/\s+/g, "")}`;
    } else {
      const addtionalDataFieldFormat = `05${this.COUNT_ID.toString()}${this.data.id.replace(
        /\s+/g,
        ""
      )}`;
      return `${addtionalDataFieldFormat.length}05${
        this.COUNT_ID
      }${this.data.id.replace(/\s+/g, "")}`;
    }
  }

  private getMerchantAmountPayload() {
    if (parseInt(this.COUNT_TRANSACTION_AMOUNT) <= 9) {
      return `0${this.COUNT_TRANSACTION_AMOUNT}${this.data.amount.toFixed(2)}`;
    } else {
      return `${this.COUNT_TRANSACTION_AMOUNT}${this.data.amount.toFixed(2)}`;
    }
  }

  private verifyFieldIsRequired(
    value: string,
    fieldName: string,
    minLenght?: number
  ) {
    if (!Validators.required(value)) {
      throw new Error(`The value '${fieldName}' is required`);
    }

    if (minLenght && value.length < minLenght) {
      throw new Error(
        `The value '${fieldName}' is invalid, need a min lenght of ${minLenght}`
      );
    }

    if (fieldName === "name") this.data.name = this.formatText(this.data.name);
    if (fieldName === "city") this.data.city = this.formatText(this.data.city);
  }

  private verifyFieldsAreCorrect() {
    this.verifyFieldIsRequired(this.data.name, "name");
    this.verifyFieldIsRequired(this.data.city, "city");
    this.verifyFieldIsRequired(this.data.key, "key");
    this.verifyFieldIsRequired(this.data.id, "id", 6);
  }

  getTransactionAmount() {
    if (this.data.amount < 0.0) {
      throw new Error("The amount field is invalid, need a value >= 0");
    }
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

  public generateQRCodeTerminal(): string {
    QRcode.toString(
      this.generatePayload(),
      { type: "terminal", small: true },
      (err, url) => {
        if (err) throw err;
        this.URL_QR_CODE = url;
      }
    );

    console.log(this.generatePayload());

    return this.URL_QR_CODE;
  }

  public generateQRCodeImage(): {
    message: string;
    path: string;
    payload: string;
  } {
    if (!this.QR_CODE_SAVE_PATH) {
      throw new Error('The "path" argument must be of type string');
    }

    if (!fs.existsSync(this.QR_CODE_SAVE_PATH as string)) {
      fs.mkdirSync(this.QR_CODE_SAVE_PATH as string);
    }

    QRcode.toFile(
      `${
        this.QR_CODE_SAVE_PATH
          ? this.QR_CODE_SAVE_PATH + this.data.key
          : this.data.key
      }.png`,
      this.generatePayload(),
      {},
      (err) => {
        if (err) throw new Error(err.message);
      }
    );

    return {
      message: "Your QRCode Image was been generated",
      path: this.QR_CODE_SAVE_PATH + this.data.key,
      payload: this.generatePayload(),
    };
  }
}
