/**
 * Script de verificação de idade - Distribuidora de Bebidas
 * Controla o modal de verificação de idade para acesso ao site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o modal de verificação de idade existe na página
    const ageVerification = document.getElementById('age-verification');
    
    if (ageVerification) {
        // Verificar se o usuário já confirmou a idade anteriormente
        if (!isAdultUser()) {
            showAgeVerification();
        } else {
            hideAgeVerification();
        }
        
        // Configurar botões de confirmação
        setupAgeVerificationButtons();
    }
});

/**
 * Exibe o modal de verificação de idade
 */
function showAgeVerification() {
    const ageVerification = document.getElementById('age-verification');
    
    if (ageVerification) {
        ageVerification.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Impedir rolagem da página
    }
}

/**
 * Oculta o modal de verificação de idade
 */
function hideAgeVerification() {
    const ageVerification = document.getElementById('age-verification');
    
    if (ageVerification) {
        ageVerification.style.display = 'none';
        document.body.style.overflow = ''; // Restaurar rolagem da página
    }
}

/**
 * Configura os botões do modal de verificação de idade
 */
function setupAgeVerificationButtons() {
    const confirmBtn = document.getElementById('confirm-age');
    const denyBtn = document.getElementById('deny-age');
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            // Salvar confirmação no localStorage
            setAdultUser();
            hideAgeVerification();
        });
    }
    
    if (denyBtn) {
        denyBtn.addEventListener('click', function() {
            // Redirecionar para site informativo sobre consumo de álcool
            redirectUnderage();
        });
    }
}

