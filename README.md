# Hardware UTN — E-commerce Full Stack

Tienda online de hardware y periféricos de PC. Proyecto de **Programación 3** de la Tecnicatura Universitaria en Programación (UTN FRRO).

**Integrantes:** Fabricio Columba · Leonel Longo · Tobias Auzmendi

## Funcionalidades

- Catálogo de productos con categorías (Periféricos, Accesorios, Componentes) y detalle de cada producto.
- Carrito de compras y confirmación de pedidos.
- Registro e inicio de sesión de usuarios con JWT.
- Historial de compras y perfil de usuario.
- Panel de administración para gestionar productos, usuarios y compras.
- Roles de usuario: `user`, `admin` y `superAdmin`.
- Páginas informativas: cómo comprar, términos y quiénes somos.
- Notificaciones en pantalla y rutas protegidas.

## Stack

| Capa | Tecnologías |
|---|---|
| Frontend | React 19, Vite, React Router, React Bootstrap / Bootstrap, Context API, React Icons, React Toastify |
| Backend | Node.js, Express 5, Sequelize (ORM), Morgan |
| Base de datos | SQLite |
| Autenticación | JSON Web Tokens (`jsonwebtoken`) |
