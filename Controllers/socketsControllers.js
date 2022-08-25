import Usuarios from "../models/usuarios.js";
import { crearMensaje } from "../utilidades/utilidades.js";

const usuarios = new Usuarios();

const socketController = (socket) => {
    console.log('Cliente conectado', socket.id);

    socket.on('entrar-chat', (usuario, callback) => {

        if (!usuario.nombre || !usuario.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre y sala son necesarios'
            });
        }

        // Conectar al usuario a una sala especifica
        socket.join(usuario.sala);

        // Agregar usuario conectado
        usuarios.agregarPersona(socket.id, usuario.nombre, usuario.sala);
        
        socket.to(usuario.sala).emit('lista-personas', usuarios.getPersonasPorSala(usuario.sala));    // Emitir a todos los usuarios de la sala

        callback(usuarios.getPersonasPorSala(usuario.sala));
    });



    socket.on('crear-mensaje', (payload) => {
        let persona = usuarios.getPersona(socket.id);
        let mensaje = crearMensaje(persona.nombre, payload.mensaje);
        
        socket.to(persona.sala).emit('crear-mensaje', mensaje);
    })
    
    
    // Desconectar
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
        let personaBorrada = usuarios.borrarPersona(socket.id);

        socket.to(personaBorrada.sala).emit('crear-mensaje', crearMensaje('Administrador', `${personaBorrada.nombre} se ha desconectado`));
        socket.to(personaBorrada.sala).emit('lista-personas', usuarios.getPersonasPorSala(personaBorrada.sala));   // OBTENGO TODOS LOS USUARIOS DE LA SALA
    });

    // Mensajes privados
    socket.on('mensaje-privado', (payload) => {
        let persona = usuarios.getPersona(socket.id);
        let mensaje = crearMensaje(persona.nombre, payload.mensaje);

        socket.to(payload.param).emit('mensaje-privado', mensaje);

    })
};










export { socketController };