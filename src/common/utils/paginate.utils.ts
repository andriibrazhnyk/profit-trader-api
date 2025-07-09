export function paginate(page: number, perPage: number, total: number) {
  return {
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
  };
}
