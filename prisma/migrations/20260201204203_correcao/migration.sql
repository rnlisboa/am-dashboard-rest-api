/*
  Warnings:

  - You are about to drop the column `totalAulasCurso` on the `CursoAluno` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Curso" ADD COLUMN     "totalAulasCurso" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "CursoAluno" DROP COLUMN "totalAulasCurso";
