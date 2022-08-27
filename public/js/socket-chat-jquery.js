

//let params = new URLSearchParams(window.location.search);


//! Refecias jquery ------ FRONT - END
const divUsuarios = $('#divUsuarios');
const formEnviar = $('#formEnviar');
const txtMensaje = $('#txtMensaje');
const divChatbox = $('#divChatbox');
const tituloSala = $('#tituloSala');



//! Renderizar encabezado de la sala
function renderizarSala(sala) {

    let html = '';

    /* 
    <div class="p-20 b-b">
        <h3 class="box-title">Sala de chat <small>Video Juegos</small></h3>
    </div>
    */

    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const small = document.createElement('small');

    div.className = 'p-20 b-b';
    h3.className = 'box-title';
    small.className = 'text-success';
    h3.innerHTML = 'Sala de chat de ';
    small.innerHTML = `${params.get('sala')}`;

    h3.appendChild(small);
    div.appendChild(h3);

    html += div.outerHTML;

    tituloSala.html(html);

}


//! Funsiones para renderizar usuarios

function renderizarUsuarios(personas) { // personas es un arreglo de objetos
    console.log(personas);

    let html = '';

    const li = document.createElement('li');
    const a = document.createElement('a');
    const span = document.createElement('span');

    a.href = 'javascript:void(0)';
    a.className = 'active';
    span.innerHTML =`Sala de ${params.get('sala')}`;
    a.appendChild(span);
    li.appendChild(a);

    html += li.outerHTML;


    for (let i = 0; i < personas.length; i++) {

        const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');
        const span = document.createElement('span');
        const small = document.createElement('small');

        a.dataset.id = personas[i].id;
        a.href = 'javascript:void(0)';
        img.className = 'img-circle';
        img.src = 'assets/images/users/1.jpg';
        span.innerHTML = personas[i].nombre;
        small.className = 'text-success';
        small.innerHTML = 'online';

        span.appendChild(small);
        a.appendChild(img);
        a.appendChild(span);
        li.appendChild(a);

        html += li.outerHTML;
    }

    divUsuarios.html(html);
};


// Renderizar mensajes  ( mostrar mensajes en el html )
function renderizarMensajes(mensaje, yo) {
    let html = '';
    const fecha = new Date(mensaje.fecha);
    const hora = fecha.getHours() + ':' + fecha.getMinutes();
    let adminClass = 'info';

    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    } else {
        adminClass = 'info';
    }


    /* 
    YO
    <li class="reverse">
        <div class="chat-content">
            <h5>Steave Doe</h5>
            <div class="box bg-light-inverse">It’s Great opportunity to work.</div>
        </div>
        <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
        <div class="chat-time">10:57 am</div>
    </li>
    */

    const li = document.createElement('li');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const h5 = document.createElement('h5');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');

    if (yo) {
        li.className = 'reverse animated fadeIn';
        div1.className = 'chat-content';
        div2.className = 'box bg-light-inverse';
        div4.className = 'chat-time';

        h5.innerHTML = 'Yo';
        div2.innerHTML = mensaje.mensaje;
        div4.innerHTML = hora;

        div1.appendChild(h5);
        div1.appendChild(div2);
        div1.appendChild(div3);
        div1.appendChild(div4);
        li.appendChild(div1);
    } else {

        /* 
        <li>
            <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
                <div class="chat-content">
                    <h5>James Anderson</h5>
                    <div class="box bg-light-info">Lorem Ipsum is simply dummy text of the printing & type setting industry.</div>
                </div>
            <div class="chat-time">10:56 am</div>
        </li>
        */

        div1.className = 'chat-img';
        div2.className = 'chat-content';
        div3.className = 'box bg-light-' + adminClass +'';
        div4.className = 'chat-time';

        const img = document.createElement('img');
        img.src = 'assets/images/users/1.jpg';
        img.alt = 'user';

        h5.innerHTML = mensaje.nombre;


        div3.innerHTML = mensaje.mensaje;
        div4.innerHTML = hora;

        div1.appendChild(img);
        div2.appendChild(h5);
        div2.appendChild(div3);
        div2.appendChild(div4);
        li.appendChild(div1);
        li.appendChild(div2);
    }

    html += li.outerHTML;

    divChatbox.append(html);
};



const scrollBottom = () => {
    // selectors
    const newMessage = divChatbox.children('li:last-child');

    // heights
    const clientHeight = divChatbox.prop('clientHeight');
    const scrollTop = divChatbox.prop('scrollTop');
    const scrollHeight = divChatbox.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}






// Listeners
// MOSTRAR ID EN CONSOLA AL HACER CLICK EN UN USUARIO

divUsuarios.on('click', 'a', function() {
    const id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});


// Enviar mensaje
formEnviar.on('submit', function(evt) {
    evt.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    // Enviar información
    socket.emit('crear-mensaje', { 
        nombre: params.get('nombre'),
        mensaje: txtMensaje.val() }, function(mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });

});



