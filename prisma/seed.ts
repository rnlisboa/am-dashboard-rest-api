import { Client } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '../generated/prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL!;
const client = new Client({ connectionString });
const adapter = new PrismaNeon(client);
const prisma = new PrismaClient({ adapter });

const PROFESSOR_ID = 'cml4fif2i0000dcj1fjkcwufl';

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDateInLastDays(days: number): Date {
  const now = new Date();
  const past = new Date();
  past.setDate(now.getDate() - days);
  return new Date(
    past.getTime() + Math.random() * (now.getTime() - past.getTime()),
  );
}

async function main() {
  console.log('Iniciando seed...');

  await prisma.cursoAluno.deleteMany();
  await prisma.curso.deleteMany();
  await prisma.aluno.deleteMany();
  await prisma.categoria.deleteMany();

  await prisma.categoria.createMany({
    data: [{ nome: 'Programação' }, { nome: 'Design' }, { nome: 'Negócios' }],
  });

  const categoriasDB = await prisma.categoria.findMany();

  await prisma.curso.createMany({
    data: [
      {
        name: 'Curso de JavaScript',
        description: 'Aprenda JavaScript do zero ao avançado',
        categoriaId: categoriasDB[0].id,
        professorId: PROFESSOR_ID,
        totalAulasCurso: 20,
      },
      {
        name: 'Curso de React',
        description: 'Crie aplicações modernas com React',
        categoriaId: categoriasDB[0].id,
        professorId: PROFESSOR_ID,
        totalAulasCurso: 18,
      },
      {
        name: 'UX/UI Design',
        description: 'Design de interfaces e experiência do usuário',
        categoriaId: categoriasDB[1].id,
        professorId: PROFESSOR_ID,
        totalAulasCurso: 12,
      },
      {
        name: 'Empreendedorismo Digital',
        description: 'Crie e escale negócios online',
        categoriaId: categoriasDB[2].id,
        professorId: PROFESSOR_ID,
        totalAulasCurso: 15,
      },
    ],
  });

  const cursosDB = await prisma.curso.findMany();

  const alunosData = Array.from({ length: 250 }).map((_, i) => ({
    name: `Aluno ${i + 1}`,
    email: `aluno${i + 1}@email.com`,
  }));

  await prisma.aluno.createMany({ data: alunosData });
  const alunosDB = await prisma.aluno.findMany();

  const inscricoes = [];

  for (const aluno of alunosDB) {
    const cursosAleatorios = cursosDB.filter(() => Math.random() > 0.3); // 70% chance por curso

    for (const curso of cursosAleatorios) {
      const aulasAssistidas = randomInt(0, curso.totalAulasCurso);
      const concluido = aulasAssistidas === curso.totalAulasCurso;

      inscricoes.push({
        alunoId: aluno.id,
        cursoId: curso.id,
        qtdAulasAssistidas: aulasAssistidas,
        concluido,
        dataInscricao: randomDateInLastDays(180), // 🔥 Aqui está a correção
      });
    }
  }

  await prisma.cursoAluno.createMany({ data: inscricoes });

  console.log('Seed finalizado com sucesso! 🚀');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
