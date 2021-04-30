const http=require('http');
const app = require('./Backend/app')

const server=http.createServer(app)

app.set("port",3000)
server.listen(3000,()=>{
    console.log("Server listening at 3000")
})