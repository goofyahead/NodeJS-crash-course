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

	getPeople(callback){
		const collection = this.db.collection('people')
		// Find some documents
		collection.find({}).toArray(function(err, docs) {
			console.log("Found the following records")
			console.log(docs)
			callback(docs)
		})
	}
}

module.exports = new DbService()