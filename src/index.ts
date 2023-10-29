import { CopyAndPastePixJS } from "./PixJS";
import { PixJSProps } from "./types";

export function CopyAndPaste(props: PixJSProps): string {
  return new CopyAndPastePixJS(props).generate();
}
