import express, {Express} from "express"

import { GameController } from "./controller/game.controller.js"
import { GameRepository } from "./repository/game.repository.js"
import database from "./persistence/database.js"
import { GenreController } from "./controller/genre.controller.js"
import { GenreRepository } from "./repository/genre.repository.js"
import { CompanyController } from "./controller/company.controller.js"
import { CompanyRepository } from "./repository/company.repository.js"
import { PlatformController } from "./controller/platform.controller.js"
import { PlatformRepository } from "./repository/platform.repository.js"

console.log("Connecting to database")
const db = await database.connectDatabase()

console.log("Executing migrations")
await database.migrate(db)

console.log("Initializing repositories")
const gameRepository = new GameRepository(db)
const genreRepository = new GenreRepository(db)
const companyRepository = new CompanyRepository(db)
const platformRepository = new PlatformRepository(db)

console.log("Initializing controllers")
const gameController = new GameController(gameRepository)
const genreController = new GenreController(genreRepository)
const companyController = new CompanyController(companyRepository)
const platformController = new PlatformController(platformRepository)

console.log("Configuring express")
const api: Express = express()
const port = 3000
api.use(express.json())

console.log("Registering games routes")
api.get("/game", gameController.listGames.bind(gameController))
api.post("/game", gameController.addGame.bind(gameController))
api.post("/game/platform/link", gameController.linkGameToPlatform.bind(gameController))
api.get("/game/:gameId", gameController.getGame.bind(gameController))
api.get("/game/genre/:genreId", gameController.getGameByGenre.bind(gameController))
api.get("/game/company/:companyId", gameController.getGameByCompany.bind(gameController))
api.get("/game/:genreId/:companyId", gameController.getGamesByGenreAndCompany.bind(gameController))
api.get("/game/platform/link/:platformId", gameController.getGamesByPlatform.bind(gameController))
api.put("/game/:gameId", gameController.updateGame.bind(gameController))
api.delete("/game/:gameId", gameController.deleteGame.bind(gameController))

console.log("Registering genre routes")
api.get("/genre", genreController.listGenres.bind(genreController))
api.post("/genre", genreController.addGenre.bind(genreController))
api.get("/genre/:genreId", genreController.getGenre.bind(genreController))
api.put("/genre/:genreId", genreController.updateGenre.bind(genreController))
api.delete("/genre/:genreId", genreController.deleteGenre.bind(genreController))

console.log("Registering company routes")
api.get("/company", companyController.listCompanys.bind(companyController))
api.post("/company", companyController.addCompany.bind(companyController))
api.get("/company/:companyId", companyController.getCompany.bind(companyController))
api.put("/company/:companyId", companyController.updateCompany.bind(companyController))
api.delete("/company/:companyId", companyController.deleteCompany.bind(companyController))

console.log("Registering platform routes")
api.get("/platform", platformController.listPlatforms.bind(platformController))
api.post("/platform", platformController.addPlatform.bind(platformController))
api.get("/platform/:platformId", platformController.getPlatform.bind(platformController))
api.put("/platform/:platformId", platformController.updatePlatform.bind(platformController))
api.delete("/platform/:platformId", platformController.deletePlatform.bind(platformController))



console.log("Starting express")
api.listen(port, () => {
    console.log(`Express JS listening port: ${port}`)
})

