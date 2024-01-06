import { Database } from "sqlite";
import { Game } from "../model/game.model.js";

export class GameRepository{

    private db: Database = null

    constructor(db: Database) {
        this.db = db
    }

    async getGames(): Promise<Game[]> {
       const records = await this.db.all("SELECT * FROM game")
        return records.map((record): Game => {
            return {
                id_game: record.id_game,
                name: record.name,
                release_date: record.release_date,
                rating: record.rating,
                genre_id: record.genre_id,
                company_id: record.company_id
            }
        })
    }

    async getGameById(id:number): Promise<Game> {
        const row = await this.db.get("SELECT * FROM game WHERE id_game = ?", id)

        if (!row) {
            return null
        }

        return {
            id_game: row.id_game,
            name: row.name,
            release_date: row.release_date,
            rating: row.rating,
            genre_id: row.genre_id,
            company_id: row.company_id
        }
    }

    async getGameByGenreId(genreId: number): Promise<Game[]> {
        const records = await this.db.all("SELECT * FROM game WHERE genre_id = ?", genreId)
        return records.map((record) => {
            return {
                id_game: record.id_game,
                name: record.name,
                release_date: record.release_date,
                rating: record.rating,
                genre_id: record.genre_id,
                company_id: record.company_id
            }
        })
    }

    async getGameByCompanyId(genreId: number): Promise<Game[]> {
        const records = await this.db.all("SELECT * FROM game WHERE company_id = ?", genreId)
        return records.map((record) => {
            return {
                id_game: record.id_game,
                name: record.name,
                release_date: record.release_date,
                rating: record.rating,
                genre_id: record.genre_id,
                company_id: record.company_id
            }
        })
    }

    async addGame(name: string, release_date: Date, rating: number, genre_id: number, company_id: number): Promise<number> {
        const result = await this.db.run(
            "INSERT INTO game(name, release_date, rating, genre_id, company_id) VALUES (?,?,?,?,?)",
            name,
            release_date,
            rating,
            genre_id,
            company_id
        )

        return result.lastID
    }

}