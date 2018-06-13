const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';

class DbService {

    constructor() {
        this.db = null
        MongoClient.connect(url, (err, client) => {
            if (err) console.error(error)
            else console.log("Connected successfully to server");
            this.db = client.db(dbName);
        });
    }

    async getPeople() {
        return await this.queryMany('people', {})
    }

    async getPerson(givenName) {
        console.log('name', givenName)
        return await this.queryOne('people', {name: givenName})
    }

    async queryOne(collectionName, whereClause) {
        const collection = this.db.collection(collectionName)
        // Find some documents
        return new Promise((resolve, reject) => {
            collection.findOne(whereClause, (err, result) => {
                if (err) reject(err)
                console.log("Found the following records")
                console.log(result)
                resolve(result)
            })
        })
    }

    async queryMany(collectionName, whereClause) {
        const collection = this.db.collection(collectionName)
        // Find some documents
        return new Promise((resolve, reject) => {
            collection.find(whereClause).toArray(function (err, docs) {
                if (err) reject(err)
                console.log("Found the following record")
                console.log(docs)
                resolve(docs)
            })
        })
    }
}

module.exports = new DbService()