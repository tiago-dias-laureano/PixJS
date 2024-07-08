"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = calcCRC16CCITT;
function calcCRC16CCITT(payload) {
    let result = 0xffff;
    if (payload.length > 0) {
        for (let offset = 0; offset < payload.length; offset++) {
            result ^= payload.charCodeAt(offset) << 8;
            for (let bitwise = 0; bitwise < 8; bitwise++) {
                if ((result <<= 1) & 0x10000)
                    result ^= 0x1021;
                result &= 0xffff;
            }
        }
    }
    return result.toString(16).toUpperCase();
}
