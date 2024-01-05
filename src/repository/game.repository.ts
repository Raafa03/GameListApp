import { Database } from "sqlite";
import { Game } from "../model/game.model.js";

export class GameRepository{

    private db: Database = null

    constructor(db: Database) {
        return null
    }

    getGames(): Game[] {
        return null
    }

    getGameById(id:number): Game{
        return null
    }

    addGame(name: string, genre: string): number {
        return null
    }

}