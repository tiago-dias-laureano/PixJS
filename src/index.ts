import { CopyAndPastePixJS } from "./PixJS";
import { PixJSProps, PixJSPropsImage } from "./types";

export function CopyAndPaste(props: PixJSProps): string {
  return new CopyAndPastePixJS(props).generate();
}

export function QrCodeTerminal(props: PixJSProps): string {
  return new CopyAndPastePixJS(props).generateQRCodeTerminal();
}

export function QrCodeImage(props: PixJSPropsImage) {
  new CopyAndPastePixJS(props).generateQRCodeImage();
}
