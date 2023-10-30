const { CopyAndPaste } = require("./dist");

const randomPix = CopyAndPaste({
  name: "Pix",
  key: "e015b7ed-b6bd-4c5a-bcb3-28f67559d716",
  value: "123456789",
  amount: 10.0,
  city: "São Paulo",
  id: "123456789",
  type: "random",
});

const emailPix = CopyAndPaste({
  name: "Pix",
  key: "tiagodiaslaureano32@gmail.com",
  value: "123456789",
  amount: 10.0,
  city: "São Paulo",
  id: "123456789",
  type: "email",
});

const phonePix = CopyAndPaste({
  name: "Pix",
  key: "11999999999",
  value: "123456789",
  amount: 10.0,
  city: "São Paulo",
  id: "123456789",
  type: "phone",
});

const cnpjPix = CopyAndPaste({
  name: "Pix",
  key: "12345678912345",
  value: "123456789",
  amount: 10.0,
  city: "São Paulo",
  id: "123456789",
  type: "cnpj",
});

const cpfPix = CopyAndPaste({
  name: "Pix",
  key: "177.852.930-00",
  value: "123456789",
  amount: 10.0,
  city: "São Paulo",
  id: "123456789",
  type: "cpf",
});

console.log(randomPix);
console.log(emailPix);
console.log(phonePix);
console.log(cnpjPix);
console.log(cpfPix);
