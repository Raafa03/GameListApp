/*const http = require('http');//importar dependencias

const server = http.createServer(function(request,response){
console.log(request.headers)
response.setHeader('Content-Type', 'text/html')
response.setHeader('Server', 'ESGTS IS SERVER 0.1')
response.setHeader('CustumHeader', 'Hello World')

response.write("<html><body>")
response.write('<h1>teste</h1>')
response.write("<ul>")
Object.keys(request.headers).forEach(key =>{
    response.write(`<li>${key}: ${request.headers[key]}</li>`)
})
response.write("</ul>")
response.write("</body></html>")
response.end()

})

server.listen(3000, function(error){
    if (error){
        console.error('An error occurred',error)
    }else{
        console.log('Server started')
    }
})*/


//const express = require('express')
import express, {Express} from "express"

import { GameController } from "./controller/game.controller.js"
import { GameRepository } from "./repository/game.repository.js"
import database from "./persistence/database.js"
import { GenreController } from "./controller/genre.controller.js"
import { GenreRepository } from "./repository/genre.repository.js"

console.log("Connecting to database")
const db = await database.connectDatabase()

console.log("Executing migrations")
await database.migrate(db)

console.log("Initializing repositories")
const gameRepository = new GameRepository(db)
const genreRepository = new GenreRepository(db)

console.log("Initializing controllers")
const gameController = new GameController(gameRepository)
const genreController = new GenreController(genreRepository)


console.log("Configuring express")
const api: Express = express()
const port = 3000
api.use(express.json())

console.log("Registering games routes")
api.get("/game", gameController.listGames.bind(gameController))
api.post("/game", gameController.addGame.bind(gameController))
api.get("/game/:gameId", gameController.getGame.bind(gameController))
api.get("/game/genre/:genreId", gameController.getGameByGenre.bind(gameController))

console.log("Registering genre routes")
api.get("/genre", genreController.listGenres.bind(genreController))
api.post("/genre", genreController.addGenre.bind(genreController))
api.get("/genre/:genreId", genreController.getGenre.bind(genreController))


console.log("Starting express")
api.listen(port, () => {
    console.log(`Express JS listening port: ${port}`)
})

