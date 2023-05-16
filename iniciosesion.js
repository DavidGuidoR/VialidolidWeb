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
});

const btnCerrarVentana = document.querySelector('#btnCerrarVentana');
const btnSesion = document.querySelector("#btnSesion");  // Asegúrate de tener un botón con este id en tu HTML

// Añadimos un eventListener al botón de iniciar sesión
btnSesion.addEventListener('click', (event) => {
    event.preventDefault();  // Esto evita que el enlace haga scroll hacia arriba
    iniciarSesionDialog.showModal();  // Abre el diálogo
});

// Añadimos un eventListener al botón de cerrar ventana
btnCerrarVentana.addEventListener('click', () => {
    iniciarSesionDialog.close();  // Cierra el diálogo
});

// Añadimos un eventListener al formulario de inicio de sesión
iniciarSesionForm.addEventListener('submit', (event) => {
    event.preventDefault();  // Evitamos que el formulario se envíe por defecto

    // Obtenemos los valores ingresados por el usuario
    const usuario = document.querySelector('#usuario').value;
    const contraseña = document.querySelector('#contraseña').value;

    // Aquí es donde harías la autenticación con tu servidor
    // Por ahora, simplemente compararemos con un nombre de usuario y contraseña estáticos
    if (usuario === 'usuario' && contraseña === 'contraseña') {
        alert('Inicio de sesión exitoso!');
        iniciarSesionDialog.close();  // Cierra el diálogo
    } else {
        alert('Nombre de usuario o contraseña incorrectos. Inténtalo de nuevo.');
    }
});

