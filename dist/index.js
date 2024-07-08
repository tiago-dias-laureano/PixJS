"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyAndPaste = CopyAndPaste;
exports.QrCodeTerminal = QrCodeTerminal;
exports.QrCodeImage = QrCodeImage;
const PixJS_1 = require("./PixJS");
function CopyAndPaste(props) {
    return new PixJS_1.CopyAndPastePixJS(props).generate();
}
function QrCodeTerminal(props) {
    new PixJS_1.CopyAndPastePixJS(props).generateQRCodeTerminal();
}
function QrCodeImage(props) {
    return new PixJS_1.CopyAndPastePixJS(props).generateQRCodeImage();
}
