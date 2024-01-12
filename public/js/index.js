document.addEventListener('DOMContentLoaded', async function () {
    const gameList = document.getElementById('gameList');
    const sortOptionSelect = document.getElementById('sortOption');

    // Função para carregar a lista de jogos
    async function loadGames() {
        try {
            const [gamesResponse, genreResponse, companyResponse, platformResponse] = await Promise.all([
                fetch('http://localhost:3000/game').then(response => response.json()),
                fetch('http://localhost:3000/genre').then(response => response.json()),
                fetch('http://localhost:3000/company').then(response => response.json()),
                fetch('http://localhost:3000/platform').then(response => response.json())
            ]);

            // Ordena os jogos de acordo com a opção selecionada
            const sortOption = sortOptionSelect.value;
            gamesResponse.sort((a, b) => {
                switch (sortOption) {
                    case 'releaseDateDesc':
                        return new Date(b.release_date) - new Date(a.release_date);
                    case 'releaseDateAsc':
                        return new Date(a.release_date) - new Date(b.release_date);
                    case 'ratingDesc':
                        return b.rating - a.rating;
                    case 'ratingAsc':
                        return a.rating - b.rating;
                    case 'nameAsc':
                        return a.name.localeCompare(b.name);
                    case 'nameDesc':
                        return b.name.localeCompare(a.name);
                    default:
                        return 0; // Nenhuma ordenação
                }
            });

            gameList.innerHTML = '';

            gamesResponse.forEach(game => {
                const listItem = document.createElement('li');
                listItem.className = 'gameItem';
            
                listItem.innerHTML = `
                    <strong>${game.name}</strong><br>
                    Release Date: ${game.release_date}<br>
                    Rating: ${game.rating}<br>
                    Genre: ${game.genre_id ? genreResponse.find(genre => genre.id_genre === game.genre_id).genre_desc : 'N/A'}<br>
                    Company: ${game.company_id ? companyResponse.find(company => company.id_company === game.company_id).company_desc : 'N/A'}<br>
                    Platform: ${game.platform_id ? platformResponse.find(platform => platform.id_platform === game.platform_id).platform_desc : 'N/A'}<br>
                    <button id="deleteGameButton" onclick="deleteGame(${game.id_game})">Excluir</button>
                    <button id="editGameButton" onclick="editGame(${game.id_game})">Editar</button>
                `;
                gameList.appendChild(listItem);
            });

        } catch (error) {
            console.error('Error fetching games:', error);
        }
    }

    // Inicializa a lista de jogos ao carregar a página
    await loadGames();

    // Adiciona um ouvinte de evento para recarregar os jogos quando a opção de ordenação muda
    sortOptionSelect.addEventListener('change', loadGames);
});

function editGame(gameId) {
    // Redirecione para a página de edição com o ID do jogo
    window.location.href = `edit.html?id=${gameId}`;
}
