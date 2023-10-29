"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyAndPastePixJS = void 0;
class CopyAndPastePixJS {
    constructor(data) {
        this.data = data;
        this.COUNT_MERCHANT_NAME = data.name.length.toString();
        this.COUNT_MERCHANT_CITY = data.city.length.toString();
        this.COUNT_TRANSACTION_AMOUNT = data.amount.toFixed(2).length.toString();
        this.COUNT_KEY = data.key.length.toString();
        this.COUNT_MERCHANT_ACCOUNT = `0014BR.GOV.BCB.PIX01${this.COUNT_KEY}${data.key}`;
        this.COUNT_ID = data.id.length.toString();
        this.PAYLOAD_FORMAT = "000201";
        this.MERCHANT_ACCOUNT = `26${this.COUNT_MERCHANT_ACCOUNT.length}${this.COUNT_MERCHANT_ACCOUNT}`;
        this.MERCHANT_CATEGORY_CODE = "52040000";
        this.TRANSACTION_CURRENCY = "5303986";
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
    calcCRC16CCITT(subject) {
        let result = 0xffff;
        if (subject.length > 0) {
            for (let offset = 0; offset < subject.length; offset++) {
                result ^= subject.charCodeAt(offset) << 8;
                for (let bitwise = 0; bitwise < 8; bitwise++) {
                    if ((result <<= 1) & 0x10000)
                        result ^= 0x1021;
                    result &= 0xffff;
                }
            }
        }
        return result.toString(16).toUpperCase();
    }
    generatePayload() {
        const payload = `${this.PAYLOAD_FORMAT}${this.MERCHANT_ACCOUNT}${this.MERCHANT_CATEGORY_CODE}${this.TRANSACTION_CURRENCY}${this.TRANSACTION_AMOUNT + this.getMerchantAmountPayload()}${this.COUNTRY_CODE}${this.MERCHANT_NAME + this.getNamePayload()}${this.MERCHANT_CITY + this.getCityPayload()}${this.ADDITIONAL_DATA_FIELD + this.getAdditionDataFieldTemplate()}${this.CRC_16}`;
        return `${payload}${this.calcCRC16CCITT(payload)}`;
    }
}
exports.CopyAndPastePixJS = CopyAndPastePixJS;
