
const { Schema, model } = require('mongoose');
const { usuariosDelete } = require('../controllers/usuarios');


const UsuarioSchema= Schema ({
    nombre : {
        type : String,
        required : [true, 'El nombre de a webis']
    },
    correo : {
        type : String,
        required : [true, 'El correo también es de a webis'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'La contraseña es de a huevo de patio'],
    },
    img : {
        type : String,
    },    
    rol : {
        type : String,
        required : true,
        emun : ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado : {
        type : Boolean,
        default : true,
    },
    google : {
        type : 'Boolean',
        default : false,
    },

})

UsuarioSchema.methods.toJSON =  function () {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;

}

module.exports = model( 'Usuario', UsuarioSchema );