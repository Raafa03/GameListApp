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
        const {genre_desc} = req.body

        const id = await this.genreRepository.addGenre(genre_desc)

        res.status(201).json({id:id})
    }

    async updateGenre(req: Request, res: Response) {
        const { genreId } = req.params
        const { genre_desc} = req.body

        const updatedGenre = await this.genreRepository.updateGenreById(
            parseInt(genreId),
            genre_desc
        );

        if (!updatedGenre) {
            res.status(404).json({ error: "genre not found" });
        }

        res.status(200).json(updatedGenre);
    }

    async deleteGenre(req: Request, res: Response) {
        const { genreId } = req.params;

        const deletedGenre = await this.genreRepository.deleteGenreById(parseInt(genreId));

        if (!deletedGenre) {
            res.status(404).json({ error: "genre not found" });
        }

        res.status(200).json({ message: "genre deleted successfully" });
    }
}