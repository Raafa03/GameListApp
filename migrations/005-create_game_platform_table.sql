CREATE TABLE IF NOT EXISTS game_platform (
    id_game_platform INTEGER PRIMARY KEY,
    game_id INTEGER,
    platform_id INTEGER,

    FOREIGN KEY (game_id) REFERENCES game(id_game),
    FOREIGN KEY (platform_id) REFERENCES platform(id_platform)
)