import { Database } from "sqlite"
import { Genre } from "../model/genre.model.js"

export class GenreRepository {

    private db: Database = null

    constructor(db : Database) {
        this.db = db
    }

    async addGenre(genre_desc: string): Promise<number> {
        const result = await this.db.run(
            "INSERT INTO genre(genre_desc) VALUES (?)",
            genre_desc
        )

        return result.lastID
    }

    async getGenres(): Promise<Genre[]> {
        const records = await this.db.all("SELECT * FROM genre")
         return records.map((record): Genre => {
             return {
                 id_genre: record.id_genre,
                 genre_desc: record.genre_desc,
             }
         })
     }

    async getGenreById(id_genre:number): Promise<Genre> {
        const row = await this.db.get("SELECT * FROM genre WHERE id_genre = ?", id_genre)

        if (!row) {
            return null
        }

        return {
            id_genre: row.id_genre,
            genre_desc: row.genre_desc,
        }
    }

    async updateGenreById(id_genre: number, genre_desc: string): Promise<Genre> {
        const result = await this.db.run(
            "UPDATE genre SET genre_desc=? WHERE id_genre=?",
            genre_desc,
            id_genre
        )

        if (result.changes === 0) {
            return null
        }

        return {
            id_genre,
            genre_desc
        }
    }

    async deleteGenreById(id_genre: number): Promise<Genre> {
        const genreToDelete = await this.getGenreById(id_genre)

        if (!genreToDelete) {
            return null 
        }

        await this.db.run("DELETE FROM genre WHERE id_genre=?", id_genre)

        return genreToDelete
    }
}