const formatIDR = (target) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(target);
};

const countTotalPrice = (arr) => {
  return arr.map((p) => p.subtotal).reduce((a, b) => a + b);
};

const getPagination = (page, size) => {
  const limit = size ? +size : 6;
  if (page > 0) {
    page = page - 1;
  }
  const offset = page ? page * limit : 0;
  return { limit, offset, currentPage: page };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, items, totalPages, currentPage };
};

module.exports = { formatIDR, countTotalPrice, getPagination, getPagingData };
