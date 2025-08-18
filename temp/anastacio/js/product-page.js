// js/product-page.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para a Galeria de Imagens do Produto ---
    const mainProductImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    // Verifica se os elementos existem antes de adicionar event listeners
    if (mainProductImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // Remove a classe 'active' de todas as miniaturas
                thumbnails.forEach(t => t.classList.remove('active'));
                // Adiciona a classe 'active' à miniatura clicada
                thumbnail.classList.add('active');
                // Altera a imagem principal para a src da miniatura clicada
                mainProductImage.src = thumbnail.src;
            });
        });
    }

    // --- Lógica para as Abas de Informação (Descrição, Especificações, Avaliações) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Verifica se os elementos das abas existem
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove a classe 'active' de todos os botões de aba
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Adiciona a classe 'active' ao botão clicado
                button.classList.add('active');

                // Esconde todo o conteúdo das abas
                tabContents.forEach(content => content.classList.remove('active'));

                // Pega o ID da aba a ser mostrada (do atributo data-tab)
                const targetTabId = button.dataset.tab;
                // Mostra o conteúdo da aba correspondente
                const targetTabContent = document.getElementById(targetTabId);
                if (targetTabContent) {
                    targetTabContent.classList.add('active');
                }
            });
        });

        // Opcional: Ativar a primeira aba por padrão ao carregar a página
        // Isso garante que uma aba esteja sempre visível se nenhuma estiver ativa inicialmente
        const activeTabFound = Array.from(tabButtons).some(btn => btn.classList.contains('active'));
        if (!activeTabFound && tabButtons[0]) {
            tabButtons[0].click(); // Simula um clique no primeiro botão para ativá-lo
        }
    }

    // --- Exemplo de Lógica para o botão "Adicionar ao Carrinho" (simulado) ---
    const addToCartButton = document.querySelector('.add-to-cart-button');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const productName = document.querySelector('.product-title').textContent;
            const productPrice = document.querySelector('.product-price').textContent;
            const quantity = document.getElementById('quantity') ? document.getElementById('quantity').value : 1;
            const selectedColor = document.getElementById('color-select') ? document.getElementById('color-select').value : 'Não especificado';

            // Você pode adicionar uma lógica real aqui para adicionar ao carrinho,
            // como enviar dados para um servidor, atualizar um ícone de carrinho, etc.
            alert(`"${productName}" (Cor: ${selectedColor}, Qtd: ${quantity}) adicionado ao carrinho! Preço: ${productPrice}`);

            // Exemplo: Simular um pequeno feedback visual
            addToCartButton.textContent = 'Adicionado!';
            addToCartButton.style.backgroundColor = 'green';
            setTimeout(() => {
                addToCartButton.textContent = 'Adicionar ao Carrinho';
                addToCartButton.style.backgroundColor = 'var(--detail-color2)'; // Volta à cor original
            }, 2000);
        });
    }

    // --- Exemplo de Lógica para o botão "Deixar uma avaliação" (simulado) ---
    const addReviewButton = document.querySelector('.add-review-button');
    if (addReviewButton) {
        addReviewButton.addEventListener('click', () => {
            // Aqui você pode abrir um modal, redirecionar para uma página de avaliação, etc.
            alert('Funcionalidade para "Deixar uma avaliação" será implementada. Abrir modal de avaliação ou redirecionar.');
        });
    }

    // --- Exemplo de Lógica para o botão "Ver Detalhes" nos produtos relacionados (simulado) ---
    // Note que seus botões de produtos relacionados agora têm a classe 'details-button'
    const relatedDetailsButtons = document.querySelectorAll('.related-products-grid .details-button');
    if (relatedDetailsButtons.length > 0) {
        relatedDetailsButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                // Previne o comportamento padrão (se o botão estiver dentro de um link, por exemplo)
                event.preventDefault();
                // Aqui você pode obter o ID do produto ou o link para a página do produto clicado
                const productCard = button.closest('.highlight-card');
                const productName = productCard ? productCard.querySelector('.legend').textContent : 'Este produto';
                alert(`Redirecionando para a página de detalhes de "${productName}"... (Funcionalidade de redirecionamento real seria adicionada aqui)`);
                // Exemplo de redirecionamento real:
                // window.location.href = 'product-page.html?id=algumIDdoProduto';
            });
        });
    }

});