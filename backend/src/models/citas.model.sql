-- Modelo de base de datos para la tabla de citas de la barbería

CREATE TABLE IF NOT EXISTS citas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(60) NOT NULL,
    email VARCHAR(80) NOT NULL,
    barbero VARCHAR(60) NOT NULL,
    servicio VARCHAR(60) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL
);
