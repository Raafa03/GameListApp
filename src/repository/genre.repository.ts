import { Database } from "sqlite";
import { Genre } from "../model/genre.model.js";

export class GenreRepository {

    private db: Database = null

    constructor(db : Database) {
        this.db = db
    }

    async addGenre(description: string): Promise<number> {
        const result = await this.db.run(
            "INSERT INTO genre(genre_desc) VALUES (?)",
            description
        )

        return result.lastID
    }

    async getGenres(): Promise<Genre[]> {
        const records = await this.db.all("SELECT * FROM genre")
         return records.map((record): Genre => {
             return {
                 id_genre: record.id_game,
                 description: record.genre_desc,
             }
         })
     }

    async getGenreById(id:number): Promise<Genre> {
        const row = await this.db.get("SELECT * FROM genre WHERE id_genre = ?", id)

        if (!row) {
            return null
        }

        return {
            id_genre: row.id_genre,
            description: row.genre_desc,
        }
    }
}