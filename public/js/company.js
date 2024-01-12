class CompanyPage {
    constructor() {
        this.gameList = document.getElementById('gameList');
        this.companyDropdown = document.getElementById('companyDropdown');
        this.genreDropdown = document.getElementById('genreDropdown');
        this.platformDropdown = document.getElementById('platformDropdown');
        this.genreMap = {};
        this.companyMap = {};
        this.platformMap = {};
    }


    async loadGamesByCompany(companyId, genreId, platformId) {
        try {
            const gamesResponse = await fetch('http://localhost:3000/game').then(response => response.json());

            this.gameList.innerHTML = '';

            gamesResponse.forEach(game => {
                const companyMatch = !companyId || parseInt(game.company_id) === parseInt(companyId);
                const genreMatch = !genreId || parseInt(game.genre_id) === parseInt(genreId);
                const platformMatch = !platformId || parseInt(game.platform_id) === parseInt(platformId);

                if (companyMatch && genreMatch && platformMatch) {
                    const listItem = document.createElement('li');
                    listItem.className = 'gameItem';

                    listItem.innerHTML = `
                        <strong>${game.name}</strong><br>
                        Release Date: ${game.release_date}<br>
                        Rating: ${game.rating}<br>
                        Genre: ${game.genre_id ? this.genreMap[game.genre_id] : 'N/A'}<br>
                        Company: ${game.company_id ? this.companyMap[game.company_id] : 'N/A'}<br>
                        Platform: ${game.platform_id ? this.platformMap[game.platform_id] : 'N/A'}<br>
                        <button id="deleteGameButton" onclick="deleteGame(${game.id_game})">Delete</button>
                        <button id="editGameButton" onclick="editGame(${game.id_game})">Edit</button>
                    `;

                    this.gameList.appendChild(listItem);
                }
            });

        } catch (error) {
            console.error('Error fetching games:', error);
        }
    }

    async init() {
        this.companyDropdown.addEventListener('change', () => {
            const selectedCompanyId = this.companyDropdown.value;
            const selectedGenreId = this.genreDropdown.value;
            const selectedPlatformId = this.platformDropdown.value;

            this.loadGamesByCompany(selectedCompanyId, selectedGenreId, selectedPlatformId);
        });

        this.genreDropdown.addEventListener('change', () => {
            const selectedCompanyId = this.companyDropdown.value;
            const selectedGenreId = this.genreDropdown.value;
            const selectedPlatformId = this.platformDropdown.value;

            this.loadGamesByCompany(selectedCompanyId, selectedGenreId, selectedPlatformId);
        });

        this.platformDropdown.addEventListener('change', () => {
            const selectedCompanyId = this.companyDropdown.value;
            const selectedGenreId = this.genreDropdown.value;
            const selectedPlatformId = this.platformDropdown.value;

            this.loadGamesByCompany(selectedCompanyId, selectedGenreId, selectedPlatformId);
        });

        try {
            const [genreResponse, companyResponse, platformResponse] = await Promise.all([
                fetch('http://localhost:3000/genre').then(response => response.json()),
                fetch('http://localhost:3000/company').then(response => response.json()),
                fetch('http://localhost:3000/platform').then(response => response.json())
            ]);

            this.fillCompanyDropdown(companyResponse);
            this.fillGenreDropdown(genreResponse);
            this.fillPlatformDropdown(platformResponse);

            genreResponse.forEach(genre => {
                this.genreMap[genre.id_genre] = genre.genre_desc;
            });

            companyResponse.forEach(company => {
                this.companyMap[company.id_company] = company.company_desc;
            });

            platformResponse.forEach(platform => {
                this.platformMap[platform.id_platform] = platform.platform_desc;
            });

            await this.loadGamesByCompany(null, null, null);
        } catch (error) {
            console.error('Error initializing:', error);
        }
    }

    fillCompanyDropdown(companies) {
        this.companyDropdown.innerHTML = '<option value="">Companies</option>';
        companies.forEach(company => {
            this.companyMap[company.id_company] = company.company_desc;
            const option = document.createElement('option');
            option.value = company.id_company;
            option.textContent = company.company_desc;
            this.companyDropdown.appendChild(option);
        });
    }

    fillGenreDropdown(genres) {
        this.genreDropdown.innerHTML = '<option value="">Genres</option>';
        genres.forEach(genre => {
            this.genreMap[genre.id_genre] = genre.genre_desc;
            const option = document.createElement('option');
            option.value = genre.id_genre;
            option.textContent = genre.genre_desc;
            this.genreDropdown.appendChild(option);
        });
    }

    fillPlatformDropdown(platforms) {
        this.platformDropdown.innerHTML = '<option value="">Platforms</option>';
        platforms.forEach(platform => {
            this.platformMap[platform.id_platform] = platform.platform_desc;
            const option = document.createElement('option');
            option.value = platform.id_platform;
            option.textContent = platform.platform_desc;
            this.platformDropdown.appendChild(option);
        });
    }
}

const companyPage = new CompanyPage();
companyPage.init();
