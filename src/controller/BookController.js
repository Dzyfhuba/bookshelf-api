// const books = require('../model/Books');
const { nanoid } = require('nanoid');
let books = [];
// const fs = require('fs');

class BookController {
    static post_book(request, h) {
        // get data from request
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

        // validate data
        if (!name) {
            return h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku'
            }).code(400);
        }
        if (readPage > pageCount) {
            return h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
            }).code(400);
        }
        // add generic validation
        if (!year && !author && !summary && !publisher && !pageCount && !readPage && !reading) {
            return h.response({
                status: 'fail',
                message: 'Buku gagal ditambahkan'
            }).code(500);
        }

        const finished = pageCount === readPage;

        // create new book
        const newBook = {
            id: nanoid(16),
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            insertedAt: new Date(),
            updatedAt: new Date(),
        };

        // new object to books
        books.push(newBook);
        // try {
        //     fs.writeFileSync('src/model/Books.json', JSON.stringify(books));
        // } catch (error) {
        //     console.log(error);
        // }

        // store ../model/Books.json
        // fs.writeFileSync('./model/Books.json', JSON.stringify(books));

        // response with handler
        return h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: newBook.id
            }
        }).code(201);
    }
    static get_books(request, h) {
        const { name, reading, finished } = request.query;

        let filteredBooks = books;

        // filter by reading is true or false
        if (reading != undefined) {
            if (reading) {
                filteredBooks = filteredBooks.filter(book => book.reading == true);
            } else {
                filteredBooks = filteredBooks.filter(book => book.reading == false);
            }
        }

        if (finished != undefined) {
            if (finished == 1) filteredBooks = filteredBooks.filter((book) => book.finished == true);
            if (finished == 0) filteredBooks = filteredBooks.filter((book) => book.finished == false);
            console.log(filteredBooks);
        }

        // if name is not empty
        if (name) {
            filteredBooks = filteredBooks.filter(book => book.name.toLowerCase().includes(name.toLowerCase()));
        }

        // get id, name and publisher from filteredBooks
        const mappedBook = filteredBooks.map(book => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));
        return h.response({
            status: 'success',
            message: 'Buku berhasil ditampilkan',
            data: {
                books: mappedBook
            }
        }).code(200);
    }
    static get_book(request, h) {
        console.log(request.params);
        // get id from request
        const { id } = request.params;

        // find book by id
        const book = books.find(book => book.id === id);

        // if book is not found or array is empty
        if (!book || books.length === 0) {
            const res = h.response({
                status: 'fail',
                message: 'Buku tidak ditemukan'
            }).code(404);
            return res;
        }

        // response with handler
        return h.response({
            status: 'success',
            data: {
                book
            }
        }).code(200);
    }
    static put_book(request, h) {
        // get id from request
        const { id } = request.params;
        // find book by id
        const book = books.find(book => book.id === id);
        // if book not found
        if (!book) {
            return h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Id tidak ditemukan'
            }).code(404);
        }

        // get data from request
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

        // validate data
        if (!name) {
            return h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku'
            }).code(400);
        }
        if (readPage > pageCount) {
            return h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
            }).code(400);
        }

        // update book
        book.name = name;
        book.year = year;
        book.author = author;
        book.summary = summary;
        book.publisher = publisher;
        book.pageCount = pageCount;
        book.readPage = readPage;
        book.reading = reading;
        book.updatedAt = new Date();
        // store ../model/Books.json
        // fs.writeFileSync('src/model/Books.json', JSON.stringify(books));
        const res = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        }).code(200);

        return res;
    }
    static delete_book(request, h) {
        // get id from request
        const { id } = request.params;

        // find book by id
        const book = books.find(book => book.id === id);

        // if book not found
        if (!book) {
            return h.response({
                status: 'fail',
                message: 'Buku gagal dihapus. Id tidak ditemukan'
            }).code(404);
        }

        // remove book
        books.splice(books.indexOf(book), 1);

        // store ../model/Books.json
        // fs.writeFileSync('src/model/Books.json', JSON.stringify(books));

        // response with handler
        return h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        }).code(200);
    }
}

module.exports = BookController;