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
        handler: (request, h) => {
            // check if params has name
            if (request.query) {
                return Book.get_book(request.query);
            }
            return Book.get_books();
        }
    },
    // {
    //     method: 'GET',
    //     path: '/books{quary?}',
    //     handler: (request, h) => {
    //         return Book.get_book(request.params.quary);
    //     }
    // }
];

module.exports = routes;