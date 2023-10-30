"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrCodeImage = exports.QrCodeTerminal = exports.CopyAndPaste = void 0;
const PixJS_1 = require("./PixJS");
function CopyAndPaste(props) {
    return new PixJS_1.CopyAndPastePixJS(props).generate();
}
exports.CopyAndPaste = CopyAndPaste;
function QrCodeTerminal(props) {
    return new PixJS_1.CopyAndPastePixJS(props).generateQRCodeTerminal();
}
exports.QrCodeTerminal = QrCodeTerminal;
function QrCodeImage(props) {
    new PixJS_1.CopyAndPastePixJS(props).generateQRCodeImage();
}
exports.QrCodeImage = QrCodeImage;
