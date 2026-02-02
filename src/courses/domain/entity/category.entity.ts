import { Categoria } from 'generated/prisma/client';

export class CategoryEntity implements Categoria {
  id: string;
  nome: string;
}
