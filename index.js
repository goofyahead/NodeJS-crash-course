const Hapi = require('hapi')
const Vision = require('vision')
const Handlebars = require('handlebars')
const Db = require('./db')

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
    handler: (request) => {
        return 'Hello, world!'
    }
})

server.route({
    method: 'GET',
    path: '/people',
    handler: (request) => {
        return Db.getPeople()
    }
})

server.route({
    method: 'GET',
    path: '/people/{name}',
    handler: (request) => {
        return Db.getPerson(request.params.name)
    }
})

server.route({
    method: 'GET',
    path: '/render/people/{name}',
    handler: async (request, h) => {
        const person = await Db.getPerson(request.params.name)

        return h.view('person', {
            message: 'Hello Handlebars!',
            person: person
        });
    }
})

process.on('unhandledRejection', (err) => {
	console.log(err)
	process.exit(1)
})

init()