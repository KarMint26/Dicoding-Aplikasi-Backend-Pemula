const { nanoid } = require('nanoid');
const books = require('./books');

const addBooksHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  let finished;
  if (pageCount === readPage) {
    finished = true;
  } else {
    finished = false;
  }

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const data = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (name === null || name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  books.push(data);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

const getAllBooksHandler = (request) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = [...books];

  if (name) {
    const queryName = name.toLowerCase();
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(queryName));
    const newBooks = [];
    filteredBooks.forEach((element) => {
      const { id, name: bookName, publisher } = element;
      const newBook = { id, name: bookName, publisher };
      newBooks.push(newBook);
    });
    return {
      status: 'success',
      data: {
        books: newBooks,
      },
    };
  }

  if (reading !== undefined) {
    const isReading = reading === '1';
    filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
    const newBooks = [];
    filteredBooks.forEach((element) => {
      const { id, name: bookName, publisher } = element;
      const newBook = { id, name: bookName, publisher };
      newBooks.push(newBook);
    });
    return {
      status: 'success',
      data: {
        books: newBooks,
      },
    };
  }

  if (finished !== undefined) {
    const isFinished = finished === '1';
    filteredBooks = filteredBooks.filter((book) => book.finished === isFinished);
    const newBooks = [];
    filteredBooks.forEach((element) => {
      const { id, name: bookName, publisher } = element;
      const newBook = { id, name: bookName, publisher };
      newBooks.push(newBook);
    });
    return {
      status: 'success',
      data: {
        books: newBooks,
      },
    };
  }

  const newBooks = [];
  books.forEach((element) => {
    const { id, name: bookName, publisher } = element;
    const newBook = { id, name: bookName, publisher };
    newBooks.push(newBook);
  });

  return {
    status: 'success',
    data: {
      books: newBooks,
    },
  };
};

const getBooksByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((data) => data.id === bookId);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  return h.response({
    status: 'success',
    data: {
      book: books[index],
    },
  });
};

const updateBooksByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const updatedAt = new Date().toISOString();
  let finished;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (pageCount === readPage) {
    finished = true;
  } else {
    finished = false;
  }

  const index = books.findIndex((data) => data.id === bookId);

  if (name === null || name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBooksByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((data) => data.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBooksHandler,
  getAllBooksHandler,
  getBooksByIdHandler,
  updateBooksByIdHandler,
  deleteBooksByIdHandler,
};
