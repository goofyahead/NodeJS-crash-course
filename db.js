const {MongoClient} = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'myDb';

class DbService {

	constructor (){
		this.db = null
		const self = this
		MongoClient.connect(url, function(err, client) {
			console.log("Connected successfully to server");
			self.db = client.db(dbName);
		});
	}

	async getPeople(){
		return await this.queryMany('people', {})
	}

	async getPerson(givenName){
		console.log('name', givenName)
		return await this.queryOne('people', {name: givenName})
	}

	async queryOne(collectionName, whereClause) {
		const collection = this.db.collection(collectionName)
		// Find some documents
		return new Promise( (resolve, reject) => {
			collection.findOne(whereClause, (err, result) => {
				console.log("Found the following records")
				console.log(result)
				resolve(result)
			})
		})
	}

	async queryMany(collectionName, whereClause) {
		const collection = this.db.collection(collectionName)
		// Find some documents
		return new Promise( (resolve, reject) => {
			collection.find(whereClause).toArray(function(err, docs) {
				console.log("Found the following record")
				console.log(docs)
				resolve(docs)
			})
		})
	}
}

module.exports = new DbService()