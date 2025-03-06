var borrarRegistroTabla = (idFila) => {
    var fila = document.getElementById(idFila);
    for (var a = 0; a < Calificaciones.length; a++) {
        if (Calificaciones[a].id == fila.getAttribute('data-materia')) {
            Calificaciones.splice(a, 1);
        }
    }
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Calificacion Eliminada del Registro"
    });
    verificarBotonEnviar();
};
var eliminarRegistroTabla = id => {
    borrarRegistroTabla(id);
    document.getElementById(id).remove();
};
var crearElementoHTML = (etiqueta, idPadre, idHijo = '', contenido = '') => {
    var elemento = document.createElement(etiqueta);
    if (idHijo != '') {
        elemento.id = idHijo;
    }
    document.getElementById(idPadre).appendChild(elemento);
    if (contenido != '') {
        elemento.innerHTML = contenido;
    }
    return elemento;
};
var EditarCamposTabla = (ArregloIDinput, botonEditarID, idFila) => {
    var fila = document.getElementById(idFila);
    if (fila.getAttribute('data-editando') === 'NO') {
        for (var i = 0; i < ArregloIDinput.length; i++) {
            document.getElementById(ArregloIDinput[i]).disabled = false;
        }
        document.getElementById(botonEditarID).innerHTML = '<span class="material-symbols-outlined">save</span>';
        fila.setAttribute('data-editando', 'SI');
    } else if (fila.getAttribute('data-editando') === 'SI') {
        var IndexMateriaEnArreglo;
        for (var i = 0; i < ArregloIDinput.length; i++) {
            document.getElementById(ArregloIDinput[i]).disabled = true;
        }
        //Buscar En Arreglo Materia a Editar
        for (var a = 0; a < Calificaciones.length; a++) {
            if (Calificaciones[a].id == fila.getAttribute('data-materia')) {
                IndexMateriaEnArreglo = a;
            }
        }

        Calificaciones[IndexMateriaEnArreglo].materia = document.getElementById(ArregloIDinput[0]).value;
        Calificaciones[IndexMateriaEnArreglo].valor_calificacion = document.getElementById(ArregloIDinput[1]).value;

        document.getElementById(botonEditarID).innerHTML = '<span class="material-symbols-outlined">edit</span>';
        fila.setAttribute('data-editando', 'NO');

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "¡Datos Editados y Guardados!"
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    var ctdCol = 0;
    document.getElementById('btnModRegistrar').addEventListener('click', e => {
        e.preventDefault();
        ctdCol++;
        var getSexo = () => {
            var sex = '';
            if (rdSexH.checked) {
                sex = 'Hombre';
            } else if (rdSexM.checked) {
                sex = 'Mujer';
            }
            return sex;
        };
        Alumno = {
            noControl: document.getElementById('txtNoControl').value,
            nombre: document.getElementById('txtNombre').value,
            apellidoPat: document.getElementById('txtApellidoPat').value,
            apellidoMat: document.getElementById('txtApellidoMat').value,
            sexo: getSexo(),
            cuatrimestre: document.getElementById('slctCuatrimestre').value,
        };
        var tipo_calif = () => {
            var tipo = '';
            var rdOrd = document.getElementById('radOrdinalMod').checked;
            var rdRem = document.getElementById('radRemedialMod').checked;
            var rdExt = document.getElementById('radExtMod').checked;
            if (rdOrd) {
                tipo = 'Ordinaria';
            } else if (rdRem) {
                tipo = 'Remedial';
            } else if (rdExt) {
                tipo = 'Extraordinaria';
            }
            return tipo;
        };
        var Calif = {
            id: 'calif' + ctdCol,
            unidad: document.getElementById('slctUnidad').value,
            periodo: document.getElementById('txtPeriodo').value,
            materia: document.getElementById('txtMateriaMod').value,
            valor_calificacion: document.getElementById('txtCalificacionMod').value,
            tipo_calificacion: tipo_calif()
        };
        Calificaciones.push(Calif);

        //Crear Columnas
        var row = crearElementoHTML('tr', 'tablaMateria', 'Registro' + ctdCol);
        row.setAttribute('data-editando', 'NO');
        row.setAttribute('data-materia', Calif.id);

        var col1 = crearElementoHTML('td', row.id, 'Row' + row.id + 'Col1');
        col1.classList += 'align-middle text-center';
        var input1 = crearElementoHTML('input', col1.id, 'inputCol1' + row.id);
        input1.setAttribute('value', Calif.materia);
        input1.disabled = true;
        input1.classList += 'inputTabla';

        var col2 = crearElementoHTML('td', row.id, 'Row' + row.id + 'Col2');
        col2.classList += 'align-middle text-center';
        var input2 = crearElementoHTML('input', col2.id, 'inputCol2' + row.id);
        input2.setAttribute('value', Calif.valor_calificacion);
        input2.disabled = true;
        input2.classList += 'inputTabla';

        var col3 = crearElementoHTML('td', row.id, 'Row' + row.id + 'Col3');
        col3.classList += 'align-middle text-center';
        var input3 = crearElementoHTML('input', col3.id, 'inputCol3' + row.id);
        input3.setAttribute('value', Alumno.cuatrimestre);
        input3.disabled = true;
        input3.classList += 'inputTabla';

        var colAccion = crearElementoHTML('td', row.id, 'colAccionID' + row.id, '');
        var delBtn = crearElementoHTML('button', colAccion.id, '', '<span class="material-symbols-outlined">delete</span>');
        var btnEdit = crearElementoHTML('button', colAccion.id, colAccion.id + 'BotonEditar', '<span class="material-symbols-outlined">edit</span>');
        btnEdit.setAttribute('onclick', 'EditarCamposTabla(["' + input1.id + '","' + input2.id + '","' + input3.id + '"], "' + btnEdit.id + '", "' + row.id + '")');
        delBtn.setAttribute('onclick', 'eliminarRegistroTabla("' + row.id + '")');
        colAccion.classList += "text-center";
        delBtn.classList += 'btnDel';
        btnEdit.classList += 'btnEdit';
        verificarBotonEnviar();
    });

});

var Calificaciones = [];
var Alumno;