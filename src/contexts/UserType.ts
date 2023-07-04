export type UserType = {
  token: string;
  user: {
    id: string;
    nome: string;
    senha: string;
    created_at: Date;
    ultimoLogin: Date;
  };
};