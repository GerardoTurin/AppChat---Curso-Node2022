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
        //console.log('Usuarios Conectados', resp);
        renderizarUsuarios(resp);
        renderizarSala(resp);
    });
    
});

// Disconnect: evento que se ejecuta cuando un cliente se desconecta
socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});


socket.on('crear-mensaje', function(mensaje) {
    //console.log('Servidor', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();
});


// Escuchar cambios de usuarios ( se conectan o desconectan )
socket.on('lista-personas', function(usuarios) {
    //console.log(usuarios);
    renderizarUsuarios(usuarios);
});


// Mensajes privados
socket.on('mensaje-privado', function(mensaje) {
    console.log('Mensaje Privado:', mensaje);
});
