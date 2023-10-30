# PixJS

Tool to generate “Copy and Paste” Pix payloads.

## 🔨 Installation

```bash
npm i pixjs
yarn add pixjs
```

## 💻 How to use

- Email Method

```javascript
const { CopyAndPaste } = require("pixjs");

const copyAndPaste = CopyAndPaste({
  name: "Jhon Doe",
  key: "email@email.com",
  amount: 10.0,
  city: "New York",
  id: "Travel",
  type: "email",
});
```

- CPF Method

```javascript
const { CopyAndPaste } = require("pixjs");

const copyAndPaste = CopyAndPaste({
  name: "Jhon Doe",
  key: "999.999.999-99",
  amount: 10.0,
  city: "New York",
  id: "Travel",
  type: "cpf",
});
```

- CNPJ Method

```javascript
const { CopyAndPaste } = require("pixjs");

const copyAndPaste = CopyAndPaste({
  name: "Jhon Doe",
  key: "99.999.999/9999-99",
  amount: 10.0,
  city: "New York",
  id: "Travel",
  type: "cnpj",
});
```

- Phone Method

```javascript
const { CopyAndPaste } = require("pixjs");

const copyAndPaste = CopyAndPaste({
  name: "Jhon Doe",
  key: "+552199999-9999",
  amount: 10.0,
  city: "New York",
  id: "Travel",
  type: "phone",
});
```

- Random Keys Method

```javascript
const { CopyAndPaste } = require("pixjs");

const copyAndPaste = CopyAndPaste({
  name: "Jhon Doe",
  key: "e015b7ed-b6bd-4c5a-bcb3-28f67559d716",
  amount: 10.0,
  city: "New York",
  id: "Travel",
  type: "random",
});
```

## ✅Supported methods

- Email (email@email.com)
- CPF (999.999.999-99)
- CNPJ (99.999.999/9999-99)
- Phone (+552199999-9999)
- Random Keys (e015b7ed-b6bd-4c5a-bcb3-28f67559d716)

## 🗺️ Próximos passos

- Geração de QR Code direto no Terminal

- Geração de imagem do QR Code

## 🧑 Autores

- [@octokatherine](https://www.github.com/tiago-dias-laureano)

## 🔍 Referência

- [function calcCRC16CCITT](https://github.com/devcarlosalberto/pix-payload/tree/main)
