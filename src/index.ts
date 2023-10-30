import { CopyAndPastePixJS } from "./PixJS";
import { PixJSProps } from "./types";

export function CopyAndPaste(props: PixJSProps): string {
  return new CopyAndPastePixJS(props).generate();
}

export function QrCodeTerminal(props: PixJSProps): string {
  return new CopyAndPastePixJS(props).generateQRCodeTerminal();
}

export function QrCodeImage(props: PixJSProps) {
  new CopyAndPastePixJS(props).generateQRCodeImage();
}
