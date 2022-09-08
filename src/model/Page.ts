export default interface Page<E, T> {
  page: number;
  pageSize: number;
  entity?: E;
  total?: number;
  list?: T[];
  sort?: string;
  order?: 'ASC' | 'DESC';
}
