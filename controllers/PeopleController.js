const Db = require('../services/db')

class PeopleController {
    static async getPeople() {
        return Db.getPeople()
    }

    static async getPerson(request) {
        return Db.getPerson(request.params.name)
    }

    static async renderPerson(request, h) {
        const person = await Db.getPerson(request.params.name)

        return h.view('person', {
            message: 'Hello Handlebars!',
            person: person
        });
    }
}

const controllers = {
    getPeople: {
        method: 'GET',
        path: '/people',
        handler: PeopleController.getPeople
    },
    getPerson: {
        method: 'GET',
        path: '/people/{name}',
        handler: PeopleController.getPerson
    },
    renderPerson: {
        method: 'GET',
        path: '/render/people/{name}',
        handler: PeopleController.renderPerson
    }
}

module.exports = controllers