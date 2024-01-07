import { Database } from "sqlite";
import { Platform } from "../model/platform.model.js";

export class PlatformRepository {

    private db: Database = null;

    constructor(db: Database) {
        this.db = db;
    }

    async addPlatform(platform_desc: string): Promise<number> {
        const result = await this.db.run(
            "INSERT INTO platform(platform_desc) VALUES (?)",
            platform_desc
        );

        return result.lastID;
    }

    async getPlatforms(): Promise<Platform[]> {
        const records = await this.db.all("SELECT * FROM platform");
        return records.map((record): Platform => ({
            id_platform: record.id_platform,
            platform_desc: record.platform_desc
        }));
    }

    async getPlatformById(id_platform: number): Promise<Platform> {
        const row = await this.db.get("SELECT * FROM platform WHERE id_platform = ?", id_platform);

        if (!row) {
            return null;
        }

        return {
            id_platform: row.id_platform,
            platform_desc: row.platform_desc
        };
    }

    async updatePlatformById(id_platform: number, platform_desc: string): Promise<Platform> {
        const result = await this.db.run(
            "UPDATE platform SET platform_desc=? WHERE id_platform=?",
            platform_desc,
            id_platform
        );

        if (result.changes === 0) {
            return null;
        }

        return {
            id_platform,
            platform_desc
        };
    }

    async deletePlatformById(id_platform: number): Promise<Platform> {
        const platformToDelete = await this.getPlatformById(id_platform);

        if (!platformToDelete) {
            return null;
        }

        await this.db.run("DELETE FROM platform WHERE id_platform=?", id_platform);

        return platformToDelete;
    }

}