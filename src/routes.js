const Book = require('./controller/BookController');

// define routes here
const routes = [{
        method: 'POST',
        path: '/books',
        handler: Book.post_book
    },
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    },
    {
        method: 'GET',
        path: '/books',
        handler: Book.get_books
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: Book.get_book
    },
];

module.exports = routes;