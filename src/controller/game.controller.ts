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
        const { platformId } = req.params
        const games = await this.gameRepository.getGames()
        res.status(200).json(games)
        console.log(req.params)
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

    async getGameByCompany(req: Request, res: Response){
        const { companyId } = req.params
        const game = await this.gameRepository.getGameByCompanyId(parseInt(companyId))

        if(!game){
            res.status(404).json({error: "game not found"})
        }

        res.status(200).json(game)
    }

    async getGamesByGenreAndCompany(req: Request, res: Response) {
        const { genreId, companyId } = req.params
        const games = await this.gameRepository.getGamesByGenreAndCompany(parseInt(genreId), parseInt(companyId))
    
        if (games.length === 0) {
            return res.status(404).json({ error: "game not found" })
        }
    
        res.status(200).json(games)
    }

    async getGamesByGenreAndPlatform(req: Request, res: Response) {
        const { genreId, platformId } = req.params
        const games = await this.gameRepository.getGamesByGenreAndPlatform(parseInt(genreId), parseInt(platformId))
    
        if (games.length === 0) {
            return res.status(404).json({ error: "game not found" })
        }
    
        res.status(200).json(games)
    }

    async getGamesByCompanyAndPlatform(req: Request, res: Response) {
        const { companyId, platformId } = req.params
        const games = await this.gameRepository.getGamesByCompanyAndPlatform(parseInt(companyId), parseInt(platformId))
    
        if (games.length === 0) {
            return res.status(404).json({ error: "game not found" })
        }
    
        res.status(200).json(games)
    }

    async getGamesByGenreCompanyAndPlatform(req: Request, res: Response) {
        const { genreId, companyId, platformId } = req.params
        const games = await this.gameRepository.getGamesByGenreCompanyAndPlatform(parseInt(genreId), parseInt(companyId), parseInt(platformId))
    
        if (games.length === 0) {
            return res.status(404).json({ error: "game not found" })
        }
    
        res.status(200).json(games)
    }

    async getGamesByPlatform(req: Request, res: Response) {
        const { platformId } = req.params;
        const games = await this.gameRepository.getGamesByPlatformId(parseInt(platformId))
    
        if (games.length === 0) {
            return res.status(404).json({ error: "game not found" })
        }
    
        res.status(200).json(games)
    }
    

    async addGame(req: Request, res: Response){
        const {name, release_date, rating, genre_desc, company_desc,platform_desc} = req.body
        const id = await this.gameRepository.addGame(name, release_date, rating, genre_desc, company_desc, platform_desc)
        res.status(201).json({id:id})

        console.log(req.body)
    }


    async updateGame(req: Request, res: Response) {
        const { gameId } = req.params
        const { editName, editReleaseDate, editRating, editGenre, editCompany, editPlatform} = req.body

        const updatedGame = await this.gameRepository.updateGameById(
            parseInt(gameId),
            editName,
            editReleaseDate,
            editRating,
            editGenre,
            editCompany,
            editPlatform
        )
        console.log(req.body,req.params)

        if (!updatedGame) {
            res.status(404).json({ error: "game not found" })
        }

        res.status(200).json(updatedGame)
    }

    async deleteGame(req: Request, res: Response) {
        const { gameId } = req.params

        const deletedGame = await this.gameRepository.deleteGameById(parseInt(gameId))

        if (!deletedGame) {
            res.status(404).json({ error: "game not found" })
        }

        res.status(200).json({ message: "game deleted successfully" })
    }

}