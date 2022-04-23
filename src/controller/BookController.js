// const books = require('../model/Books');
const { nanoid } = require('nanoid');
const books = require('../model/Books');
const fs = require('fs');

class BookController {
    static post_book(request, h) {
        // try {
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
            finished: false,
            reading,
            insertedAt: new Date(),
            updatedAt: new Date(),
        };

        // new object to books
        books.push(newBook);
        try {
            fs.writeFileSync('src/model/Books.json', JSON.stringify(books));
        } catch (error) {
            console.log(error);
        }

        // store ../model/Books.json
        // fs.writeFileSync('./model/Books.json', JSON.stringify(books));


        // response with handler
        return h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                // bookId: newBook.id,
                bookId: newBook.id
            }
        }).code(201);
        // } catch (error) {
        //     return h.response({
        //         status: 'error',
        //         message: error.message,
        //     });
        // }
    }
    static get_book(params) {
        // check if params has name
        try {
            // use filter to find the book,  1 and 0 not true and false
            if (params.name) {
                return this.books.filter(book => book.name == params.name);
            } else if (params.reading) {
                return this.books.filter(book => book.reading == params.reading);
            } else if (params.finished) {
                return this.books.filter(book => book.finished == params.finished);
            } else {
                // return with status
                return {
                    status: 'success',
                    data: {
                        books: this.books
                    }
                };
            }

        } catch (error) {
            return error;
        }
    }
}

module.exports = BookController;