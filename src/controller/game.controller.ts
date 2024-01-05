import { Request, Response } from 'express'
import { GameRepository } from '../repository/game.repository.js'

export class GameController{

    private gameRepository: GameRepository = null

    constructor(gameRepository :GameRepository) {
        this.gameRepository = gameRepository
    }

    listGames(req: Request, res: Response){
        res.status(200).json(this.gameRepository.getGames())
    }

    getGame(req: Request, res: Response){
        const { gameId } = req.params
        const game = this.gameRepository.getGameById(parseInt(gameId))

        if(!game){
            res.status(404).json({error: "game not found"})
        }

        res.status(200).json(game)
    }

    addGame(req: Request, res: Response){
        const {name, genre} = req.body

        const id = this.gameRepository.addGame(name, genre)

        res.status(201).json({id:id})
    }

}