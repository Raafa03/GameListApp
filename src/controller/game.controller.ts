import { Request, Response } from 'express'
import { GameRepository } from '../repository/game.repository.js'
import { GamePlatform } from "../model/gameplatform.model.js";

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

    async linkGameToPlatform(req: Request, res: Response) {
        const { game_id, platform_id } = req.body;

        const gamePlatform: GamePlatform = {
            id_game_platform: 0,
            game_id: parseInt(game_id),
            platform_id: parseInt(platform_id)
        };

        try {
            await this.gameRepository.linkGameToPlatform(gamePlatform);
            res.status(201).json({ message: "Game linked to platform successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
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

    async getGamesByPlatform(req: Request, res: Response) {
        const { platformId } = req.params;
        const games = await this.gameRepository.getGamesByPlatformId(parseInt(platformId))
    
        if (games.length === 0) {
            return res.status(404).json({ error: "game not found" })
        }
    
        res.status(200).json(games)
    }
    

    async addGame(req: Request, res: Response){
        const {name, release_date, rating, genre_id, company_id} = req.body

        const id = await this.gameRepository.addGame(name, release_date, rating, genre_id, company_id)

        res.status(201).json({id:id})
    }


    async updateGame(req: Request, res: Response) {
        const { gameId } = req.params
        const { name, release_date, rating, genre_id, company_id } = req.body

        const updatedGame = await this.gameRepository.updateGameById(
            parseInt(gameId),
            name,
            release_date,
            rating,
            genre_id,
            company_id
        )

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

    async updateLinkGameToPlatformById(req: Request, res: Response) {
        const { game_platformId } = req.params;
        const { game_id, platform_id } = req.body;
    
        const updatedLink = await this.gameRepository.updateLinkGameToPlatformById({
            id_game_platform: parseInt(game_platformId),
            game_id: parseInt(game_id),
            platform_id: parseInt(platform_id)
        });
    
        if (!updatedLink) {
            res.status(404).json({ error: "link not found" });
        }
    
        res.status(200).json(updatedLink);
    }
    
    async deleteLinkGameToPlatformById(req: Request, res: Response) {
        const { game_platformId } = req.params;
    
        const deletedLink = await this.gameRepository.deleteLinkGameToPlatformById(parseInt(game_platformId));
    
        if (!deletedLink) {
            res.status(404).json({ error: "link not found" });
        }
    
        res.status(200).json({ message: "game deleted successfully" });
    }

}