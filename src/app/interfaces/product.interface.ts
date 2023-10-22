import { Categoria } from "./category.interface";

export interface Persona {
  id?: number;
  nombre?: string;
  apellido: string;
  email?: string;
  saldo?: number;
  //idCategoria?: number;
  //dCategoria?: Categoria;
}
