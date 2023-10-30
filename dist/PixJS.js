"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyAndPastePixJS = void 0;
const validators_1 = require("./validators");
const qrcode_1 = __importDefault(require("qrcode"));
const calcCRC16CCITT_1 = __importDefault(require("./utils/calcCRC16CCITT"));
class CopyAndPastePixJS {
    constructor(data) {
        this.data = data;
        this.verifyFieldsAreCorrect();
        this.verifyKeyType();
        this.COUNT_MERCHANT_NAME = data.name.length.toString();
        this.COUNT_MERCHANT_CITY = data.city.length.toString();
        this.COUNT_TRANSACTION_AMOUNT = data.amount.toFixed(2).length.toString();
        this.COUNT_KEY = data.key.length.toString();
        this.COUNT_MERCHANT_ACCOUNT = `0014BR.GOV.BCB.PIX01${this.COUNT_KEY}${data.key}`;
        this.COUNT_ID = data.id.replace(/\s+/g, "").length.toString();
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
    }
    verifyKeyType() {
        if (!this.data.type)
            throw new Error("The key type is required");
        switch (this.data.type) {
            case "cpf":
                this.data.key = validators_1.Validators.isCPF(this.data.key);
                break;
            case "cnpj":
                this.data.key = validators_1.Validators.isCNPJ(this.data.key);
                break;
            case "phone":
                this.data.key = validators_1.Validators.isPhone(this.data.key);
                break;
            case "random":
                this.data.key = validators_1.Validators.isRandomKey(this.data.key);
                break;
            case "email":
                this.data.key = validators_1.Validators.isEmail(this.data.key);
                break;
            default:
                throw new Error("The key type is invalid");
        }
    }
    getNamePayload() {
        if (parseInt(this.COUNT_MERCHANT_NAME) <= 9) {
            return `0${this.COUNT_MERCHANT_NAME}${this.data.name}`;
        }
        else {
            return `${this.COUNT_MERCHANT_NAME}${this.data.name}`;
        }
    }
    getCityPayload() {
        if (parseInt(this.COUNT_MERCHANT_CITY) <= 9) {
            return `0${this.COUNT_MERCHANT_CITY}${this.data.city}`;
        }
        else {
            return `${this.COUNT_MERCHANT_CITY}${this.data.city}`;
        }
    }
    getAdditionDataFieldTemplate() {
        if (parseInt(this.COUNT_ID) <= 9) {
            const addtionalDataFieldFormat = `050${this.COUNT_ID.toString()}${this.data.id.replace(/\s+/g, "")}`;
            return `${addtionalDataFieldFormat.length}050${this.COUNT_ID.toString()}${this.data.id.replace(/\s+/g, "")}`;
        }
        else {
            const addtionalDataFieldFormat = `05${this.COUNT_ID.toString()}${this.data.id.replace(/\s+/g, "")}`;
            return `${addtionalDataFieldFormat.length}05${this.COUNT_ID}${this.data.id.replace(/\s+/g, "")}`;
        }
    }
    getMerchantAmountPayload() {
        if (parseInt(this.COUNT_TRANSACTION_AMOUNT) <= 9) {
            return `0${this.COUNT_TRANSACTION_AMOUNT}${this.data.amount.toFixed(2)}`;
        }
        else {
            return `${this.COUNT_TRANSACTION_AMOUNT}${this.data.amount.toFixed(2)}`;
        }
    }
    verifyFieldIsRequired(value, fieldName, minLenght) {
        if (!validators_1.Validators.required(value)) {
            throw new Error(`The value '${fieldName}' is required`);
        }
        if (minLenght && value.length < minLenght) {
            throw new Error(`The value '${fieldName}' is invalid, need a min lenght of ${minLenght}`);
        }
    }
    verifyFieldsAreCorrect() {
        this.verifyFieldIsRequired(this.data.name, "name");
        this.verifyFieldIsRequired(this.data.city, "city");
        this.verifyFieldIsRequired(this.data.key, "key");
        this.verifyFieldIsRequired(this.data.id, "id", 6);
        this.verifyFieldIsRequired(this.data.type, "type");
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
    generatePayload() {
        const payload = (this.PAYLOAD +
            this.MERCHANT_ACCOUNT +
            this.MERCHANT_CATEGORY +
            this.CURRENCY +
            this.getTransactionAmount() +
            this.COUNTRY_CODE +
            this.getMerchantName() +
            this.getMerchantCity() +
            this.getAdditionDataField() +
            this.CRC_16).toString();
        return `${payload}${(0, calcCRC16CCITT_1.default)(payload)}`;
    }
    generate() {
        return this.generatePayload();
    }
    generateQRCodeTerminal() {
        qrcode_1.default.toString(this.generatePayload(), { type: "terminal", small: true }, (err, url) => {
            if (err)
                throw err;
            this.URL_QR_CODE = url;
        });
        console.log(this.generatePayload());
        return this.URL_QR_CODE;
    }
    generateQRCodeImage() {
        qrcode_1.default.toFile(`${this.data.key}.png`, this.generatePayload(), {}, (err) => {
            console.log(`Your QRCode Image was been generated: ${this.data.key}.png`);
        });
    }
}
exports.CopyAndPastePixJS = CopyAndPastePixJS;
