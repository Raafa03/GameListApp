export class GameController {
    constructor(gameRepository) {
        this.gameRepository = null;
        this.gameRepository = gameRepository;
    }
    listGames(req, res) {
        res.status(200).json(this.gameRepository.getGames());
    }
    getGame(req, res) {
        const { gameId } = req.params;
        const game = this.gameRepository.getGameById(parseInt(gameId));
        if (!game) {
            res.status(404).json({ error: "game not found" });
        }
        res.status(200).json(game);
    }
    addGame(req, res) {
        const { name, category } = req.body;
        const id = this.gameRepository.addGame(name, category);
        res.status(201).json({ id: id });
    }
}
//# sourceMappingURL=game.controller.js.map