// delete.js

const confirmationModal = document.getElementById('confirmationModal');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const cancelDeleteBtn = document.getElementById('cancelDelete');

async function deleteGame(gameId) {
    try {
        // Exibir o modal de confirmação
        confirmationModal.style.display = 'block';

        // Adicionar listeners para os botões do modal
        confirmDeleteBtn.addEventListener('click', async () => {
            const response = await fetch(`http://localhost:3000/game/${gameId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                window.location.reload();
            } else {
                // Exibir mensagem de erro em pop-up
                alert('Erro ao excluir jogo: ' + response.statusText);
            }

            // Fechar o modal após a ação
            confirmationModal.style.display = 'none';
        });

        cancelDeleteBtn.addEventListener('click', () => {
            // Fechar o modal sem realizar a ação
            confirmationModal.style.display = 'none';
        });
    } catch (error) {
        // Exibir mensagem de erro em pop-up
        alert('Erro ao excluir jogo: ' + error.message);
        // Fechar o modal em caso de erro
        confirmationModal.style.display = 'none';
    }
}

// Fechar o modal se o usuário clicar fora da área do modal
window.addEventListener('click', (event) => {
    if (event.target === confirmationModal) {
        confirmationModal.style.display = 'none';
    }
});
