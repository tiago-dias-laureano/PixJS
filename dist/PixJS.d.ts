import { PixJSProps } from "./types";
export declare class CopyAndPastePixJS {
    private readonly data;
    private COUNT_MERCHANT_NAME;
    private COUNT_MERCHANT_CITY;
    private COUNT_TRANSACTION_AMOUNT;
    private COUNT_KEY;
    private COUNT_MERCHANT_ACCOUNT;
    private COUNT_ID;
    private PAYLOAD_FORMAT;
    private MERCHANT_ACCOUNT;
    private MERCHANT_CATEGORY_CODE;
    private TRANSACTION_CURRENCY;
    private COUNTRY_CODE;
    private TRANSACTION_AMOUNT;
    private MERCHANT_NAME;
    private MERCHANT_CITY;
    private ADDITIONAL_DATA_FIELD;
    private CRC_16;
    constructor(data: PixJSProps);
    private getNamePayload;
    private getCityPayload;
    private getAdditionDataFieldTemplate;
    private getMerchantAmountPayload;
    private calcCRC16CCITT;
    generatePayload(): string;
}
