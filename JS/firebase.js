// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQqxwOl4nBLYoY9WmUxbOFX-4GxFsOQFY",
    authDomain: "calificacionesbd-60e98.firebaseapp.com",
    projectId: "calificacionesbd-60e98",
    storageBucket: "calificacionesbd-60e98.appspot.com",
    messagingSenderId: "472891176099",
    appId: "1:472891176099:web:cf9195343d549d8956bb16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Funcion que agrega a FireBase usuarios
var Add2BD = (
) => {
    try {
        set(ref(db, 'Alumnos/' + Alumno.noControl), {
            NoControl: Alumno.noControl,
            nombre: Alumno.nombre,
            ApellidoPat: Alumno.apellidoPat,
            ApellidoMat: Alumno.apellidoMat,
            sexo: Alumno.sexo,
            cuatrimestre: Alumno.cuatrimestre
        });
        Calificaciones.forEach(calificacion => {
            set(ref(db, 'Calificaciones/' + Alumno.noControl + '-' + calificacion.unidad + '-' + calificacion.materia), {
                alumnoID: Alumno.noControl,
                materia: calificacion.materia,
                unidad: calificacion.unidad,
                periodo: calificacion.periodo,
                calificacion: calificacion.valor_calificacion,
                tipoCalificacion: calificacion.tipo_calificacion
            });
        });
        Swal.fire({
            title: "Calificaciones Registradas",
            text: "¡Las calificaciones fueron subidas con Éxito!",
            icon: "success"
        });
    } catch {
        Swal.fire({
            title: "Error!",
            text: "Falló la carga de calificaciones",
            icon: "success"
        });
    }
};

var GetAllFromLocation = async (location) => {
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, location));
        if (snapshot.exists()) {
            const data = snapshot.val();
            const recordsArray = Object.keys(data).map(key => data[key]);
            return recordsArray;
        } else {
            console.log("No hay Info en la Ubicacion");
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};


document.addEventListener('DOMContentLoaded', () => {

    var llenarSelects = async () => {
        //Llenar el Select Cuatrimestre
        var ArregloDeCuatris = await GetAllFromLocation('Cuatrimestre');
        for (var i = 0; i < ArregloDeCuatris.length; i++) {
            var opt = crearElementoHTML('option', 'slctCuatrimestre', '', ArregloDeCuatris[i].nombre);
            opt.setAttribute('value', (i + 1));
        }

        //Llenar el Select Unidades
        var ArregloUnidades = await GetAllFromLocation('Unidades');
        for (var i = 0; i < ArregloUnidades.length; i++) {
            var opt = crearElementoHTML('option', 'slctUnidad', '', ArregloUnidades[i].name);
            opt.setAttribute('value', (i + 1));
        }
    };

    llenarSelects();


    document.getElementById('btnModRegistrar').addEventListener('click', (event) => {
        event.preventDefault();
    });

    document.getElementById('submitBD').addEventListener('click', e => {
        console.log('Boton');
        console.log(Calificaciones);
        console.log(Alumno);
        Add2BD();
    });
});