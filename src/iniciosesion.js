const btnCerrarVentana=
document.querySelector("#btnCerrarVentana");
const btnSesion = document.querySelector("#btnSesion");
const iniciarSesion = document.querySelector("#iniciarSesion");
const iniciarSesionForm = iniciarSesionDialog.querySelector('form');

btnSesion.addEventListener('click', (event) => {
    event.preventDefault();  // Esto evita que el enlace haga scroll hacia arriba
    iniciarSesion.showModal();  // Abre el diálogo
});

btnCerrarVentana.addEventListener('click', () => {
    // Código para cerrar la ventana
    iniciarSesion.closes();
});


