const getPagination = (page, size) => {
  page = +page;
  const limit = size ? +size : 6;
  const offset = page ? (page - 1) * limit : 0;
  return { limit, offset };
};

const getPaginationData = (data, page, limit) => {
  const { count: totalItems, rows: teamDota } = data;
  page = +page;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, teamDota, totalPages, currentPage };
};

module.exports = {
  getPagination,
  getPaginationData,
};
