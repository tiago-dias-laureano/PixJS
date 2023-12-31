export type PixJSProps = {
  name: string;
  key: string;
  amount: number;
  city: string;
  id: string;
  type: "cpf" | "cnpj" | "phone" | "random" | "email";
};

export type PixJSPropsImage = {
  name: string;
  key: string;
  amount: number;
  city: string;
  id: string;
  type: "cpf" | "cnpj" | "phone" | "random" | "email";
  path?: string;
};
