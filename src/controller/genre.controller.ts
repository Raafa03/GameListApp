import { Request, Response } from "express";
import { GenreRepository } from "../repository/genre.repository.js";

export class GenreController {

    private genreRepository: GenreRepository

    constructor(genreRepository : GenreRepository) {
        this.genreRepository = genreRepository
    }

    async listGenres(req: Request, res: Response) {
        const genres = await this.genreRepository.getGenres()
        res.status(200).json(genres)
    }

    async getGenre(req: Request, res: Response){
        const { genreId } = req.params
        const genre= await this.genreRepository.getGenreById(parseInt(genreId))

        if(!genre){
            res.status(404).json({error: "genre not found"})
        }

        res.status(200).json(genre)
    }

    async addGenre(req: Request, res: Response){
        const {description} = req.body

        const id = await this.genreRepository.addGenre(description)

        res.status(201).json({id:id})
    }
}