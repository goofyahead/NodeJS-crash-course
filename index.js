const http = require('http')
const port = 8080

const server = http.createServer((req, res) => {
	res.end('hello from server')
})

server.listen(port, () => {
	console.log(`server running on ${port}`)
})