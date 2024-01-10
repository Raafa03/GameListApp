CREATE TABLE IF NOT EXISTS game (
    id_game INTEGER PRIMARY KEY,
    name VARCHAR(255),
    release_date DATE,
    rating FLOAT,
    genre_id INTEGER,
    company_id INTEGER,
    platform_id INTEGER,

    FOREIGN KEY (genre_id) REFERENCES genre(id_genre),
    FOREIGN KEY (company_id) REFERENCES company(id_company),
    FOREIGN KEY (platform_id) REFERENCES platform(id_platform)
);