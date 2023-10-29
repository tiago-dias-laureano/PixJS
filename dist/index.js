"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyAndPaste = void 0;
const PixJS_1 = require("./PixJS");
function CopyAndPaste(props) {
    return new PixJS_1.CopyAndPastePixJS(props).generatePayload();
}
exports.CopyAndPaste = CopyAndPaste;
