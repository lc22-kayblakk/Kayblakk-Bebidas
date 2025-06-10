/**
 * Script de produtos - Distribuidora de Bebidas
 * Gerencia a exibição e filtragem de produtos
 */

// Dados de exemplo para produtos (em um site real, esses dados viriam de um backend)
const productsData = {
    cervejas: [
        {
            id: 'c1',
            name: 'Cerveja Premium',
            category: 'Cervejas',
            price: 8.90,
            image: '../images/products/cerveja-exemplo.jpg'
        },
        {
            id: 'c2',
            name: 'Cerveja Especial',
            category: 'Cervejas',
            price: 12.90,
            image: '../images/products/cerveja-exemplo2.jpg'
        },
        {
            id: 'c3',
            name: 'Cerveja Artesanal',
            category: 'Cervejas',
            price: 15.90,
            image: '../images/products/cerveja-exemplo3.jpg'
        },
        {
            id: 'c4',
            name: 'Cerveja Importada',
            category: 'Cervejas',
            price: 18.90,
            image: '../images/products/cerveja-exemplo4.jpg'
        },
        {
            id: 'c5',
            name: 'Cerveja Pilsen',
            category: 'Cervejas',
            price: 7.90,
            image: '../images/products/cerveja-exemplo5.jpg'
        },
        {
            id: 'c6',
            name: 'Cerveja Lager',
            category: 'Cervejas',
            price: 9.90,
            image: '../images/products/cerveja-exemplo6.jpg'
        },
        {
            id: 'c7',
            name: 'Cerveja IPA',
            category: 'Cervejas',
            price: 16.90,
            image: '../images/products/cerveja-exemplo7.jpg'
        },
        {
            id: 'c8',
            name: 'Cerveja Stout',
            category: 'Cervejas',
            price: 14.90,
            image: '../images/products/cerveja-exemplo8.jpg'
        }
    ],
    destilados: [
        {
            id: 'd1',
            name: 'Whisky 12 Anos',
            category: 'Destilados',
            price: 129.90,
            image: '../images/products/whisky-exemplo.jpg'
        },
        {
            id: 'd2',
            name: 'Vodka Premium',
            category: 'Destilados',
            price: 89.90,
            image: '../images/products/vodka-exemplo.jpg'
        },
        {
            id: 'd3',
            name: 'Gin London Dry',
            category: 'Destilados',
            price: 99.90,
            image: '../images/products/gin-exemplo.jpg'
        },
        {
            id: 'd4',
            name: 'Tequila Gold',
            category: 'Destilados',
            price: 119.90,
            image: '../images/products/tequila-exemplo.jpg'
        }
    ],
    vinhos: [
        {
            id: 'v1',
            name: 'Vinho Tinto Seco',
            category: 'Vinhos',
            price: 59.90,
            image: '../images/products/vinho-exemplo.jpg'
        },
        {
            id: 'v2',
            name: 'Vinho Branco Suave',
            category: 'Vinhos',
            price: 49.90,
            image: '../images/products/vinho-exemplo2.jpg'
        },
        {
            id: 'v3',
            name: 'Vinho Rosé',
            category: 'Vinhos',
            price: 54.90,
            image: '../images/products/vinho-exemplo3.jpg'
        },
        {
            id: 'v4',
            name: 'Espumante Brut',
            category: 'Vinhos',
            price: 69.90,
            image: '../images/products/espumante-exemplo.jpg'
        }
    ],
    'nao-alcoolicos': [
        {
            id: 'na1',
            name: 'Refrigerante Cola',
            category: 'Não Alcoólicos',
            price: 6.90,
            image: '../images/products/refrigerante-exemplo.jpg'
        },
        {
            id: 'na2',
            name: 'Suco Natural',
            category: 'Não Alcoólicos',
            price: 8.90,
            image: '../images/products/suco-exemplo.jpg'
        },
        {
            id: 'na3',
            name: 'Energético Premium',
            category: 'Não Alcoólicos',
            price: 9.90,
            image: '../images/products/energetico-exemplo.jpg'
        },
        {
            id: 'na4',
            name: 'Água Mineral',
            category: 'Não Alcoólicos',
            price: 3.50,
            image: '../images/products/agua-exemplo.jpg'
        }
    ],
    tabacaria: [
        {
            id: 't1',
            name: 'Cigarro Nacional',
            category: 'Tabacaria',
            price: 10.00,
            image: '../images/products/cigarro-exemplo.jpg'
        },
        {
            id: 't2',
            name: 'Cigarro Importado',
            category: 'Tabacaria',
            price: 25.00,
            image: '../images/products/cigarro-exemplo2.jpg'
        },
        {
            id: 't3',
            name: 'Cigarrilha',
            category: 'Tabacaria',
            price: 30.00,
            image: '../images/products/cigarrilha-exemplo.jpg'
        },
        {
            id: 't4',
            name: 'Isqueiro',
            category: 'Tabacaria',
            price: 5.00,
            image: '../images/products/isqueiro-exemplo.jpg'
        }
    ],
    complementos: [
        {
            id: 'co1',
            name: 'Gelo em Cubos',
            category: 'Complementos',
            price: 8.00,
            image: '../images/products/gelo-exemplo.jpg'
        },
        {
            id: 'co2',
            name: 'Carvão para Churrasco',
            category: 'Complementos',
            price: 15.00,
            image: '../images/products/carvao-exemplo.jpg'
        },
        {
            id: 'co3',
            name: 'Salgadinhos',
            category: 'Complementos',
            price: 7.50,
            image: '../images/products/salgadinho-exemplo.jpg'
        },
        {
            id: 'co4',
            name: 'Copos Descartáveis',
            category: 'Complementos',
            price: 5.00,
            image: '../images/products/copos-exemplo.jpg'
        }
    ]
};

// Classe para gerenciar produtos
class ProductManager {
    constructor() {
        this.products = this.getAllProducts();
        this.currentCategory = null;
        this.currentPage = 1;
        this.itemsPerPage = 8;
        this.filters = {
            sort: 'default',
            price: 'all',
            search: ''
        };
    }
    
    /**
     * Obtém todos os produtos de todas as categorias
     * @returns {Array} - Array com todos os produtos
     */
    getAllProducts() {
        let allProducts = [];
        
        for (const category in productsData) {
            allProducts = allProducts.concat(productsData[category]);
        }
        
        return allProducts;
    }
    
    /**
     * Obtém produtos de uma categoria específica
     * @param {string} category - Nome da categoria
     * @returns {Array} - Array com os produtos da categoria
     */
    getProductsByCategory(category) {
        return productsData[category] || [];
    }
    
    /**
     * Filtra produtos com base nos filtros atuais
     * @returns {Array} - Array com os produtos filtrados
     */
    getFilteredProducts() {
        let filteredProducts = this.currentCategory ? 
            this.getProductsByCategory(this.currentCategory) : 
            this.getAllProducts();
        
        // Aplicar filtro de busca
        if (this.filters.search) {
            const searchTerm = this.filters.search.toLowerCase();
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.category.toLowerCase().includes(searchTerm)
            );
        }
        
        // Aplicar filtro de preço
        if (this.filters.price !== 'all') {
            const priceRange = this.filters.price.split('-');
            
            if (priceRange.length === 2) {
                const minPrice = parseFloat(priceRange[0]);
                const maxPrice = parseFloat(priceRange[1]);
                
                filteredProducts = filteredProducts.filter(product => 
                    product.price >= minPrice && product.price <= maxPrice
                );
            } else if (this.filters.price === '100+') {
                filteredProducts = filteredProducts.filter(product => product.price >= 100);
            }
        }
        
        // Aplicar ordenação
        switch (this.filters.sort) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
        
        return filteredProducts;
    }
    
    /**
     * Obtém produtos para a página atual
     * @returns {Array} - Array com os produtos da página atual
     */
    getCurrentPageProducts() {
        const filteredProducts = this.getFilteredProducts();
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        
        return filteredProducts.slice(startIndex, endIndex);
    }
    
    /**
     * Calcula o número total de páginas
     * @returns {number} - Número total de páginas
     */
    getTotalPages() {
        const filteredProducts = this.getFilteredProducts();
        return Math.ceil(filteredProducts.length / this.itemsPerPage);
    }
    
    /**
     * Define a categoria atual
     * @param {string} category - Nome da categoria
     */
    setCategory(category) {
        this.currentCategory = category;
        this.currentPage = 1; // Resetar para a primeira página
    }
    
    /**
     * Define a página atual
     * @param {number} page - Número da página
     */
    setPage(page) {
        const totalPages = this.getTotalPages();
        
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
        }
    }
    
    /**
     * Define os filtros
     * @param {Object} filters - Objeto com os filtros
     */
    setFilters(filters) {
        this.filters = { ...this.filters, ...filters };
        this.currentPage = 1; // Resetar para a primeira página
    }
    
    /**
     * Renderiza os produtos na página
     * @param {HTMLElement} container - Elemento onde os produtos serão renderizados
     */
    renderProducts(container) {
        if (!container) return;
        
        // Limpar container
        container.innerHTML = '';
        
        const products = this.getCurrentPageProducts();
        
        if (products.length === 0) {
            // Exibir mensagem de nenhum produto encontrado
            container.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>Nenhum produto encontrado</h3>
                    <p>Tente ajustar seus filtros ou buscar por outro termo.</p>
                </div>
            `;
            return;
        }
        
        // Renderizar produtos
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-category">${product.category}</p>
                    <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                    <button class="btn btn-add-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
                </div>
            `;
            
            container.appendChild(productCard);
        });
    }
    
    /**
     * Renderiza a paginação
     * @param {HTMLElement} container - Elemento onde a paginação será renderizada
     */
    renderPagination(container) {
        if (!container) return;
        
        // Limpar container
        container.innerHTML = '';
        
        const totalPages = this.getTotalPages();
        
        if (totalPages <= 1) {
            container.style.display = 'none';
            return;
        }
        
        container.style.display = 'flex';
        
        // Botão para página anterior
        if (this.currentPage > 1) {
            const prevBtn = document.createElement('div');
            prevBtn.className = 'pagination-item';
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevBtn.addEventListener('click', () => {
                this.setPage(this.currentPage - 1);
                this.updateProductsView();
            });
            container.appendChild(prevBtn);
        }
        
        // Páginas
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        // Primeira página
        if (startPage > 1) {
            const firstPageBtn = document.createElement('div');
            firstPageBtn.className = 'pagination-item';
            firstPageBtn.textContent = '1';
            firstPageBtn.addEventListener('click', () => {
                this.setPage(1);
                this.updateProductsView();
            });
            container.appendChild(firstPageBtn);
            
            // Ellipsis
            if (startPage > 2) {
                const ellipsis = document.createElement('div');
                ellipsis.className = 'pagination-item';
                ellipsis.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
                container.appendChild(ellipsis);
            }
        }
        
        // Páginas visíveis
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('div');
            pageBtn.className = 'pagination-item';
            if (i === this.currentPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                this.setPage(i);
                this.updateProductsView();
            });
            container.appendChild(pageBtn);
        }
        
        // Última página
        if (endPage < totalPages) {
            // Ellipsis
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('div');
                ellipsis.className = 'pagination-item';
                ellipsis.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
                container.appendChild(ellipsis);
            }
            
            const lastPageBtn = document.createElement('div');
            lastPageBtn.className = 'pagination-item';
            lastPageBtn.textContent = totalPages;
            lastPageBtn.addEventListener('click', () => {
                this.setPage(totalPages);
                this.updateProductsView();
            });
            container.appendChild(lastPageBtn);
        }
        
        // Botão para próxima página
        if (this.currentPage < totalPages) {
            const nextBtn = document.createElement('div');
            nextBtn.className = 'pagination-item';
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.addEventListener('click', () => {
                this.setPage(this.currentPage + 1);
                this.updateProductsView();
            });
            container.appendChild(nextBtn);
        }
    }
    
    /**
     * Atualiza a visualização de produtos e paginação
     */
    updateProductsView() {
        const productsContainer = document.getElementById('products-container');
        const paginationContainer = document.querySelector('.pagination');
        
        this.renderProducts(productsContainer);
        this.renderPagination(paginationContainer);
    }
    
    /**
     * Inicializa a página de produtos
     */
    initProductsPage() {
        // Obter parâmetros da URL
        const urlParams = getUrlParams();
        
        // Definir categoria se especificada na URL
        if (urlParams.category) {
            this.setCategory(urlParams.category);
            
            // Atualizar título e descrição da categoria
            this.updateCategoryInfo(urlParams.category);
        }
        
        // Definir termo de busca se especificado na URL
        if (urlParams.search) {
            this.setFilters({ search: urlParams.search });
            
            // Atualizar campo de busca
            const searchInput = document.getElementById('product-search');
            if (searchInput) {
                searchInput.value = urlParams.search;
            }
        }
        
        // Configurar filtros
        this.setupFilters();
        
        // Renderizar produtos e paginação
        this.updateProductsView();
    }
    
    /**
     * Atualiza as informações da categoria
     * @param {string} category - Nome da categoria
     */
    updateCategoryInfo(category) {
        const categoryTitle = document.getElementById('category-title');
        const categoryDescription = document.getElementById('category-description');
        const currentCategory = document.getElementById('current-category');
        
        if (categoryTitle && categoryDescription && currentCategory && category) {
            // Formatar nome da categoria
            const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
            
            // Atualizar elementos
            categoryTitle.textContent = formattedCategory;
            currentCategory.textContent = formattedCategory;
            
            // Definir descrição com base na categoria
            switch(category) {
                case 'cervejas':
                    categoryDescription.textContent = 'Explore nossa seleção de cervejas nacionais, importadas e artesanais.';
                    break;
                case 'destilados':
                    categoryDescription.textContent = 'Descubra nossa coleção premium de destilados para todos os gostos.';
                    break;
                case 'vinhos':
                    categoryDescription.textContent = 'Vinhos tintos, brancos, rosés e espumantes para todas as ocasiões.';
                    break;
                case 'nao-alcoolicos':
                    categoryDescription.textContent = 'Opções refrescantes sem álcool para toda a família.';
                    break;
                case 'tabacaria':
                    categoryDescription.textContent = 'Produtos de tabacaria e acessórios de qualidade.';
                    break;
                case 'complementos':
                    categoryDescription.textContent = 'Itens essenciais para complementar suas bebidas e eventos.';
                    break;
                default:
                    categoryDescription.textContent = 'Confira nossa seleção de produtos de alta qualidade.';
            }
        }
    }
    
    /**
     * Configura os filtros da página de produtos
     */
    setupFilters() {
        const sortFilter = document.getElementById('sort-filter');
        const priceFilter = document.getElementById('price-filter');
        const searchInput = document.getElementById('product-search');
        const searchBtn = document.getElementById('search-btn');
        
        // Evento de ordenação
        if (sortFilter) {
            sortFilter.addEventListener('change', () => {
                this.setFilters({ sort: sortFilter.value });
                this.updateProductsView();
            });
        }
        
        // Evento de filtro de preço
        if (priceFilter) {
            priceFilter.addEventListener('change', () => {
                this.setFilters({ price: priceFilter.value });
                this.updateProductsView();
            });
        }
        
        // Evento de busca
        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', () => {
                this.setFilters({ search: searchInput.value });
                this.updateProductsView();
            });
            
            // Permitir busca ao pressionar Enter
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    searchBtn.click();
                }
            });
        }
    }
}

// Inicializar o gerenciador de produtos quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página de produtos
    if (window.location.pathname.includes('products.html')) {
        const productManager = new ProductManager();
        productManager.initProductsPage();
    }
    
    // Verificar se estamos na página inicial (para exibir produtos populares)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        const popularProductsContainer = document.getElementById('popular-products-container');
        
        if (popularProductsContainer) {
            // Obter produtos populares (neste exemplo, usamos alguns produtos aleatórios)
            const allProducts = new ProductManager().getAllProducts();
            const popularProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
            
            // Limpar container
            popularProductsContainer.innerHTML = '';
            
            // Renderizar produtos populares
            popularProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="product-category">${product.category}</p>
                        <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                        <button class="btn btn-add-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
                    </div>
                `;
                
                popularProductsContainer.appendChild(productCard);
            });
        }
    }
});
