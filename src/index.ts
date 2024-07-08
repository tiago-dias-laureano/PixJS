import { CopyAndPastePixJS } from "./PixJS";
import {
  PixJSProps,
  PixJSPropsImage,
  ResponsePixJSCopyAndPaste,
  ResponsePixJSQRCodeImage,
} from "./types";

export function CopyAndPaste(props: PixJSProps): ResponsePixJSCopyAndPaste {
  return new CopyAndPastePixJS(props).generate();
}

export function QrCodeTerminal(props: PixJSProps) {
  new CopyAndPastePixJS(props).generateQRCodeTerminal();
}

export function QrCodeImage(props: PixJSPropsImage): ResponsePixJSQRCodeImage {
  return new CopyAndPastePixJS(props).generateQRCodeImage();
}
