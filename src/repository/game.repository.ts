import { Database } from "sqlite"
import { Game } from "../model/game.model.js"

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
                company_id: record.company_id,
                platform_id: record.platform_id
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
            company_id: row.company_id,
            platform_id: row.platform_id
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
                company_id: record.company_id,
                platform_id: record.platform_id
            }
        })
    }

    async getGameByCompanyId(companyId: number): Promise<Game[]> {
        const records = await this.db.all("SELECT * FROM game WHERE company_id = ?", companyId)
        return records.map((record) => {
            return {
                id_game: record.id_game,
                name: record.name,
                release_date: record.release_date,
                rating: record.rating,
                genre_id: record.genre_id,
                company_id: record.company_id,
                platform_id: record.platform_id
            }
        })
    }

    async getGamesByPlatformId(platformId: number): Promise<Game[]> {
        const records = await this.db.all("SELECT * FROM game WHERE platform_id = ?", platformId)
        return records.map((record) => {
            return {
                id_game: record.id_game,
                name: record.name,
                release_date: record.release_date,
                rating: record.rating,
                genre_id: record.genre_id,
                company_id: record.company_id,
                platform_id: record.platform_id
            }
        })
    }

    async getGamesByGenreAndCompany(genreId: number, companyId: number): Promise<Game[]> {
        const records = await this.db.all("SELECT * FROM game WHERE genre_id = ? AND company_id = ?", genreId, companyId)
    
        return records.map((record) => ({
            id_game: record.id_game,
            name: record.name,
            release_date: record.release_date,
            rating: record.rating,
            genre_id: record.genre_id,
            company_id: record.company_id,
            platform_id: record.platform_id
        }))
    }

    async addGame(name: string, release_date: Date, rating: number, genre_id: number, company_id: number, platform_id: number): Promise<number> {
        const result = await this.db.run(
            "INSERT INTO game(name, release_date, rating, genre_id, company_id, platform_id) VALUES (?,?,?,?,?,?)",
            name,
            release_date,
            rating,
            genre_id,
            company_id,
            platform_id
        )

        return result.lastID
    }

    async updateGameById(id_game: number, name: string, release_date: Date, rating: number, genre_id: number, company_id: number, platform_id: number): Promise<Game> {
        const result = await this.db.run(
            "UPDATE game SET name=?, release_date=?, rating=?, genre_id=?, company_id=?, platform_id=? WHERE id_game=?",
            name,
            release_date,
            rating,
            genre_id,
            company_id,
            platform_id,
            id_game
        )

        if (result.changes === 0) {
            return null
        }

        return {
            id_game,
            name,
            release_date,
            rating,
            genre_id,
            company_id,
            platform_id
        }
    }

    async deleteGameById(id: number): Promise<Game> {
        const gameToDelete = await this.getGameById(id)

        if (!gameToDelete) {
            return null
        }

        await this.db.run("DELETE FROM game WHERE id_game=?", id)

        return gameToDelete
    }
}