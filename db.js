const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'myDb';

class Db {
	constructor (){
		MongoClient.connect(url, function(err, client) {
			console.log("Connected successfully to server");
			const db = client.db(dbName);
		});
	}

	getPeople(){
		return 'people!'
	}
}

module.exports = new Db()