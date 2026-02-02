import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CourseFilters } from '../domain/interface/course-filters.interface';

@Injectable()
export class CourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllStatsWithFilter(filters?: CourseFilters) {
  const whereCurso: any = {};
  const whereInscricao: any = {};

  if (filters?.search) {
    whereCurso.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  if (filters?.categoriaId) {
    whereCurso.categoriaId = filters.categoriaId;
  }

  if (filters?.from || filters?.to) {
    whereInscricao.dataInscricao = {};
    if (filters.from) whereInscricao.dataInscricao.gte = filters.from;
    if (filters.to) whereInscricao.dataInscricao.lte = filters.to;
  }

  if (filters?.status) {
    whereInscricao.concluido = filters.status === 'concluido';
  }

  const cursos = await this.prisma.curso.findMany({
    where: whereCurso,
    include: {
      categoria: true,
      inscritos: {
        where: whereInscricao,
        select: {
          dataInscricao: true,
          concluido: true,
          qtdAulasAssistidas: true,
        },
      },
    },
  });

  const barrasMap = new Map<string, number>();

  cursos.forEach((curso) => {
    const categoria = curso.categoria.nome;
    const inscritos = curso.inscritos.length;
    barrasMap.set(categoria, (barrasMap.get(categoria) || 0) + inscritos);
  });

  const graficoBarras = Array.from(barrasMap.entries()).map(
    ([categoria, total]) => ({
      categoria,
      totalAlunos: total,
    }),
  );


  const linhaMap = new Map<string, number>();

  cursos.forEach((curso) => {
    curso.inscritos.forEach((inscricao) => {
      const dia = inscricao.dataInscricao.toISOString().split('T')[0];
      linhaMap.set(dia, (linhaMap.get(dia) || 0) + 1);
    });
  });

  const graficoLinha = Array.from(linhaMap.entries())
    .sort()
    .map(([data, total]) => ({
      data,
      totalInscricoes: total,
    }));

  let concluidos = 0;
  let emAndamento = 0;

  cursos.forEach((curso) => {
    curso.inscritos.forEach((i) => {
      if (i.concluido) concluidos++;
      else emAndamento++;
    });
  });

  const graficoPizza = [
    { status: 'Concluído', total: concluidos },
    { status: 'Em andamento', total: emAndamento },
  ];

  const areaMap = new Map<string, number>();

  cursos.forEach((curso) => {
    curso.inscritos.forEach((i) => {
      const dia = i.dataInscricao.toISOString().split('T')[0];
      areaMap.set(dia, (areaMap.get(dia) || 0) + i.qtdAulasAssistidas);
    });
  });

  let acumulado = 0;
  const graficoArea = Array.from(areaMap.entries())
    .sort()
    .map(([data, totalDia]) => {
      acumulado += totalDia;
      return {
        data,
        totalAulasAssistidas: acumulado,
      };
    });

  return {
    filtrosAplicados: filters || null,
    graficos: {
      barras: graficoBarras,
      linha: graficoLinha,
      pizza: graficoPizza,
      area: graficoArea,
    },
  };
}


  async findAllStats() {
    const qtdCursos = await this.prisma.curso.count();
    const qtdAlunos = await this.prisma.aluno.count();
    const qtdCertificados = await this.prisma.aluno.count({
      where: {
        inscricoes: {
          some: {
            concluido: true,
          },
        },
      },
    });
    return {
      qtdCursos,
      qtdAlunos,
      qtdCertificados,
    };
  }
}
