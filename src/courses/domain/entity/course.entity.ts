import { Curso } from 'generated/prisma/client';

export class Course implements Curso {
  id: string;
  name: string;
  description: string;
  categoriaId: string;
  professorId: string;
  totalAulasCurso: number;
}
