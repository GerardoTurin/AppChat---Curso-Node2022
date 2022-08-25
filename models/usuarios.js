/* 
    {
        "id": 1fsdfdfs,
        "nombre": "Gera",
        sala: "general",
    }
*/





class Usuarios {
    constructor() {
        this.personas = []; // Array de personas
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas;
    }

    // Trae una persona por su id
    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }

    // Trae todas las personas
    getPersonas() {
        return this.personas;
    }

    // Trae las personas por sala
    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }

    // Elimina una persona por su id
    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);     // Trae la persona por su id
        this.personas = this.personas.filter(persona => persona.id != id);  // Elimina la persona por su id
        return personaBorrada;      // Retorna la persona borrada
    }
}




export default Usuarios;