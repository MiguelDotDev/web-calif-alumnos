# Calificación Alumnos

Aplicación web académica para capturar los datos de un alumno, registrar las calificaciones de sus materias y almacenarlas en Firebase Realtime Database.

El proyecto fue desarrollado como práctica universitaria con HTML, CSS y JavaScript escritos manualmente. No utiliza un framework frontend de JavaScript como React, Angular o Vue: la interfaz, la validación de formularios, la manipulación del DOM y la comunicación con Firebase están implementadas directamente en el código del proyecto. Bootstrap se emplea como biblioteca de estilos y componentes de interfaz.

## Descripción

**Calificación Alumnos** es una aplicación de una sola página orientada al registro de calificaciones por alumno. El flujo principal consiste en:

1. Capturar los datos personales y académicos del alumno.
2. Seleccionar el cuatrimestre, la unidad académica y el periodo.
3. Registrar una o varias materias con su calificación y tipo de evaluación.
4. Revisar, editar o eliminar las materias agregadas antes del envío.
5. Guardar al alumno y sus calificaciones en Firebase Realtime Database.

La aplicación consulta desde Firebase los catálogos de cuatrimestres y unidades académicas, y utiliza una tabla generada dinámicamente para administrar las materias durante la captura. Está pensada como un ejercicio académico de desarrollo frontend y persistencia de datos, no como un sistema institucional en producción.

## Características principales

- **Registro de datos del alumno:** número de control, nombre, apellidos, sexo y cuatrimestre.
- **Validación progresiva del formulario:** los campos se habilitan en orden y el botón para agregar materias permanece deshabilitado hasta completar los datos requeridos.
- **Catálogos cargados desde Firebase:** los selectores de cuatrimestre y unidad académica se llenan con la información almacenada en Realtime Database.
- **Registro de múltiples materias:** cada materia se agrega mediante un modal con nombre, calificación y tipo de calificación (ordinaria, remedial o extraordinaria).
- **Administración local de la tabla:** las materias agregadas pueden editarse o eliminarse antes de enviar la información.
- **Persistencia en Firebase:** al confirmar el envío, se guardan los datos del alumno y todas las calificaciones capturadas.
- **Retroalimentación visual:** uso de SweetAlert2 para notificaciones, AOS para animaciones de entrada y estilos personalizados sobre Bootstrap. Animate.css también está incluida como recurso, aunque no se encontraron clases suyas aplicadas en la interfaz.

## Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
| --- | --- |
| **HTML5** | Estructura de la interfaz: secciones de datos del alumno, datos del periodo, tabla de materias y modal de registro. |
| **CSS3** | Estilos personalizados, gradientes, estados de inputs, animaciones y presentación de la tabla y el modal. |
| **SCSS** | Fuente de los estilos, organizada con anidamiento y variables. Se compila en `CSS/style.css`, que es el archivo cargado por la página. |
| **JavaScript nativo (ES6+)** | Lógica de la interfaz, validaciones, manipulación dinámica del DOM, manejo de eventos y operaciones asíncronas. |
| **Firebase Realtime Database** | Lectura de catálogos y escritura de alumnos y calificaciones. |
| **Firebase SDK 10.12.3** | SDK web cargado como módulo ES desde los CDN de Google (`firebase-app.js` y `firebase-database.js`). |
| **Bootstrap 5.3.3** | Rejilla, formularios, tabla, modal y botones base. |
| **SweetAlert2 11** | Alertas y notificaciones tipo toast. |
| **AOS 2.3.1** | Animaciones de entrada de los elementos de la interfaz. |
| **Animate.css 4.1.1** | Hoja de estilos de animaciones incluida en la página. |
| **Google Fonts** | Tipografía Roboto. |
| **Material Symbols** | Iconos utilizados en títulos, botones y acciones de la tabla. |

El proyecto no incluye `package.json`, bundler ni dependencias instalables mediante npm. Bootstrap, SweetAlert2, AOS y las fuentes se cargan desde CDN.

## Desarrollo e implementación

### Interfaz y estructura HTML

La aplicación se concentra en `index.html` y se organiza en dos secciones principales:

- **Datos del alumno y del periodo:** formulario con campos de identificación, datos personales, sexo, cuatrimestre, unidad académica y periodo.
- **Datos de la materia:** tabla donde se acumulan las materias capturadas y botón para subir las calificaciones a Firebase.

El registro de cada materia se realiza en un modal de Bootstrap. La tabla se construye dinámicamente desde JavaScript; el HTML solo define su cabecera y el cuerpo vacío.

### Estilos CSS

Los estilos se escribieron en `CSS/style.scss` y se compilan en `CSS/style.css`, archivo que consume la página. La hoja personalizada define:

- Gradientes y fondos para las secciones y el modal.
- Estados visuales para inputs habilitados, deshabilitados y enfocados.
- Estilos para los inputs editables de la tabla.
- Botones de edición y eliminación, junto con sus estados de interacción.
- Reglas de transición y ocultamiento para el mensaje que indica completar primero los datos del alumno.

Bootstrap proporciona la base del layout y los componentes; los estilos propios se aplican encima mediante clases como `bgSec`, `bgSec2`, `inputCustom` y `btnCustom`.

### Lógica JavaScript

La lógica está separada en tres archivos:

- **`JS/verificacion.js`** implementa la validación progresiva. Escucha los eventos `input` del documento, habilita los campos en secuencia y controla el estado de los botones de agregar materia y subir calificaciones.
- **`JS/app.js`** administra el estado local de la captura. Crea filas e inputs mediante `document.createElement` y `appendChild`, registra las materias en el arreglo `Calificaciones`, permite editar sus valores y eliminar filas.
- **`JS/firebase.js`** inicializa el SDK, consulta los catálogos y ejecuta las escrituras en Realtime Database.

La captura se apoya en dos variables globales: `Alumno` y `Calificaciones`. La tabla mantiene los datos en memoria hasta que el usuario pulsa **Subir Calificaciones**; en ese momento se construye el objeto del alumno y se recorren las calificaciones para persistirlas.

La validación comprueba principalmente que los campos no estén vacíos, que se haya seleccionado una opción en los catálogos y que exista al menos una materia registrada. No se implementan validaciones de formato o rango más allá de estas comprobaciones.

### Conexión con Firebase

`JS/firebase.js` se carga como módulo ES e importa las funciones necesarias del SDK:

```js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
```

La aplicación:

- Inicializa Firebase con `initializeApp()` y obtiene la base con `getDatabase()`.
- Consulta los nodos `Cuatrimestre` y `Unidades` con `get()` para llenar los selectores.
- Escribe los datos con `set()` en los nodos `Alumnos` y `Calificaciones`.

Las lecturas usan `async/await` y manejan errores mediante `try/catch`. Las escrituras se ejecutan al confirmar el envío y la interfaz muestra una alerta de éxito; no se implementan indicadores de carga ni confirmación individual por cada operación de escritura. El manejo de errores es básico.

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

| Archivo | Descripción |
| --- | --- |
| `index.html` | Punto de entrada. Contiene el formulario, la tabla, el modal y las referencias a CDN y estilos. |
| `CSS/style.scss` | Código fuente de los estilos personalizados. |
| `CSS/style.css` | CSS compilado que carga la página. |
| `CSS/style.css.map` | Mapa de depuración generado al compilar el SCSS. |
| `JS/verificacion.js` | Validación progresiva y control de habilitación de campos y botones. |
| `JS/app.js` | Creación y edición de filas, estado local de las calificaciones y notificaciones. |
| `JS/firebase.js` | Configuración e inicialización de Firebase, lectura de catálogos y escritura de datos. |

## Modelo de datos en Firebase

La aplicación utiliza **Firebase Realtime Database** y espera la siguiente organización lógica:

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

Los nodos `Cuatrimestre` y `Unidades` deben existir previamente y contener los catálogos que llenan los selectores. El código lee la propiedad `nombre` para los cuatrimestres y `name` para las unidades. Si estos nodos no existen o están vacíos, los selectores no tendrán opciones y el flujo de captura no podrá completarse.

Las calificaciones se escriben con una clave compuesta por número de control, unidad y materia, y se utiliza `set()`, por lo que una nueva captura con la misma clave sobrescribe el registro anterior.

## Requisitos previos

### Obligatorios

- Un navegador web moderno con soporte para módulos ES.
- Un servidor HTTP local para ejecutar la aplicación.
- Un proyecto de Firebase con **Realtime Database** habilitada.
- Los nodos `Cuatrimestre` y `Unidades` creados en la base de datos.

### Opcionales

- Git para clonar el repositorio.
- Visual Studio Code y una extensión como Live Server para servir los archivos.
- Python 3 para iniciar un servidor estático desde la terminal.

No es necesario instalar dependencias de Node.js ni ejecutar un proceso de compilación para poner en marcha el proyecto. El archivo `CSS/style.css` ya está compilado.

## Instalación y ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/MiguelDotDev/web-calif-alumnos.git
   cd web-calif-alumnos
   ```

2. Configura tu propia instancia de Firebase siguiendo la sección [Configuración de Firebase](#configuración-de-firebase).

3. Inicia un servidor HTTP local desde la raíz del proyecto. Por ejemplo, con Python:

   ```bash
   python3 -m http.server 8000
   ```

   También puedes usar Live Server desde Visual Studio Code.

4. Abre la aplicación en el navegador:

   ```text
   http://localhost:8000
   ```

No se recomienda abrir `index.html` directamente mediante `file://`, ya que la aplicación carga un módulo ES y realiza peticiones a Firebase, lo que requiere un contexto HTTP.

## Configuración de Firebase

El proyecto utiliza únicamente **Firebase Realtime Database**. No se identifican integraciones con Authentication, Cloud Firestore, Storage, Hosting ni Cloud Functions.

La inicialización y la configuración se encuentran en `JS/firebase.js`. Ese archivo contiene un objeto `firebaseConfig` con los identificadores del proyecto de Firebase y llama a `initializeApp(firebaseConfig)`.

Para ejecutar tu propia instancia:

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Habilita **Realtime Database**.
3. Registra una aplicación web en el proyecto y copia el objeto de configuración que proporciona Firebase.
4. Reemplaza el objeto `firebaseConfig` de `JS/firebase.js` por el de tu proyecto.
5. Crea los nodos `Cuatrimestre` y `Unidades` con la estructura descrita en el modelo de datos.
6. Define las reglas de seguridad de Realtime Database en Firebase Console.

La configuración web de Firebase puede contener identificadores públicos del proyecto, pero eso no sustituye las reglas de seguridad. El repositorio no incluye un archivo de reglas ni implementa autenticación, por lo que no es posible restringir el acceso por usuario desde el cliente. Evita publicar una base con lectura o escritura abiertas y utiliza reglas adecuadas para un entorno controlado de práctica.

## Uso de la aplicación

1. Abre la aplicación desde el servidor local.
2. Captura el **número de control** del alumno. Los demás campos se habilitarán progresivamente.
3. Completa nombre, apellido paterno, apellido materno y selecciona el sexo.
4. Selecciona el cuatrimestre y la unidad académica, y escribe el periodo.
5. Pulsa **Agregar una Materia**.
6. En el modal, captura la materia, la calificación y el tipo de calificación. Pulsa **Registrar**.
7. Repite el proceso para agregar más materias.
8. Usa los botones de la tabla para editar o eliminar una materia antes del envío.
9. Pulsa **Subir Calificaciones** para guardar al alumno y sus calificaciones en Firebase.
10. Confirma el resultado mediante la alerta que muestra la aplicación.

Para evitar sobrescribir información, utiliza datos de prueba mientras validas la configuración de tu propia base de datos.

## Estado del proyecto y alcance académico

El proyecto se encuentra en estado de **práctica académica funcional**. Implementa el flujo completo de captura y envío de datos a Realtime Database, con una interfaz personalizada y lógica escrita directamente en JavaScript.

Como ejercicio, permite demostrar conocimientos de:

- Estructuración de interfaces con HTML y Bootstrap.
- Estilos personalizados con CSS y SCSS.
- Manipulación dinámica del DOM y manejo de eventos.
- Validación de formularios en el cliente.
- Programación asíncrona con `async/await`.
- Lectura y escritura de datos en Firebase Realtime Database.
- Organización de la lógica en archivos JavaScript separados.

### Alcance y limitaciones

- No implementa autenticación ni gestión de usuarios o roles.
- La edición y eliminación de materias se realiza localmente antes del envío; no se eliminan registros ya persistidos desde la interfaz.
- No se consultan calificaciones existentes al iniciar la aplicación.
- Las validaciones comprueban principalmente campos vacíos y selecciones, no formatos o rangos de calificación.
- El manejo de errores y los estados de carga son básicos.
- No se incluyen pruebas automatizadas, integración continua ni configuración de despliegue.
- La configuración de Firebase está escrita directamente en el código y debe reemplazarse para usar una instancia propia.

El repositorio no debe considerarse un sistema listo para producción ni un servicio institucional.

## Autor

Desarrollado por **MiguelDotDev** como práctica universitaria.

- GitHub: [https://github.com/MiguelDotDev](https://github.com/MiguelDotDev)
