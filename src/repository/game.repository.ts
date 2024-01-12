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

    async getGamesByGenreAndPlatform(genreId: number, platformId: number): Promise<Game[]> {
        const records = await this.db.all("SELECT * FROM game WHERE genre_id = ? AND platform_id = ?", genreId, platformId)
    
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

    async getGamesByCompanyAndPlatform(companyId: number, platformId: number): Promise<Game[]> {
        const records = await this.db.all("SELECT * FROM game WHERE company_id = ? AND platform_id = ?", companyId, platformId)
    
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

    async getGamesByGenreCompanyAndPlatform(genreId:number, companyId: number, platformId: number): Promise<Game[]> {
        const records = await this.db.all("SELECT * FROM game WHERE genre_id = ? AND company_id = ? AND platform_id = ?",genreId, companyId, platformId)
    
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

    async addGame(name: string, release_date: Date, rating: number, genre_id: number, company_id: number, platform_id: number): Promise<number | string> {
        // Verificar se já existe um jogo com o mesmo nome e plataforma
        const existingGame = await this.db.get("SELECT * FROM game WHERE name = ? AND platform_id = ?", name, platform_id)
    
        if (existingGame) {
            return 'A game with the same name and platform already exists'
        }

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
    async updateGameById(id_game: number, name: string, release_date: Date, rating: number, genre_id: number, company_id: number, platform_id: number): Promise<Game | string> {
        // Verificar se já existe um jogo com o mesmo nome e plataforma
        const existingGame = await this.db.get("SELECT * FROM game WHERE name = ? AND platform_id = ? AND id_game <> ?", name, platform_id, id_game)
    
        if (existingGame) {
            return 'A game with the same name and platform already exists'
        }
    
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