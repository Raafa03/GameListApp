// Função para preencher uma dropdown com opções
function fillDropdown(dropdownId, options) {
    const dropdown = document.getElementById(dropdownId);

    // Limpar opções existentes
    dropdown.innerHTML = '';

    // Adicionar opção vazia
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = '';
    dropdown.appendChild(emptyOption);

    // Preencher as opções
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.id_genre || option.id_company || option.id_platform 
        optionElement.textContent = option.genre_desc || option.company_desc || option.platform_desc 
        dropdown.appendChild(optionElement);
    });
    
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        
        // Carregar dados de gênero, empresa e plataforma
        const [genres, companies, platforms] = await Promise.all([
            fetch('http://localhost:3000/genre').then(response => response.json()),
            fetch('http://localhost:3000/company').then(response => response.json()),
            fetch('http://localhost:3000/platform').then(response => response.json())
        ]);

        // Preencher as dropdowns com as opções
        fillDropdown('genre_desc', genres);
        fillDropdown('company_desc', companies);
        fillDropdown('platform_desc', platforms);

        

    } catch (error) {
        console.error('Error loading data:', error);
    }
});

// Função para atualizar o jogo
async function createGame() {
    const gameId = new URLSearchParams(window.location.search).get('id');
    const gameForm = document.getElementById('gameForm');
    const formData = new FormData(gameForm);

    try {
        // Criar um objeto JavaScript com os dados do formulário
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        
        
        const response = await fetch(`http://localhost:3000/game`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
        });

        
        if (response.ok) {
            // Jogo atualizado com sucesso - exibir pop-up
            alert('Jogo atualizado com sucesso!');
            // Redirecionar para a página de lista de jogos ou realizar outras ações necessárias
            window.location.href = 'index.html';
        } else {
            // Exibir mensagem de erro em pop-up
            alert('Erro ao atualizar jogo: ' + response.statusText);
        }
    } catch (error) {
        // Exibir mensagem de erro em pop-up
        alert('Erro ao atualizar jogo: ' + error.message);
    }
}