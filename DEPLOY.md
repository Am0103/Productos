# StyleHub - Catálogo de Moda

Sitio web optimizado para Netlify con integración de WhatsApp.

## 🚀 Deploy en Netlify

### Opción 1: Arrastrar y soltar
1. Ve a [Netlify](https://app.netlify.com)
2. Arrastra toda la carpeta del proyecto
3. ¡Listo!

### Opción 2: Con Git
1. Sube el proyecto a GitHub
2. Conecta tu repositorio en Netlify
3. Deploy automático en cada push

## ⚙️ Configuración Importante

### Número de WhatsApp
Antes de subir a Netlify, **DEBES cambiar el número de WhatsApp** en `app.js`:

```javascript
// Línea 1-3 en app.js
const WHATSAPP_NUMBER = '573001234567'; // Cambia por tu número
```

**Formato del número:**
- ✅ Incluye código de país (sin +)
- ✅ Sin espacios ni guiones
- ✅ Ejemplos:
  - Colombia: `573001234567`
  - México: `521234567890`
  - España: `34612345678`
  - Argentina: `5491123456789`

### Estructura de archivos
```
/
├── index.html          # Página principal
├── admin.html          # Panel admin
├── styles.css          # Estilos
├── app.js             # Lógica catálogo
├── admin.js           # Lógica admin
├── netlify.toml       # Config Netlify
└── README.md          # Documentación
```

## 📱 Funcionalidades

### Catálogo
- ✅ Responsive (móvil, tablet, desktop)
- ✅ Filtros por categoría
- ✅ Búsqueda en tiempo real
- ✅ **Botón de WhatsApp** en cada producto
- ✅ Modal con detalles
- ✅ Productos guardados en localStorage

### Panel Admin
- ✅ Login: `admin` / `admin123`
- ✅ Agregar/editar/eliminar productos
- ✅ Vista previa de imágenes
- ✅ Menú hamburguesa en móvil
- ✅ Estadísticas en tiempo real

## 🎯 Uso de WhatsApp

Cuando un cliente hace clic en "Consultar por WhatsApp":
1. Se abre WhatsApp Web o la app
2. El mensaje incluye:
   - Nombre del producto
   - Precio
   - Categoría
   - Descripción
3. Cliente solo debe enviar el mensaje

## 🔧 Personalización

### Cambiar colores
Edita las variables CSS en `styles.css` (líneas 2-21):
```css
:root {
    --primary: #6366f1;    /* Color principal */
    --secondary: #ec4899;  /* Color secundario */
    --accent: #f59e0b;     /* Color de acento */
}
```

### Cambiar credenciales admin
En `admin.js` (líneas 1-4):
```javascript
const ADMIN_CREDENTIALS = {
    username: 'admin',      // Tu usuario
    password: 'admin123'    // Tu contraseña
};
```

### Agregar productos iniciales
En `app.js` (líneas 5-100):
```javascript
const defaultProducts = [
    {
        name: "Tu producto",
        category: "ropa",
        price: 99.99,
        image: "URL_de_imagen",
        description: "Descripción"
    }
];
```

## 📊 URLs de imágenes

Usa servicios gratuitos:
- **Unsplash**: https://unsplash.com
- **Pexels**: https://pexels.com
- **Pixabay**: https://pixabay.com

Formato recomendado: `https://images.unsplash.com/photo-xxxxx?w=800`

## 🌐 Después del Deploy

1. Tu sitio estará en: `https://tu-sitio.netlify.app`
2. Puedes cambiar el dominio en la configuración de Netlify
3. Los productos se guardan en el navegador de cada usuario
4. Actualiza productos desde el panel admin

## 📞 Soporte

Para cambiar el número de WhatsApp después del deploy:
1. Edita `app.js`
2. Sube los cambios a Git
3. Netlify redeploya automáticamente

---

**¡Tu catálogo está listo para vender! 🛍️**
