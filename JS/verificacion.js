var isTodoHabilitado = false;

var verificarBotonEnviar = () => {
    if (isTodoHabilitado && Calificaciones.length > 0) {
        document.getElementById('submitBD').disabled = false;
    } else {
        document.getElementById('submitBD').disabled = true;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    var subAlertaPeriodo = document.getElementById('subtituloAlertaPeriodo');

    var txtNoControl = document.getElementById('txtNoControl');
    var txtNombre = document.getElementById('txtNombre');
    var txtApellidoPat = document.getElementById('txtApellidoPat');
    var txtApellidoMat = document.getElementById('txtApellidoMat');
    var rdSexH = document.getElementById('rdSexH');
    var rdSexM = document.getElementById('rdSexM');

    var slctCuatrimestre = document.getElementById('slctCuatrimestre');
    var slctUnidad = document.getElementById('slctUnidad');
    var txtPeriodo = document.getElementById('txtPeriodo');

    var btnModCancelar = document.getElementById('btnModCancelar');
    var btnModRegistrar = document.getElementById('btnModRegistrar');

    var txtMateriaMod = document.getElementById('txtMateriaMod');
    var txtCalificacionMod = document.getElementById('txtCalificacionMod');

    txtNombre.disabled = true;
    txtApellidoPat.disabled = true;
    txtApellidoMat.disabled = true;
    rdSexH.disabled = true;
    rdSexM.disabled = true;
    slctCuatrimestre.disabled = true;
    slctUnidad.disabled = true;
    txtPeriodo.disabled = true;

    var btnAgregar = document.getElementById('btnAgregar');
    btnAgregar.disabled = true;
    btnModRegistrar.disabled = true;

    var InputPeriodo = condicion => {
        slctCuatrimestre.disabled = condicion;
        slctUnidad.disabled = condicion;
        txtPeriodo.disabled = condicion;
        isTodoHabilitado = !condicion;
    };

    document.addEventListener('input', () => {

        // Validacion Campos Sin Modal
        if (txtNoControl.value.trim() != '') {
            txtNombre.disabled = false;
            if (txtNombre.value.trim() != '') {
                txtApellidoPat.disabled = false;
                if (txtApellidoPat.value.trim() != '') {
                    txtApellidoMat.disabled = false;
                    if (txtApellidoMat.value.trim() != '') {
                        rdSexH.disabled = false;
                        rdSexM.disabled = false;
                        if (rdSexH.checked || rdSexM.checked) {
                            subAlertaPeriodo.classList.add('hide');
                            InputPeriodo(false);
                            if (slctCuatrimestre.value != 0) {
                                if (slctUnidad.value != 0) {
                                    if (txtPeriodo.value.trim() != '') {
                                        btnAgregar.disabled = false;
                                    } else {
                                        btnAgregar.disabled = true;
                                    }
                                } else {
                                    btnAgregar.disabled = true;
                                }
                            } else {
                                btnAgregar.disabled = true;
                            }
                        } else {
                            subAlertaPeriodo.classList.remove('hide');
                            InputPeriodo(true);
                            btnAgregar.disabled = true;
                        }
                    } else {
                        rdSexH.disabled = true;
                        rdSexM.disabled = true;
                        subAlertaPeriodo.classList.remove('hide');
                        InputPeriodo(true);
                        btnAgregar.disabled = true;
                    }
                } else {
                    txtApellidoMat.disabled = true;
                    rdSexH.disabled = true;
                    rdSexM.disabled = true;
                    subAlertaPeriodo.classList.remove('hide');
                    InputPeriodo(true);
                    btnAgregar.disabled = true;
                }
            } else {
                txtApellidoPat.disabled = true;
                txtApellidoMat.disabled = true;
                rdSexH.disabled = true;
                rdSexM.disabled = true;
                subAlertaPeriodo.classList.remove('hide');
                InputPeriodo(true);
                btnAgregar.disabled = true;
            }
        } else {
            txtNombre.disabled = true;
            txtApellidoPat.disabled = true;
            txtApellidoMat.disabled = true;
            rdSexH.disabled = true;
            rdSexM.disabled = true;
            subAlertaPeriodo.classList.remove('hide');
            InputPeriodo(true);
            btnAgregar.disabled = true;
        }

        var radOrdinalMod = document.getElementById('radOrdinalMod');
        var radRemedialMod = document.getElementById('radRemedialMod');
        var radExtMod = document.getElementById('radExtMod');

        //Validacion Modal
        if (txtMateriaMod.value.trim() != '') {
            if (txtCalificacionMod.value.trim() != '') {
                if (radOrdinalMod.checked || radRemedialMod.checked || radExtMod.checked) {
                    btnModRegistrar.disabled = false;
                } else {
                    btnModRegistrar.disabled = true;
                }
            } else {
                btnModRegistrar.disabled = true;
            }
        } else {
            btnModRegistrar.disabled = true;
        }

        verificarBotonEnviar();
    });
});