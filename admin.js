// ==================== Autenticación ====================
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

class AuthManager {
    constructor() {
        this.isAuthenticated = this.checkAuth();
    }

    checkAuth() {
        return sessionStorage.getItem('adminAuth') === 'true';
    }

    login(username, password) {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            sessionStorage.setItem('adminAuth', 'true');
            this.isAuthenticated = true;
            return true;
        }
        return false;
    }

    logout() {
        sessionStorage.removeItem('adminAuth');
        this.isAuthenticated = false;
    }
}

// ==================== Gestión de Productos (Admin) ====================
class AdminProductManager {
    constructor() {
        this.products = this.loadProducts();
    }

    loadProducts() {
        const stored = localStorage.getItem('products');
        return stored ? JSON.parse(stored) : [];
    }

    saveProducts() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    getProducts() {
        return this.products;
    }

    addProduct(productData) {
        const newProduct = {
            id: Date.now(),
            ...productData,
            price: parseFloat(productData.price)
        };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    updateProduct(id, productData) {
        const index = this.products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            this.products[index] = {
                ...this.products[index],
                ...productData,
                price: parseFloat(productData.price)
            };
            this.saveProducts();
            return this.products[index];
        }
        return null;
    }

    deleteProduct(id) {
        this.products = this.products.filter(p => p.id !== parseInt(id));
        this.saveProducts();
    }

    getProductById(id) {
        return this.products.find(p => p.id === parseInt(id));
    }

    getCategoryCount(category) {
        return this.products.filter(p => p.category === category).length;
    }
}

// ==================== Inicialización ====================
const authManager = new AuthManager();
const adminProductManager = new AdminProductManager();

// ==================== UI del Panel de Admin ====================
function showDashboard() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'flex';
    loadProductsTable();
    updateStats();
}

function showLogin() {
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

function updateStats() {
    const products = adminProductManager.getProducts();
    document.getElementById('totalProductsAdmin').textContent = products.length;
    document.getElementById('ropaCount').textContent = adminProductManager.getCategoryCount('ropa');
    document.getElementById('calzadoCount').textContent = adminProductManager.getCategoryCount('calzado');
    document.getElementById('accesoriosCount').textContent = adminProductManager.getCategoryCount('accesorios');
}

function loadProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    const products = adminProductManager.getProducts();

    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-light);">
                    No hay productos. ¡Agrega el primero!
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = products.map(product => `
        <tr>
            <td><img src="${product.image}" alt="${product.name}" class="table-img"></td>
            <td><strong>${product.name}</strong></td>
            <td>${getCategoryLabel(product.category)}</td>
            <td><strong>$${product.price.toFixed(2)}</strong></td>
            <td>
                <button class="btn-edit" onclick="editProduct(${product.id})">Editar</button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

function getCategoryLabel(category) {
    const labels = {
        'ropa': 'Ropa',
        'calzado': 'Calzado',
        'accesorios': 'Accesorios'
    };
    return labels[category] || category;
}

// ==================== Gestión de Productos ====================
function editProduct(id) {
    const product = adminProductManager.getProductById(id);
    if (!product) return;

    // Cambiar a la sección de agregar/editar
    showSection('add');
    
    // Llenar el formulario
    document.getElementById('editId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productDescription').value = product.description;
    
    // Mostrar preview
    const preview = document.getElementById('previewImg');
    preview.src = product.image;
    preview.style.display = 'block';
    
    // Cambiar texto del botón
    document.getElementById('submitBtn').textContent = 'Actualizar Producto';
    document.getElementById('sectionTitle').textContent = 'Editar Producto';
}

function deleteProduct(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        adminProductManager.deleteProduct(id);
        loadProductsTable();
        updateStats();
        showNotification('Producto eliminado correctamente', 'success');
    }
}

function resetForm() {
    document.getElementById('productForm').reset();
    document.getElementById('editId').value = '';
    document.getElementById('previewImg').style.display = 'none';
    document.getElementById('submitBtn').textContent = 'Agregar Producto';
    document.getElementById('sectionTitle').textContent = 'Agregar Producto';
}

// ==================== Navegación entre secciones ====================
function showSection(sectionName) {
    // Actualizar botones
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionName) {
            btn.classList.add('active');
        }
    });

    // Actualizar secciones
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });

    if (sectionName === 'products') {
        document.getElementById('productsSection').classList.add('active');
        document.getElementById('sectionTitle').textContent = 'Gestión de Productos';
        loadProductsTable();
    } else if (sectionName === 'add') {
        document.getElementById('addSection').classList.add('active');
        document.getElementById('sectionTitle').textContent = 'Agregar Producto';
        resetForm();
    }
}

// ==================== Notificaciones ====================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--danger)'};
        color: white;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== Event Listeners ====================
document.addEventListener('DOMContentLoaded', () => {
    // Verificar autenticación
    if (authManager.isAuthenticated) {
        showDashboard();
    } else {
        showLogin();
    }

    // Login Form
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (authManager.login(username, password)) {
            showDashboard();
            showNotification('¡Bienvenido, Administrador!', 'success');
        } else {
            showNotification('Usuario o contraseña incorrectos', 'error');
        }
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        authManager.logout();
        showLogin();
        showNotification('Sesión cerrada correctamente', 'success');
    });

    // Navegación sidebar
    document.querySelectorAll('.sidebar-btn[data-section]').forEach(btn => {
        btn.addEventListener('click', () => {
            showSection(btn.dataset.section);
        });
    });

    // Product Form
    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const productData = {
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            price: document.getElementById('productPrice').value,
            image: document.getElementById('productImage').value,
            description: document.getElementById('productDescription').value
        };

        const editId = document.getElementById('editId').value;

        if (editId) {
            // Actualizar producto existente
            adminProductManager.updateProduct(editId, productData);
            showNotification('Producto actualizado correctamente', 'success');
        } else {
            // Agregar nuevo producto
            adminProductManager.addProduct(productData);
            showNotification('Producto agregado correctamente', 'success');
        }

        resetForm();
        showSection('products');
        updateStats();
    });

    // Cancelar edición
    document.getElementById('cancelBtn').addEventListener('click', () => {
        resetForm();
        showSection('products');
    });

    // Preview de imagen
    document.getElementById('productImage').addEventListener('input', (e) => {
        const url = e.target.value;
        const preview = document.getElementById('previewImg');
        
        if (url) {
            preview.src = url;
            preview.style.display = 'block';
            preview.onerror = () => {
                preview.style.display = 'none';
            };
        } else {
            preview.style.display = 'none';
        }
    });

    // ==================== Menu hamburguesa (Responsive) ====================
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
        
        // Cerrar sidebar al hacer click en un botón en móvil
        document.querySelectorAll('.sidebar-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    sidebar.classList.remove('active');
                }
            });
        });
        
        // Cerrar sidebar al hacer click fuera en móvil
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }
});

// ==================== Estilos de animación ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
