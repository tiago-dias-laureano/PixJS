"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyAndPastePixJS = void 0;
const calcCRC16CCITT_1 = __importDefault(require("./utils/calcCRC16CCITT"));
const validators_1 = require("./validators");
class CopyAndPastePixJS {
    constructor(data) {
        this.data = data;
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
        const addtionalDataFieldFormat = `050${this.COUNT_ID.toString()}${this.data.id}`;
        if (parseInt(this.COUNT_ID) <= 9) {
            return `${addtionalDataFieldFormat.length}050${this.COUNT_ID.toString()}${this.data.id}`;
        }
        else {
            return `${addtionalDataFieldFormat.length}05${this.COUNT_ID}${this.data.id}`;
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
    verifyFieldIsRequired(value, fieldName) {
        if (!validators_1.Validators.required(value)) {
            throw new Error(`The value '${fieldName}' is required`);
        }
    }
    verifyFieldsAreCorrect() {
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
    generatePayload() {
        this.verifyFieldsAreCorrect();
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
}
exports.CopyAndPastePixJS = CopyAndPastePixJS;
