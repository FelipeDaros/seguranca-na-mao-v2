export interface IUsuario {
  token: string;
  user: {
    id: string;
    nome: string;
    email: string;
    created_at: Date;
    ultimoLogin: Date;
    isAdmin: boolean;
  };
}
