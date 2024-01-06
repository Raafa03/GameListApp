import { Request, Response } from 'express'
import { GameRepository } from '../repository/game.repository.js'

export class GameController{

    private gameRepository: GameRepository = null

    constructor(gameRepository :GameRepository) {
        this.gameRepository = gameRepository
    }

    async listGames(req: Request, res: Response){
        const { genreId } = req.params
        const { companyId } = req.params
        const games = await this.gameRepository.getGames()
        res.status(200).json(games)
    }

    async getGame(req: Request, res: Response){
        const { gameId } = req.params
        const game = await this.gameRepository.getGameById(parseInt(gameId))

        if(!game){
            res.status(404).json({error: "game not found"})
        }

        res.status(200).json(game)
    }

    async getGameByGenre(req: Request, res: Response){
        const { genreId } = req.params
        const game = await this.gameRepository.getGameByGenreId(parseInt(genreId))

        if(!game){
            res.status(404).json({error: "game not found"})
        }

        res.status(200).json(game)
    }

    async addGame(req: Request, res: Response){
        const {name, release_date, rating, genre_id, company_id} = req.body

        const id = await this.gameRepository.addGame(name, release_date, rating, genre_id, company_id)

        res.status(201).json({id:id})
    }

}