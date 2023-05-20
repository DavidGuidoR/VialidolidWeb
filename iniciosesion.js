const btnCerrarVentana=
document.querySelector("#btnCerrarVentana");

const btnSesion = 
document.querySelector("#btnSesion");

const iniciarSesion = 
document.querySelector("#iniciarSesion");

btnSesion.addEventListener('click', () => {
    iniciarSesion.showModal();  // Abre el diálogo
});

btnCerrarVentana.addEventListener('click', () => {
    // Código para cerrar la ventana
    iniciarSesion.close();
});
