export interface CourseFilters {
  search?: string;
  categoriaId?: string;
  status?: 'concluido' | 'em_andamento';
  from?: Date;
  to?: Date;
}
