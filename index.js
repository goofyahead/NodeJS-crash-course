const Hapi = require('hapi')
const Vision = require('vision')
const Handlebars = require('handlebars')
const PeopleController = require('./controllers/PeopleController')

const server = Hapi.server({
	port: 3000,
	host: 'localhost'
});

const init = async () => {
    await server.register(Vision);

    server.views({
        engines: { html: Handlebars },
        relativeTo: __dirname,
        path: `templates`
    });

    await server.start();
    console.log('Server is running at ' + server.info.uri);
};

server.route({
    method: 'GET',
    path: '/',
    handler: () => {
        return 'Hello, world!'
    }
})

server.route(PeopleController.getPeople)

server.route(PeopleController.getPerson)

server.route(PeopleController.renderPerson)

init()