# Calificación Alumnos

Aplicación web académica para registrar los datos de un alumno y sus calificaciones por materia, con persistencia en **Firebase Realtime Database**. Fue desarrollada como práctica universitaria con HTML, CSS y JavaScript escritos manualmente, sin utilizar un framework frontend como React, Angular o Vue.

<div align="center">
  <a href="https://migueldotdev.github.io/web-calif-alumnos/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Ver%20demo-2ea44f?style=for-the-badge" alt="Ver demo de Calificación Alumnos">
  </a>
</div>

## Características

- Registro de datos personales y académicos del alumno.
- Selección de cuatrimestre, unidad académica y periodo.
- Captura de varias materias con calificación y tipo de evaluación: ordinaria, remedial o extraordinaria.
- Validación progresiva del formulario.
- Tabla dinámica para revisar, editar o eliminar materias antes de enviarlas.
- Consulta de catálogos y almacenamiento de información mediante Firebase Realtime Database.
- Notificaciones visuales y componentes de interfaz basados en Bootstrap.

## Tecnologías utilizadas

| Tecnología | Uso |
| --- | --- |
| HTML5 | Estructura de la aplicación y formularios. |
| CSS3 y SCSS | Estilos personalizados y presentación de la interfaz. |
| JavaScript nativo (ES6+) | Validación, eventos, manipulación del DOM y lógica de la aplicación. |
| Firebase Realtime Database | Consulta de catálogos y almacenamiento de alumnos y calificaciones. |
| Firebase JavaScript SDK | Comunicación entre la aplicación web y Firebase. |
| Bootstrap 5 | Diseño adaptable y componentes de interfaz. |
| SweetAlert2 | Alertas y notificaciones. |
| AOS | Animaciones de entrada. |
| Google Fonts y Material Symbols | Tipografía e iconografía. |

El frontend está construido con HTML, CSS/SCSS y JavaScript escritos directamente para el proyecto. Bootstrap y las demás bibliotecas listadas complementan la interfaz; no se utiliza un framework frontend. Las bibliotecas se cargan desde CDN y el repositorio no requiere `npm` para ejecutar la versión compilada.

## Funcionamiento

1. El usuario captura los datos personales del alumno.
2. Selecciona el cuatrimestre, la unidad académica y el periodo.
3. Agrega las materias con su calificación y tipo de evaluación.
4. Revisa la tabla y, si hace falta, edita o elimina materias antes del envío.
5. Envía el registro para guardar los datos en Firebase Realtime Database.

Los catálogos de cuatrimestres y unidades académicas se leen desde Firebase. Las materias agregadas permanecen en memoria mientras se completa la captura, hasta que se envía el registro.

## Estructura del proyecto

```text
web-calif-alumnos/
├── index.html
├── CSS/
│   ├── style.scss
│   ├── style.css
│   └── style.css.map
└── JS/
    ├── app.js
    ├── firebase.js
    └── verificacion.js
```

- `index.html`: punto de entrada y estructura de la interfaz.
- `CSS/style.scss`: estilos fuente escritos para el proyecto.
- `CSS/style.css`: hoja de estilos compilada que utiliza la aplicación.
- `JS/verificacion.js`: validación progresiva y habilitación de campos.
- `JS/app.js`: administración de las materias en la tabla y notificaciones.
- `JS/firebase.js`: inicialización de Firebase, lectura de catálogos y escritura de datos.

## Ejecutar localmente

### Requisitos

- Un navegador moderno con soporte para módulos JavaScript ES.
- Un servidor HTTP local.
- Un proyecto de Firebase con Realtime Database habilitada y los catálogos necesarios configurados.

### Pasos

1. Clona el repositorio:

   ```bash
   git clone https://github.com/MiguelDotDev/web-calif-alumnos.git
   cd web-calif-alumnos
   ```

2. Configura Firebase siguiendo la sección siguiente.

3. Inicia un servidor local desde la raíz del proyecto. Con Python 3 puedes ejecutar:

   ```bash
   python3 -m http.server 8000
   ```

4. Abre [http://localhost:8000](http://localhost:8000) en el navegador.

También puedes utilizar una extensión como Live Server en Visual Studio Code. Debido al uso de módulos JavaScript, ejecuta la aplicación mediante HTTP en lugar de abrir directamente `index.html` con `file://`.

## Configuración de Firebase

La conexión a Firebase se inicializa en `JS/firebase.js`. Para ejecutar una instancia propia:

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/) y habilita Realtime Database.
2. Registra una aplicación web y copia la configuración proporcionada por Firebase.
3. Sustituye el objeto `firebaseConfig` de `JS/firebase.js` por la configuración de tu proyecto.
4. Crea los nodos `Cuatrimestre` y `Unidades`, con los datos que alimentarán los selectores.
5. Configura las reglas de Realtime Database de acuerdo con tu entorno de uso.

La aplicación espera una estructura de datos equivalente a la siguiente:

```text
Cuatrimestre/
  <clave>/
    nombre: "..."

Unidades/
  <clave>/
    name: "..."

Alumnos/
  <numeroDeControl>/
    NoControl: "..."
    nombre: "..."
    ApellidoPat: "..."
    ApellidoMat: "..."
    sexo: "..."
    cuatrimestre: "..."

Calificaciones/
  <numeroDeControl>-<unidad>-<materia>/
    alumnoID: "..."
    materia: "..."
    unidad: "..."
    periodo: "..."
    calificacion: "..."
    tipoCalificacion: "..."
```

## Alcance académico

Este proyecto permite poner en práctica conceptos de desarrollo frontend, manipulación dinámica del DOM, validación de formularios, programación asíncrona con `async/await` y persistencia de datos en Firebase.

Es una práctica académica, no un sistema institucional de producción. La edición y eliminación de materias en la tabla se realizan antes del envío; la interfaz no permite modificar o eliminar desde ella registros ya guardados. Las validaciones se centran principalmente en comprobar que los campos requeridos estén completos.

## Autor

Desarrollado por **[MiguelDotDev](https://github.com/MiguelDotDev)**.
