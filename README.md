# ✂️ Sistema de Gestión de Citas para Barbería
## Proyecto Full Stack con Node.js, Express, MySQL y Frontend Moderno

<<<<<<< HEAD
### 👨‍💻 Desarrolladores
- **Juan José Palacios Giraldo**  
- **Diego Armando Palacios Cruz**  
- **Juan Pablo Giraldo Mosquera**
=======
## ✂️ Desarrolladores

-   Juan Jose Palacios Giraldo.
-   Diego Armando Palacios Cruz.
-   Juan Pablo Giraldo Mosquera.
  
## ✂️ Descripción del Proyecto
>>>>>>> 69773d5c64603c9de940b0683032c2167e45236b

---

## 📌 Descripción del Proyecto

Este proyecto implementa un **sistema completo de gestión de citas para una barbería**, con arquitectura **full-stack**, donde:

### 👤 Los clientes pueden:
- Reservar una cita eligiendo barbero, fecha, servicio y hora.
- Visualizar únicamente los horarios disponibles.
- Recibir correo de confirmación mediante **EmailJS**.
- Disfrutar de una interfaz moderna y animada.

### 💈 Los barberos pueden:
- Iniciar sesión con credenciales validadas desde MySQL.
- Ver sus citas clasificadas **por día**.
- Ver formato de fecha amigable:  
  *miércoles 19 de noviembre de 2025*
- Eliminar citas.
- Exportar agenda a CSV.
- Cerrar sesión.

### 🖥️ Backend API
- Node.js  
- Express  
- MySQL  
- CORS  
- CRUD completo: GET, POST, PUT, DELETE  

---

## 🚀 Funcionalidades Principales

### ⭐ Módulo Cliente
- Selección precisa del barbero mediante su **usuario**.
- Validación completa de fechas y horarios.
- Bloqueo de horas pasadas y ocupadas.
- Envío de correos automáticos.
- Diseño moderno.

### ⭐ Módulo Barbero
- Login conectado al backend.
- Filtrado automático por barbero.
- Agrupación por día.
- Eliminación de citas.
- Exportación CSV.

### ⭐ Backend
Rutas principales:

| Método | Ruta | Función |
|--------|------|---------|
| GET | `/api/citas` | Obtener citas |
| POST | `/api/citas` | Crear cita |
| DELETE | `/api/citas/:id` | Eliminar cita |
| POST | `/api/auth/login` | Login de barbero |

---

## 📁 Estructura del Proyecto

```
/proyecto-barberia
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── database.js
│   │   ├── app.js
│   │   └── models/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── barbero.html
│   ├── css/
│   ├── js/
│   └── img/
│
└── README.md
```

---

## 💽 Tecnologías Usadas

### Frontend
- HTML5  
- CSS3  
- JavaScript  
- EmailJS  
- FontAwesome  

### Backend
- Node.js  
- Express  
- MySQL2  
- Dotenv  
- CORS  

---

## 🔧 Instalación y Ejecución

### 1️⃣ Clonar repo
```bash
git clone https://github.com/tu-usuario/proyecto-barberia.git
```

### 2️⃣ Backend
```bash
cd backend
npm install
node src/app.js
```

Archivo `.env`:

```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=barberia
DB_NAME=barberia
DB_PORT=3306
```

### 3️⃣ EmailJS
Insertar credenciales en `script.js`.

---

## 🔑 Credenciales de prueba

| Usuario | Contraseña | Barbero |
|--------|------------|---------|
| jjpalacios | 1234 | Juan José Palacios |
| jpgiraldo | 1234 | Juan Pablo Giraldo |
| dpalacios | 1234 | Diego Palacios |

---

## 🌱 Mejoras Futuras
- JWT Authentication  
- Dashboard administrativo  
- Recordatorios WhatsApp  
- Citas recurrentes  

---

## 📜 Licencia
Uso libre educativo.
