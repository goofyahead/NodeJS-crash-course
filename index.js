const Hapi = require('hapi')
const Db = require('./db')

const server = Hapi.server({
	port: 3000,
	host: 'localhost'
});

const init = async () => {
	await server.start()
	console.log(`Server running at: ${server.info.uri}`)
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
        return new Promise(function (resolve, reject) {
            Db.getPeople((people) => {
                console.log(people)
                resolve(people)
            })
        })
    }
})

process.on('unhandledRejection', (err) => {
	console.log(err)
	process.exit(1)
})

init()