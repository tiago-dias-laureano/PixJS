export type PixJSProps = {
  name: string;
  key: string;
  amount: number;
  city: string;
  id: string;
};

export type PixJSPropsImage = {
  name: string;
  key: string;
  amount: number;
  city: string;
  id: string;
  path?: string;
};

export type ResponsePixJSQRCodeImage = {
  message: string;
  path: string;
  payload: string;
  image: string;
  data: {
    name: string;
    key: string;
    amount: number;
    city: string;
    id: string;
  };
};

export type ResponsePixJSCopyAndPaste = {
  message: string;
  payload: string;
  data: {
    name: string;
    key: string;
    amount: number;
    city: string;
    id: string;
  };
};
