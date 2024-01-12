const confirmationModal = document.getElementById('confirmationModal')
const confirmDeleteBtn = document.getElementById('confirmDelete')
const cancelDeleteBtn = document.getElementById('cancelDelete')

async function deleteGame(gameId) {
    try {
        // Exibir o Popup
        confirmationModal.style.display = 'block'

        // Adicionar listeners para os botões do Popup
        confirmDeleteBtn.addEventListener('click', async () => {
            const response = await fetch(`http://localhost:3000/game/${gameId}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                window.location.reload()
            } else {
                // Exibir mensagem de erro no Popup
                alert('Erro ao excluir jogo: ' + response.statusText)
            }

            // Fechar o Popup após eliminar um jogo
            confirmationModal.style.display = 'none'
        })

        cancelDeleteBtn.addEventListener('click', () => {
            confirmationModal.style.display = 'none'
        })
    } catch (error) {
        alert('Erro ao excluir jogo: ' + error.message)
        confirmationModal.style.display = 'none'
    }
}

// Fechar o Popup se o user clicar fora do Popup
window.addEventListener('click', (event) => {
    if (event.target === confirmationModal) {
        confirmationModal.style.display = 'none'
    }
})
