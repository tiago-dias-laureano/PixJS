"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyAndPastePixJS = void 0;
const validators_1 = require("./validators");
const qrcode_1 = __importDefault(require("qrcode"));
const fs_1 = __importDefault(require("fs"));
const calcCRC16CCITT_1 = __importDefault(require("./utils/calcCRC16CCITT"));
class CopyAndPastePixJS {
    constructor(data) {
        this.data = data;
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
        this.QR_CODE_SAVE_PATH = this.data.path || null;
    }
    formatText(text) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z ]/g, "");
    }
    determineKeyType() {
        const key = this.data.key;
        if (validators_1.Validators.EMAIL_REGEX.test(key)) {
            this.data.key = validators_1.Validators.isEmail(key);
        }
        else if (key.replace(/\D/g, "").length === validators_1.Validators.CPF_LENGTH) {
            if (validators_1.Validators.isCPF(key)) {
                this.data.key = validators_1.Validators.isCPF(key);
            }
            else {
                if (key.replace(/\D/g, "").length === validators_1.Validators.VALID_PHONE_LENGTH ||
                    key.replace(/\D/g, "").length ===
                        validators_1.Validators.VALID_PHONE_WITH_COUNTRY_CODE_LENGTH) {
                    this.data.key = validators_1.Validators.isPhone(key);
                }
                else {
                    throw new Error("The key type is invalid");
                }
            }
        }
        else if (key.replace(/\D/g, "").length === validators_1.Validators.CNPJ_LENGTH) {
            this.data.key = validators_1.Validators.isCNPJ(key);
        }
        else if (key.length === validators_1.Validators.RANDOM_KEY_LENGTH) {
            this.data.key = validators_1.Validators.isRandomKey(key);
        }
        else {
            throw new Error("The key type is invalid");
        }
    }
    getNamePayload() {
        if (this.data.name.length > 25) {
            throw new Error("The name field is invalid, need a max lenght of 25");
        }
        if (parseInt(this.COUNT_MERCHANT_NAME) <= 9) {
            return `0${this.COUNT_MERCHANT_NAME}${this.data.name}`;
        }
        else {
            return `${this.COUNT_MERCHANT_NAME}${this.data.name}`;
        }
    }
    getCityPayload() {
        if (this.data.city.length > 25) {
            throw new Error("The name field is invalid, need a max lenght of 25");
        }
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
        if (fieldName === "name")
            this.data.name = this.formatText(this.data.name);
        if (fieldName === "city")
            this.data.city = this.formatText(this.data.city);
    }
    verifyFieldsAreCorrect() {
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
        return {
            message: "Your Copy and Paste has been generated",
            payload: this.generatePayload(),
            data: {
                name: this.data.name,
                key: this.data.key,
                amount: this.data.amount,
                city: this.data.city,
                id: this.data.id,
            },
        };
    }
    generateQRCodeTerminal() {
        qrcode_1.default.toString(this.generatePayload(), { type: "terminal", small: true }, (err, url) => {
            if (err)
                throw err;
            this.URL_QR_CODE = url;
        });
        console.log(this.URL_QR_CODE);
    }
    generateQRCodeImage() {
        if (!this.QR_CODE_SAVE_PATH) {
            throw new Error('The "path" argument must be of type string');
        }
        if (!fs_1.default.existsSync(this.QR_CODE_SAVE_PATH)) {
            fs_1.default.mkdirSync(this.QR_CODE_SAVE_PATH);
        }
        const filePath = `${this.QR_CODE_SAVE_PATH}${this.data.key}.png`;
        qrcode_1.default.toFile(filePath, this.generatePayload(), {}, (err) => {
            if (err)
                throw new Error(err.message);
        });
        return {
            message: "Your QRCode Image has been generated",
            payload: this.generatePayload(),
            path: `${filePath}`,
            image: `${this.data.key}.png`,
            data: {
                name: this.data.name,
                key: this.data.key,
                amount: this.data.amount,
                city: this.data.city,
                id: this.data.id,
            },
        };
    }
}
exports.CopyAndPastePixJS = CopyAndPastePixJS;
