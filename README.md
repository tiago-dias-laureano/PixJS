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
  name: "", // Receptor name
  key: "", // The pix key
  amount: 0, // Amount
  city: "", // String without special characters ex: Sao Paulo
  id: "", // Payment identifier
  type: "", // "email" | "phone" | "cpf" | "cnpj" | "random"
});
```

- Generate QRCode Image Method

```javascript
const { QrCodeImage } = require("pixjs");

const pix = QrCodeImage({
  name: "", // Receptor name
  key: "", // The pix key
  amount: 0, // Amount
  city: "", // String without special characters ex: Sao Paulo
  id: "", // Payment identifier
  type: "", // "email" | "phone" | "cpf" | "cnpj" | "random",
  path: "", // ex: "src/qr-images/"
});
```

- Generate QRCode image in Terminal

```javascript
const { QrCodeTerminal } = require("pixjs");

const pix = QrCodeTerminal({
  name: "", // Receptor name
  key: "", // The pix key
  amount: 0, // Amount
  city: "", // String without special characters ex: Sao Paulo
  id: "", // Payment identifier
  type: "", // "email" | "phone" | "cpf" | "cnpj" | "random"
});
```

## ✅Supported methods

- Email (email@email.com)
- CPF (999.999.999-99)
- CNPJ (99.999.999/9999-99)
- Phone (+552199999-9999)
- Random Keys (e015b7ed-b6bd-4c5a-bcb3-28f67559d716)

## 🧑 Autores

Tiago Dias Laureano

- [GITHUB](https://www.github.com/tiago-dias-laureano)
- [INSTAGRAM](htts://instagram.com/tiagodiastl)
- [LINKEDIN](https://www.linkedin.com/in/tiago-dias-laureano/)

## 🔍 Referência

- [pix-payload](https://github.com/devcarlosalberto/pix-payload/tree/main)
