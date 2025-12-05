# 🛍️ StyleHub - Catálogo de Moda

Una página web moderna y creativa para catálogo de ropa, calzado y accesorios con panel de administración completo.

## ✨ Características

### Catálogo Principal
- **Diseño moderno y creativo** con gradientes y animaciones
- **Filtros por categoría**: Ropa, Calzado, Accesorios
- **Búsqueda en tiempo real** de productos
- **Modal de detalles** para cada producto
- **Responsive** - funciona en todos los dispositivos
- **Efectos visuales** con partículas animadas

### Panel de Administración
- **Sistema de autenticación** seguro
- **Gestión completa de productos**:
  - Agregar nuevos productos
  - Editar productos existentes
  - Eliminar productos
- **Estadísticas en tiempo real**
- **Vista previa de imágenes**
- **Interfaz intuitiva y fácil de usar**

## 🚀 Cómo usar

### Ver el Catálogo
1. Abre `index.html` en tu navegador
2. Explora los productos usando los filtros o la búsqueda
3. Haz clic en "Ver más" para ver detalles completos

### Acceder al Panel de Administración
1. Abre `admin.html` en tu navegador (o haz clic en "Admin" en el catálogo)
2. Inicia sesión con:
   - **Usuario**: `admin`
   - **Contraseña**: `admin123`
3. Gestiona tus productos desde el panel

### Agregar/Editar Productos
1. En el panel de admin, haz clic en "Agregar Producto"
2. Completa el formulario:
   - Nombre del producto
   - Categoría (Ropa, Calzado, Accesorios)
   - Precio
   - URL de la imagen (usa URLs de servicios como Unsplash)
   - Descripción
3. Haz clic en "Agregar Producto" para guardar

## 🎨 Productos de Ejemplo

El catálogo incluye 12 productos de ejemplo con imágenes de alta calidad:

- **Ropa**: Chaquetas, vestidos, camisas, jeans, sudaderas
- **Calzado**: Zapatillas deportivas, botas Chelsea, sandalias, zapatos Oxford
- **Accesorios**: Relojes, bolsos, gafas de sol

## 💾 Almacenamiento

Los datos se guardan en el **localStorage** del navegador, por lo que:
- ✅ Los productos persisten entre sesiones
- ✅ No se necesita servidor ni base de datos
- ⚠️ Los datos son específicos del navegador usado

## 🎯 Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con gradientes, animaciones y efectos
- **JavaScript ES6+**: Lógica funcional y gestión de datos
- **Google Fonts**: Tipografías Playfair Display y Poppins
- **Unsplash**: Imágenes de alta calidad

## 📱 Responsive Design

La página se adapta perfectamente a:
- 📱 Móviles
- 📱 Tablets
- 💻 Desktop

## 🎨 Características de Diseño

- **Gradientes dinámicos** en toda la interfaz
- **Animaciones suaves** en interacciones
- **Efectos de hover** creativos
- **Partículas flotantes** en el fondo
- **Sombras y profundidad** para UI moderna
- **Glassmorphism** en elementos UI

## 🔐 Seguridad

La autenticación actual es básica y para demostración. Para producción:
- Implementa autenticación con backend
- Usa HTTPS
- Hashea las contraseñas
- Implementa tokens de sesión

## 📝 Personalización

Puedes personalizar fácilmente:
- **Colores**: Modifica las variables CSS en `styles.css`
- **Productos iniciales**: Edita el array `defaultProducts` en `app.js`
- **Credenciales de admin**: Modifica `ADMIN_CREDENTIALS` en `admin.js`

## 🌟 Futuras Mejoras

Ideas para expandir el proyecto:
- [ ] Carrito de compras
- [ ] Sistema de favoritos
- [ ] Comentarios y valoraciones
- [ ] Múltiples imágenes por producto
- [ ] Gestión de inventario
- [ ] Integración con pasarelas de pago
- [ ] Backend con base de datos
- [ ] Sistema de usuarios

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y personales.

---

**Creado con ❤️ y mucho estilo**
