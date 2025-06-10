/**
 * Script principal - Distribuidora de Bebidas
 * Contém funcionalidades gerais do site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    initializeMenu();
    initializeSearch();
});

/**
 * Inicializa o menu responsivo
 */
function initializeMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            
            // Alternar ícone do menu
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            if (!menu.contains(event.target) && !menuToggle.contains(event.target) && menu.classList.contains('active')) {
                menu.classList.remove('active');
                
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

/**
 * Inicializa a funcionalidade de busca
 */
function initializeSearch() {
    const searchForm = document.querySelector('.search-bar');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    if (searchForm && searchInput && searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch(searchInput.value);
        });
        
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch(searchInput.value);
        });
    }
}

/**
 * Realiza a busca de produtos
 * @param {string} query - Termo de busca
 */
function performSearch(query) {
    if (query.trim() === '') {
        alert('Por favor, digite um termo para busca.');
        return;
    }
    
    // Redirecionar para a página de produtos com o parâmetro de busca
    window.location.href = `${window.location.origin}/pages/products.html?search=${encodeURIComponent(query)}`;
}

/**
 * Formata um valor para o formato de moeda brasileira
 * @param {number} value - Valor a ser formatado
 * @returns {string} - Valor formatado
 */
function formatCurrency(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

/**
 * Obtém parâmetros da URL
 * @returns {Object} - Objeto com os parâmetros da URL
 */
function getUrlParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    
    for (let i = 0; i < pairs.length; i++) {
        if (!pairs[i]) continue;
        
        const pair = pairs[i].split('=');
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    
    return params;
}

/**
 * Exibe uma notificação temporária
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo de notificação (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Verificar se já existe uma notificação
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        // Criar elemento de notificação
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
        
        // Adicionar estilos
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.transition = 'all 0.3s ease';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
    }
    
    // Definir cor com base no tipo
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            notification.style.color = 'white';
            break;
        case 'error':
            notification.style.backgroundColor = '#F44336';
            notification.style.color = 'white';
            break;
        default:
            notification.style.backgroundColor = '#2196F3';
            notification.style.color = 'white';
    }
    
    // Definir mensagem
    notification.textContent = message;
    
    // Mostrar notificação
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Ocultar após 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        // Remover do DOM após a animação
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/**
 * Verifica se o usuário é maior de idade
 * @returns {boolean} - Verdadeiro se o usuário já confirmou ser maior de idade
 */
function isAdultUser() {
    return localStorage.getItem('isAdult') === 'true';
}

/**
 * Define o usuário como maior de idade
 */
function setAdultUser() {
    localStorage.setItem('isAdult', 'true');
}

/**
 * Redireciona para uma página de aviso para menores de idade
 */
function redirectUnderage() {
    window.location.href = 'https://www.gov.br/anvisa/pt-br/assuntos/fiscalizacao-e-monitoramento/alcool';
}

