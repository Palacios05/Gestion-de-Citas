# ✂️ Sistema de Gestión de Citas para Barbería
## Proyecto Full Stack con Node.js, Express, MySQL y Frontend Moderno

### 👨‍💻 Desarrolladores
- **Juan José Palacios Giraldo**  
- **Diego Armando Palacios Cruz**  
- **Juan Pablo Giraldo Mosquera**

---

## 📌 Descripción del Proyecto

Sistema completo para administrar citas en una barbería, con:

### 👤 Vista Cliente
- Reservar citas con fecha, hora, barbero y servicio.  
- Validar disponibilidad real.  
- Bloqueo de horarios pasados u ocupados.  
- Envío de correo automático (EmailJS).  
- Interfaz moderna con animaciones.

### 💈 Vista Barbero
- Login conectado a MySQL.  
- Visualización de citas **agrupadas por día**.  
- Fechas formateadas de forma amigable (ej: “miércoles 19 de noviembre de 2025”).  
- Eliminar citas.  
- Exportar citas a CSV.  
- Cerrar sesión.

### 🖥️ Backend API
- Node.js  
- Express  
- MySQL  
- CORS  
- CRUD: GET, POST, DELETE  

---

# 📁 Estructura del Proyecto

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

# 🛠️ Instalación y Ejecución

## 1️⃣ Instalar dependencias
Desde el folder **backend/**:

```bash
npm install
```

---

## 2️⃣ Crear archivo `.env`

Ubicación: **backend/.env**

```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=barberia
DB_PORT=3306
```

---

# 🛢️ Script de la Base de Datos MySQL

Ejecutar en MySQL Workbench, CLI o phpMyAdmin:

```sql
CREATE DATABASE IF NOT EXISTS barberia;
USE barberia;

CREATE TABLE barberos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

INSERT INTO barberos (nombre, usuario, password) VALUES
('Juan José Palacios', 'jjpalacios', '1234'),
('Juan Pablo Giraldo', 'jpgiraldo', '1234'),
('Diego Palacios', 'dpalacios', '1234');

CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    barbero VARCHAR(50) NOT NULL,
    servicio VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL
);
```

---

# ▶️ 3️⃣ Levantar el Backend

```bash
node src/app.js
```

Si todo está bien:

```
Servidor corriendo en puerto 4000
Conectado a MySQL
```

---

# 🌐 4️⃣ Ejecutar el Frontend

Abrir en el navegador:

```
frontend/index.html
```

---

# 📧 5️⃣ Configurar EmailJS

En `frontend/js/script.js`:

```js
emailjs.init("TU_PUBLIC_KEY");
emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", templateParams);
```

Credenciales desde:  
🔗 https://dashboard.emailjs.com/

---

# 🔑 Credenciales de prueba

| Usuario | Contraseña | Barbero |
|--------|------------|---------|
| jjpalacios | 1234 | Juan José Palacios |
| jpgiraldo | 1234 | Juan Pablo Giraldo |
| dpalacios | 1234 | Diego Palacios |

---

# 🧪 6️⃣ Probar la API Manualmente

### Obtener todas las citas:
```
GET http://localhost:4000/api/citas
```

### Crear una cita:
```
POST http://localhost:4000/api/citas
Content-Type: application/json

{
  "nombre": "Carlos",
  "email": "carlos@mail.com",
  "barbero": "jjpalacios",
  "servicio": "Corte de cabello",
  "fecha": "2025-11-20",
  "hora": "15:00"
}
```

### Eliminar cita:
```
DELETE http://localhost:4000/api/citas/3
```

---

# 📜 Licencia
Uso libre con fines educativos.
