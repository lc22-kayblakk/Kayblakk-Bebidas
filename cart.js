/**
 * Script do carrinho de compras - Distribuidora de Bebidas
 * Gerencia todas as operações relacionadas ao carrinho de compras
 */

// Classe para gerenciar o carrinho de compras
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
        this.setupEventListeners();
    }
    
    /**
     * Carrega os itens do carrinho do localStorage
     * @returns {Array} - Array de itens do carrinho
     */
    loadCart() {
        const savedCart = localStorage.getItem('shoppingCart');
        return savedCart ? JSON.parse(savedCart) : [];
    }
    
    /**
     * Salva os itens do carrinho no localStorage
     */
    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
        this.updateCartCount();
    }
    
    /**
     * Adiciona um produto ao carrinho
     * @param {Object} product - Produto a ser adicionado
     * @param {number} quantity - Quantidade do produto
     */
    addItem(product, quantity = 1) {
        // Verificar se o produto já está no carrinho
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            // Atualizar quantidade se o produto já existir
            existingItem.quantity += quantity;
        } else {
            // Adicionar novo produto
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.showAddedToCartNotification(product.name);
    }
    
    /**
     * Remove um item do carrinho
     * @param {string|number} productId - ID do produto a ser removido
     */
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }
    
    /**
     * Atualiza a quantidade de um item no carrinho
     * @param {string|number} productId - ID do produto
     * @param {number} quantity - Nova quantidade
     */
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        
        if (item) {
            if (quantity > 0) {
                item.quantity = quantity;
            } else {
                // Se a quantidade for 0 ou negativa, remover o item
                this.removeItem(productId);
            }
            
            this.saveCart();
        }
    }
    
    /**
     * Limpa todos os itens do carrinho
     */
    clearCart() {
        this.items = [];
        this.saveCart();
    }
    
    /**
     * Calcula o subtotal do carrinho
     * @returns {number} - Valor do subtotal
     */
    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    /**
     * Calcula o total do carrinho (subtotal + taxa de entrega)
     * @param {number} deliveryFee - Taxa de entrega
     * @returns {number} - Valor total
     */
    getTotal(deliveryFee = 10) {
        return this.getSubtotal() + deliveryFee;
    }
    
    /**
     * Atualiza o contador de itens no carrinho
     */
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const totalItems = this.items.reduce((count, item) => count + item.quantity, 0);
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }
    
    /**
     * Exibe notificação de produto adicionado ao carrinho
     * @param {string} productName - Nome do produto adicionado
     */
    showAddedToCartNotification(productName) {
        showNotification(`${productName} adicionado ao carrinho!`, 'success');
    }
    
    /**
     * Configura os event listeners para os botões de adicionar ao carrinho
     */
    setupEventListeners() {
        // Adicionar event listeners para botões de "Adicionar ao Carrinho"
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-add-cart')) {
                const productId = event.target.getAttribute('data-id');
                const productCard = event.target.closest('.product-card');
                
                if (productCard) {
                    const product = {
                        id: productId,
                        name: productCard.querySelector('h3').textContent,
                        price: parseFloat(productCard.querySelector('.product-price').textContent.replace('R$ ', '').replace(',', '.')),
                        image: productCard.querySelector('img').src,
                        category: productCard.querySelector('.product-category').textContent
                    };
                    
                    this.addItem(product);
                }
            }
        });
    }
    
    /**
     * Gera a mensagem para o WhatsApp com os detalhes do pedido
     * @param {Object} customerInfo - Informações do cliente
     * @returns {string} - Mensagem formatada para o WhatsApp
     */
    generateWhatsAppMessage(customerInfo) {
        let message = `*Novo Pedido - Distribuidora de Bebidas*\n\n`;
        
        // Informações do cliente
        message += `*Cliente:* ${customerInfo.name}\n`;
        message += `*Endereço:* ${customerInfo.address}\n`;
        message += `*Telefone:* ${customerInfo.phone}\n`;
        message += `*Forma de Pagamento:* ${customerInfo.paymentMethod}\n\n`;
        
        // Itens do pedido
        message += `*Itens do Pedido:*\n`;
        
        this.items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            message += `- ${item.quantity}x ${item.name} - R$ ${itemTotal.toFixed(2).replace('.', ',')}\n`;
        });
        
        // Valores
        const subtotal = this.getSubtotal();
        const deliveryFee = 10.00;
        const total = this.getTotal(deliveryFee);
        
        message += `\n*Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
        message += `*Taxa de Entrega:* R$ ${deliveryFee.toFixed(2).replace('.', ',')}\n`;
        message += `*Total:* R$ ${total.toFixed(2).replace('.', ',')}\n\n`;
        
        // Observações
        if (customerInfo.notes) {
            message += `*Observações:* ${customerInfo.notes}\n\n`;
        }
        
        message += `Obrigado pela preferência!`;
        
        return message;
    }
}

// Inicializar o carrinho quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Criar instância global do carrinho
    window.shoppingCart = new ShoppingCart();
    
    // Configurar página de carrinho se estiver na página de carrinho
    if (window.location.pathname.includes('cart.html')) {
        setupCartPage();
    }
});

/**
 * Configura a página de carrinho
 */
function setupCartPage() {
    const cart = window.shoppingCart;
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartContent = document.getElementById('cart-content');
    const clearCartBtn = document.getElementById('clear-cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Verificar se os elementos existem
    if (!cartItemsContainer || !cartEmpty || !cartContent) return;
    
    // Limpar itens existentes (exemplos)
    cartItemsContainer.innerHTML = '';
    
    // Verificar se o carrinho está vazio
    if (cart.items.length === 0) {
        cartEmpty.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }
    
    // Exibir conteúdo do carrinho
    cartEmpty.style.display = 'none';
    cartContent.style.display = 'grid';
    
    // Adicionar itens do carrinho
    cart.items.forEach(item => {
        const cartItemElement = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Adicionar ações do carrinho
    const cartActions = document.createElement('div');
    cartActions.className = 'cart-actions';
    cartActions.innerHTML = `
        <a href="categories.html" class="continue-shopping">
            <i class="fas fa-arrow-left"></i> Continuar Comprando
        </a>
        <div class="clear-cart" id="clear-cart">Limpar Carrinho</div>
    `;
    cartItemsContainer.appendChild(cartActions);
    
    // Atualizar resumo do pedido
    updateOrderSummary();
    
    // Configurar eventos
    setupCartEvents();
}

/**
 * Cria um elemento de item do carrinho
 * @param {Object} item - Item do carrinho
 * @returns {HTMLElement} - Elemento do item do carrinho
 */
function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.setAttribute('data-id', item.id);
    
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
            <h3 class="cart-item-name">${item.name}</h3>
            <p class="cart-item-category">${item.category}</p>
            <p class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
        </div>
        <div class="cart-item-actions">
            <div class="quantity-control">
                <div class="quantity-btn decrease">-</div>
                <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                <div class="quantity-btn increase">+</div>
            </div>
            <div class="remove-item">
                <i class="fas fa-trash"></i>
            </div>
        </div>
    `;
    
    return cartItem;
}

/**
 * Atualiza o resumo do pedido
 */
function updateOrderSummary() {
    const cart = window.shoppingCart;
    const subtotalElement = document.querySelector('.summary-item:first-child span:last-child');
    const totalElement = document.querySelector('.summary-total span:last-child');
    
    if (subtotalElement && totalElement) {
        const subtotal = cart.getSubtotal();
        const total = cart.getTotal();
        
        subtotalElement.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        totalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

/**
 * Configura os eventos da página de carrinho
 */
function setupCartEvents() {
    const cart = window.shoppingCart;
    const clearCartBtn = document.getElementById('clear-cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Evento para limpar carrinho
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            cart.clearCart();
            setupCartPage(); // Recarregar página do carrinho
        });
    }
    
    // Eventos para os botões de quantidade
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const productId = cartItem.getAttribute('data-id');
            const quantityInput = cartItem.querySelector('.quantity-input');
            let quantity = parseInt(quantityInput.value);
            
            if (this.classList.contains('increase')) {
                quantity++;
            } else if (this.classList.contains('decrease') && quantity > 1) {
                quantity--;
            }
            
            cart.updateQuantity(productId, quantity);
            quantityInput.value = quantity;
            updateOrderSummary();
        });
    });
    
    // Eventos para os botões de remover item
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const productId = cartItem.getAttribute('data-id');
            
            cart.removeItem(productId);
            setupCartPage(); // Recarregar página do carrinho
        });
    });
    
    // Evento para finalizar pedido via WhatsApp
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const name = document.getElementById('client-name').value;
            const address = document.getElementById('client-address').value;
            const phone = document.getElementById('client-phone').value;
            const paymentMethodSelect = document.getElementById('payment-method');
            const paymentMethod = paymentMethodSelect.options[paymentMethodSelect.selectedIndex].text;
            const notes = document.getElementById('order-notes').value;
            
            // Validar campos obrigatórios
            if (!name || !address || !phone || !paymentMethodSelect.value) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Gerar mensagem para WhatsApp
            const message = cart.generateWhatsAppMessage({
                name,
                address,
                phone,
                paymentMethod,
                notes
            });
            
            // Codificar mensagem para URL
            const encodedMessage = encodeURIComponent(message);
            
            // Número de WhatsApp da loja (substitua pelo número real)
            const whatsappNumber = '5500123456789';
            
            // Abrir WhatsApp com a mensagem
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        });
    }
}

