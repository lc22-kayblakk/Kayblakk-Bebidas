/**
 * Script de integração com WhatsApp - Distribuidora de Bebidas
 * Gerencia a integração do carrinho com o WhatsApp para finalização de pedidos
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página de carrinho
    if (window.location.pathname.includes('cart.html')) {
        setupWhatsAppIntegration();
    }
});

/**
 * Configura a integração com WhatsApp na página de carrinho
 */
function setupWhatsAppIntegration() {
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // Validar formulário
            if (!validateCheckoutForm()) {
                return;
            }
            
            // Obter informações do cliente
            const customerInfo = getCustomerInfo();
            
            // Gerar mensagem para WhatsApp
            const message = generateWhatsAppMessage(customerInfo);
            
            // Enviar para WhatsApp
            sendToWhatsApp(message);
        });
    }
}

/**
 * Valida o formulário de checkout
 * @returns {boolean} - Verdadeiro se o formulário for válido
 */
function validateCheckoutForm() {
    const name = document.getElementById('client-name').value;
    const address = document.getElementById('client-address').value;
    const phone = document.getElementById('client-phone').value;
    const paymentMethod = document.getElementById('payment-method').value;
    
    // Verificar campos obrigatórios
    if (!name || !address || !phone || !paymentMethod) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        
        // Destacar campos vazios
        if (!name) highlightInvalidField('client-name');
        if (!address) highlightInvalidField('client-address');
        if (!phone) highlightInvalidField('client-phone');
        if (!paymentMethod) highlightInvalidField('payment-method');
        
        return false;
    }
    
    // Validar formato do telefone (opcional)
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
        // Formato flexível, apenas alertar
        showNotification('O formato ideal do telefone é (00) 00000-0000, mas prosseguiremos com o formato atual.', 'info');
    }
    
    return true;
}

/**
 * Destaca um campo inválido
 * @param {string} fieldId - ID do campo
 */
function highlightInvalidField(fieldId) {
    const field = document.getElementById(fieldId);
    
    if (field) {
        field.style.borderColor = '#e53e3e';
        field.style.backgroundColor = 'rgba(229, 62, 62, 0.05)';
        
        // Remover destaque ao digitar
        field.addEventListener('input', function() {
            this.style.borderColor = '';
            this.style.backgroundColor = '';
        }, { once: true });
    }
}

/**
 * Obtém as informações do cliente do formulário
 * @returns {Object} - Objeto com as informações do cliente
 */
function getCustomerInfo() {
    return {
        name: document.getElementById('client-name').value,
        address: document.getElementById('client-address').value,
        phone: document.getElementById('client-phone').value,
        paymentMethod: document.getElementById('payment-method').options[document.getElementById('payment-method').selectedIndex].text,
        notes: document.getElementById('order-notes').value
    };
}

/**
 * Gera a mensagem para o WhatsApp com os detalhes do pedido
 * @param {Object} customerInfo - Informações do cliente
 * @returns {string} - Mensagem formatada para o WhatsApp
 */
function generateWhatsAppMessage(customerInfo) {
    // Obter itens do carrinho
    const cart = window.shoppingCart || { items: [], getSubtotal: () => 0, getTotal: () => 0 };
    
    let message = `*Novo Pedido - Distribuidora de Bebidas*\n\n`;
    
    // Informações do cliente
    message += `*Cliente:* ${customerInfo.name}\n`;
    message += `*Endereço:* ${customerInfo.address}\n`;
    message += `*Telefone:* ${customerInfo.phone}\n`;
    message += `*Forma de Pagamento:* ${customerInfo.paymentMethod}\n\n`;
    
    // Itens do pedido
    message += `*Itens do Pedido:*\n`;
    
    if (cart.items.length === 0) {
        message += `- Nenhum item no carrinho\n`;
    } else {
        cart.items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            message += `- ${item.quantity}x ${item.name} - R$ ${itemTotal.toFixed(2).replace('.', ',')}\n`;
        });
    }
    
    // Valores
    const subtotal = cart.getSubtotal();
    const deliveryFee = 10.00;
    const total = cart.getTotal(deliveryFee);
    
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

/**
 * Envia a mensagem para o WhatsApp
 * @param {string} message - Mensagem a ser enviada
 */
function sendToWhatsApp(message) {
    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Número de WhatsApp da loja (substitua pelo número real)
    const whatsappNumber = '5500123456789';
    
    // Abrir WhatsApp com a mensagem
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    // Opcional: Limpar carrinho após envio
    // Se desejar limpar o carrinho automaticamente, descomente a linha abaixo
    // window.shoppingCart.clearCart();
    
    // Mostrar mensagem de sucesso
    showNotification('Pedido enviado com sucesso! Redirecionando para o WhatsApp...', 'success');
}

