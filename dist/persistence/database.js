import sqlite3 from "sqlite3";
import { open } from "sqlite";
async function connectDatabase() {
    const db = await open({
        filename: "database.db",
        driver: sqlite3.Database
    });
    db.run("PRAGMA foreign_key = ON;");
    return db;
}
async function migrate(db) {
    await db.migrate();
}
export default {
    connectDatabase: connectDatabase,
    migrate: migrate
};
//# sourceMappingURL=database.js.map