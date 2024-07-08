# PixJS

Tool to generate “Copy and Paste” Pix payloads.

## 🔨 Installation

```bash
npm i pixjs
yarn add pixjs
```

## 💻 How to use

- Copy and Paste Method

```javascript
const { CopyAndPaste } = require("pixjs");

const copyAndPaste = CopyAndPaste({
  name: "Tiago Dias Laureano", // Receptor name
  key: "e015b7ed-b6bd-4c5a-bcb3-28f67559d716", // The pix key: email, phone, cpf, cnpj or randomkey
  amount: 1.0, // Amount
  city: "Rio De Janeiro", // The city name
  id: "PAGAMENTO", // Payment identifier
});

console.log(copyAndPaste);

/* RESULT
{
  message: 'Your Copy and Paste has been generated',
  payload: '00020126580014BR.GOV.BCB.PIX0136e015b7ed-b6bd-4c5a-bcb3-28f67559d71652040000530398654041.005802BR5919Tiago Dias Laureano6014Rio De Janeiro62130509PAGAMENTO63042F1D',
  data: {
    name: 'Tiago Dias Laureano',
    key: 'e015b7ed-b6bd-4c5a-bcb3-28f67559d716',
    amount: 1,
    city: 'Rio De Janeiro',
    id: 'PAGAMENTO'
  }
}
*/
```

- Generate QRCode Image Method

```javascript
const { QrCodeImage } = require("pixjs");

const copyAndPaste = QrCodeImage({
  name: "Tiago Dias Laureano", // Receptor name
  key: "e015b7ed-b6bd-4c5a-bcb3-28f67559d716", // The pix key: email, phone, cpf, cnpj or randomkey
  amount: 1.0, // Amount
  city: "Rio De Janeiro", // The city name
  id: "PAGAMENTO", // Payment identifier
  path: "src/qr-images/", // path to save images
});

/*RESULT
{
  message: 'Your QRCode Image has been generated',
  payload: '00020126580014BR.GOV.BCB.PIX0136e015b7ed-b6bd-4c5a-bcb3-28f67559d71652040000530398654041.005802BR5919Tiago Dias Laureano6014Rio De Janeiro62130509PAGAMENTO63042F1D',
  path: 'src/qr-images/e015b7ed-b6bd-4c5a-bcb3-28f67559d716.png',
  image: 'e015b7ed-b6bd-4c5a-bcb3-28f67559d716.png',
  data: {
    name: 'Tiago Dias Laureano',
    key: 'e015b7ed-b6bd-4c5a-bcb3-28f67559d716',
    amount: 1,
    city: 'Rio De Janeiro',
    id: 'PAGAMENTO'
  }
}
*/
```

- Generate QRCode image in Terminal

```javascript
const { QrCodeTerminal } = require("pixjs");

const copyAndPaste = QrCodeTerminal({
  name: "Tiago Dias Laureano", // Receptor name
  key: "e015b7ed-b6bd-4c5a-bcb3-28f67559d716", // The pix key: email, phone, cpf, cnpj or randomkey
  amount: 1.0, // Amount
  city: "Rio De Janeiro", // The city name
  id: "PAGAMENTO", // Payment identifier
});

console.log(copyAndPaste);

// Result: Show qrcode in terminal.
```

## ✅Supported methods

- Email (email@email.com)
- CPF (999.999.999-99) or (99999999999)
- CNPJ (99.999.999/9999-99) or (99999999999999)
- Phone (+552199999-9999) or (21999999999)
- Random Keys (e015b7ed-b6bd-4c5a-bcb3-28f67559d716)

## 🧑 Authors

Tiago Dias Laureano

- [GITHUB](https://www.github.com/tiago-dias-laureano)
- [INSTAGRAM](https://instagram.com/tiagolaureano.rio)
- [LINKEDIN](https://www.linkedin.com/in/tiago-dias-laureano/)

## 🔍 Reference

- [pix-payload](https://github.com/devcarlosalberto/pix-payload/tree/main)
