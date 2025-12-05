// ==================== Datos de Productos ====================
// Productos de ejemplo con imágenes de Unsplash
const defaultProducts = [
    {
        id: 1,
        name: "Chaqueta de Cuero Premium",
        category: "ropa",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop",
        description: "Chaqueta de cuero genuino con forro interior suave. Perfecta para cualquier ocasión. Diseño atemporal y duradero."
    },
    {
        id: 2,
        name: "Zapatillas Deportivas Ultra",
        category: "calzado",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop",
        description: "Zapatillas de alto rendimiento con tecnología de amortiguación avanzada. Ideales para running y uso diario."
    },
    {
        id: 3,
        name: "Vestido Elegante Floral",
        category: "ropa",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=600&fit=crop",
        description: "Vestido elegante con estampado floral. Perfecto para eventos especiales. Tejido ligero y cómodo."
    },
    {
        id: 4,
        name: "Botas Chelsea de Cuero",
        category: "calzado",
        price: 189.99,
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&h=600&fit=crop",
        description: "Botas Chelsea clásicas de cuero genuino. Suela antideslizante y máxima comodidad. Estilo versátil."
    },
    {
        id: 5,
        name: "Camisa de Lino Blanca",
        category: "ropa",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=600&fit=crop",
        description: "Camisa de lino 100% natural. Transpirable y perfecta para el verano. Corte moderno y elegante."
    },
    {
        id: 6,
        name: "Reloj Minimalista de Acero",
        category: "accesorios",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=600&fit=crop",
        description: "Reloj minimalista con caja de acero inoxidable. Resistente al agua. Diseño sofisticado y atemporal."
    },
    {
        id: 7,
        name: "Jean Slim Fit Oscuro",
        category: "ropa",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop",
        description: "Jean de corte slim fit en denim premium. Elástico y cómodo. Color oscuro versátil para cualquier look."
    },
    {
        id: 8,
        name: "Sandalias de Verano",
        category: "calzado",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&h=600&fit=crop",
        description: "Sandalias cómodas con suela acolchada. Perfectas para la playa o uso casual. Diseño moderno."
    },
    {
        id: 9,
        name: "Bolso de Mano Elegante",
        category: "accesorios",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=600&fit=crop",
        description: "Bolso de mano en cuero sintético premium. Múltiples compartimentos. Ideal para el día a día."
    },
    {
        id: 10,
        name: "Sudadera con Capucha",
        category: "ropa",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop",
        description: "Sudadera de algodón con capucha. Interior afelpado suave. Perfecta para el clima fresco."
    },
    {
        id: 11,
        name: "Gafas de Sol Polarizadas",
        category: "accesorios",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop",
        description: "Gafas de sol con lentes polarizadas UV400. Montura ligera y resistente. Estilo aviador clásico."
    },
    {
        id: 12,
        name: "Zapatos Oxford Clásicos",
        category: "calzado",
        price: 179.99,
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&h=600&fit=crop",
        description: "Zapatos Oxford de cuero genuino. Perfectos para ocasiones formales. Suela de goma antideslizante."
    }
];

// ==================== Gestión de Productos ====================
class ProductManager {
    constructor() {
        this.products = this.loadProducts();
        this.currentFilter = 'all';
        this.searchTerm = '';
    }

    loadProducts() {
        const stored = localStorage.getItem('products');
        if (!stored) {
            localStorage.setItem('products', JSON.stringify(defaultProducts));
            return defaultProducts;
        }
        return JSON.parse(stored);
    }

    saveProducts() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    getProducts() {
        return this.products.filter(product => {
            const matchesFilter = this.currentFilter === 'all' || product.category === this.currentFilter;
            const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                                product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }

    addProduct(product) {
        const newProduct = {
            id: Date.now(),
            ...product
        };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    updateProduct(id, updatedData) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedData };
            this.saveProducts();
            return this.products[index];
        }
        return null;
    }

    deleteProduct(id) {
        this.products = this.products.filter(p => p.id !== id);
        this.saveProducts();
    }

    getProductById(id) {
        return this.products.find(p => p.id === id);
    }

    setFilter(filter) {
        this.currentFilter = filter;
    }

    setSearch(term) {
        this.searchTerm = term;
    }

    getCategoryCount(category) {
        return this.products.filter(p => p.category === category).length;
    }
}

// ==================== Inicialización ====================
const productManager = new ProductManager();

// ==================== Renderizado de Productos ====================
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const products = productManager.getProducts();
    
    if (products.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <h2 style="font-size: 2rem; color: var(--text-light);">No se encontraron productos</h2>
                <p style="color: var(--text-light); margin-top: 10px;">Intenta con otro término de búsqueda o filtro</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <span class="product-badge">${getCategoryLabel(product.category)}</span>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="btn-view" onclick="openModal(${product.id})">Ver más</button>
                </div>
            </div>
        </div>
    `).join('');

    // Actualizar contador
    document.getElementById('totalProducts').textContent = productManager.products.length;
}

function getCategoryLabel(category) {
    const labels = {
        'ropa': 'Ropa',
        'calzado': 'Calzado',
        'accesorios': 'Accesorios'
    };
    return labels[category] || category;
}

// ==================== Modal ====================
function openModal(id) {
    const product = productManager.getProductById(id);
    if (!product) return;

    const modal = document.getElementById('productModal');
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalCategory').textContent = getCategoryLabel(product.category);
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = `$${product.price.toFixed(2)}`;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('productModal').classList.remove('active');
}

// ==================== Filtros y Búsqueda ====================
document.addEventListener('DOMContentLoaded', () => {
    // Renderizar productos iniciales
    renderProducts();

    // Filtros de navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            productManager.setFilter(filter);
            renderProducts();
        });
    });

    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            productManager.setSearch(e.target.value);
            renderProducts();
        });
    }

    // Modal
    const modal = document.getElementById('productModal');
    const closeBtn = document.getElementById('closeModal');
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// ==================== Animación de partículas ====================
function createParticles() {
    const particles = document.querySelector('.particles');
    if (!particles) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particles.appendChild(particle);
    }
}

// Crear partículas al cargar
if (document.querySelector('.particles')) {
    createParticles();
}
