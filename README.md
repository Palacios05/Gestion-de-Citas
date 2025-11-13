# 📄 README -- Sistema de Gestión de Citas para Barbería

## ✂️ Descripción del Proyecto

Este sistema web permite a una barbería gestionar citas de forma
eficiente. Incluye:

-   Vista cliente para reservar citas.
-   Panel del barbero con login interno, listado de citas, eliminación y
    exportación CSV.
-   Sistema de correos automáticos usando EmailJS.
-   Persistencia local mediante LocalStorage.

Es un proyecto 100% frontend, ligero y simple de desplegar.

## 🚀 Características Principales

### Módulo Cliente

-   Reservas con validación de fecha, hora y barbero asignado.
-   Horarios generados automáticamente según disponibilidad.
-   Bloqueo de horas ocupadas o pasadas.
-   Envío de correo de confirmación.
-   Interfaz moderna con animaciones.

### Módulo Barbero

-   Inicio de sesión para cada barbero.
-   Visualización de citas ordenadas por fecha y hora.
-   Eliminación de citas.
-   Exportación en CSV.
-   Cierre de sesión seguro.

## 📁 Estructura del Proyecto

    /proyecto-barberia
    │
    ├── index.html
    ├── login.html
    ├── barbero.html
    │
    ├── css/
    │   └── styles.css
    │
    ├── js/
    │   ├── script.js
    │   └── panel-barbero.js
    │
    └── img/
        ├── barberia-salon.jpeg
        └── icono_barber.png

## 👥 Distribución del Trabajo (3 Desarrolladores)

### Persona 1 -- Módulo Cliente

-   index.html
-   script.js

### Persona 2 -- Login + Panel del Barbero

-   login.html
-   barbero.html
-   panel-barbero.js

### Persona 3 -- Estilos globales

-   styles.css

## 💽 Tecnologías Usadas

-   HTML5
-   CSS3
-   JavaScript
-   LocalStorage
-   EmailJS
-   FontAwesome

## 🔧 Cómo ejecutar el proyecto

### 1. Clonar el repositorio

    git clone https://github.com/tu-usuario/proyecto-barberia.git

### 2. Abrir el proyecto

Abrir `index.html` en el navegador.

### 3. Configurar EmailJS

1.  Crear cuenta en https://www.emailjs.com/
2.  Obtener Service ID, Template ID y Public Key
3.  Reemplazarlos en `script.js`

## 🔑 Credenciales de prueba

| Usuario    | Contraseña | Barbero              |
|------------|------------|----------------------|
| jjpalacios | 1234       | Juan Jose Palacios   |
| jpgiraldo  | 1234       | Juan Pablo Giraldo   |
| dpalacios  | 1234       | Diego Palacios       |

## 🌱 Mejoras Futuras

-   Migrar LocalStorage a base de datos real.
-   Calendario visual interactivo.
-   Panel administrativo completo.
-   Notificaciones SMS o WhatsApp.

## 📜 Licencia

Uso libre educativo.
