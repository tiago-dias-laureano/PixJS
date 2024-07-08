import { PixJSProps, PixJSPropsImage } from "./types";
export declare class CopyAndPastePixJS {
    private readonly data;
    private COUNT_MERCHANT_NAME;
    private COUNT_MERCHANT_CITY;
    private COUNT_TRANSACTION_AMOUNT;
    private COUNT_KEY;
    private COUNT_MERCHANT_ACCOUNT;
    private COUNT_ID;
    private PAYLOAD;
    private MERCHANT_ACCOUNT;
    private MERCHANT_CATEGORY;
    private CURRENCY;
    private COUNTRY_CODE;
    private TRANSACTION_AMOUNT;
    private MERCHANT_NAME;
    private MERCHANT_CITY;
    private ADDITIONAL_DATA_FIELD;
    private CRC_16;
    private URL_QR_CODE;
    private QR_CODE_SAVE_PATH;
    constructor(data: PixJSProps | PixJSPropsImage);
    private formatText;
    private determineKeyType;
    private getNamePayload;
    private getCityPayload;
    private getAdditionDataFieldTemplate;
    private getMerchantAmountPayload;
    private verifyFieldIsRequired;
    private verifyFieldsAreCorrect;
    getTransactionAmount(): string;
    getMerchantName(): string;
    getMerchantCity(): string;
    getAdditionDataField(): string;
    private generatePayload;
    generate(): {
        message: string;
        payload: string;
        data: {
            name: string;
            key: string;
            amount: number;
            city: string;
            id: string;
        };
    };
    generateQRCodeTerminal(): void;
    generateQRCodeImage(): {
        message: string;
        payload: string;
        path: string;
        image: string;
        data: {
            name: string;
            key: string;
            amount: number;
            city: string;
            id: string;
        };
    };
}
