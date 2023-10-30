const { QrCodeTerminal, CopyAndPaste, QrCodeImage } = require("./dist");

const pix = QrCodeImage({
  amount: 10000.0,
  city: "Sao Paulo",
  id: "LOJA 01 coisa boa",
  key: "e015b7ed-b6bd-4c5a-bcb3-28f67559d716",
  name: "Tiago Dias Laureano",
  type: "random",
});
