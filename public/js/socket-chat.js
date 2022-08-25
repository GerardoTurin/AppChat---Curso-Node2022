//! Refecias al html ------ FRONT - END


const socket = io();


let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sale son necesario');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};


// on: escuchar eventos
// Connection: evento que se ejecuta cuando un cliente se conecta
socket.on('connect', () => {
    console.log('Conectado al servidor');

    socket.emit('entrar-chat', usuario, function(resp)  {
        console.log('Usuarios Conectados', resp);
    });

    /* socket.emit('crear-mensaje', {
        usuario: 'Gerardo',
        mensaje: `${usuario.nombre} se ha conectado`
    }, function(resp) {
        console.log('Servidor:', resp);
    }); */
    
});

// Disconnect: evento que se ejecuta cuando un cliente se desconecta
/* socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    online.style.display = 'none';
    offline.style.display = '';
}); */


socket.on('crear-mensaje', function(mensaje) {
    console.log('Servidor', mensaje);
});


// Escuchar cambios de usuarios ( se conectan o desconectan )
socket.on('lista-personas', function(usuarios) {
    console.log(usuarios);
});




// Mensajes privados
socket.on('mensaje-privado', function(mensaje) {
    console.log('Mensaje Privado:', mensaje);
});






/* btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        nombre: 'Gera',
        fecha: new Date().getTime()
    }


    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Mensaje enviado desde Server', id);
        
    } );
}); */