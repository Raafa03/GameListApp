import { Request, Response } from 'express';
import { PlatformRepository } from '../repository/platform.repository.js';

export class PlatformController {

    private platformRepository: PlatformRepository;

    constructor(platformRepository: PlatformRepository) {
        this.platformRepository = platformRepository;
    }

    async listPlatforms(req: Request, res: Response) {
        const platforms = await this.platformRepository.getPlatforms();
        res.status(200).json(platforms);
    }

    async getPlatform(req: Request, res: Response) {
        const { platformId } = req.params;
        const platform = await this.platformRepository.getPlatformById(parseInt(platformId));

        if (!platform) {
            res.status(404).json({ error: "platform not found" });
        }

        res.status(200).json(platform);
    }

    async addPlatform(req: Request, res: Response) {
        const { platform_desc } = req.body;

        const id = await this.platformRepository.addPlatform(platform_desc);

        res.status(201).json({ id: id });
    }

    async updatePlatform(req: Request, res: Response) {
        const { platformId } = req.params;
        const { platform_desc } = req.body;

        const updatedPlatform = await this.platformRepository.updatePlatformById(
            parseInt(platformId),
            platform_desc
        );

        if (!updatedPlatform) {
            res.status(404).json({ error: "platform not found" });
        }

        res.status(200).json(updatedPlatform);
    }

    async deletePlatform(req: Request, res: Response) {
        const { platformId } = req.params;

        const deletedPlatform = await this.platformRepository.deletePlatformById(parseInt(platformId));

        if (!deletedPlatform) {
            res.status(404).json({ error: "platform not found" });
        }

        res.status(200).json({ message: "platform deleted successfully" });
    }
}