const { response, request } = require('express');
const bcryptjs = require ('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet= async(req= request, res= response) => {

    const { limite = 5, desde = 0}  = req.query;
    const query = { estado : true } ;
/*    const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
     
    const total = await Usuario.countDocuments(query);
*/
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    ]);


    res.json({                
       //total, usuarios 
       total, usuarios
    })
}

const usuariosPost = async (req, res = response) => {
    

    const { nombre, correo, password, rol } = req.body;
    // para solo sacar uno
    // const { password, ...rest} = req.body
    const usuario = new Usuario({ nombre, correo, password, rol});
    
     //Encriptar las contraseña (hash)
    const salt= bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);
    
    //guardar en la BD
    await usuario.save();

    res.status(201).json({
        msg : 'post  api - controlador',
        usuario
    })
}

const usuariosPut = async(req, res=response) => {

    //const id = req.params.id;
    // o asi : 
    const { id } = req.params;
    ///aqui está quitando de resto, el campo pass, google, y correo
    const { _id, password, google, correo, ...resto} = req.body;

    /// validar contra base de datos
    if (password){
         //Encriptar las contraseña (hash)
        const salt= bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosPatch = (req, res= response) => {
    res.json({
        msg : 'patch api - controlador',
    })
}





const usuariosDelete = async(req, res= response) => {
    
    const { id }  = req.params;
    
    //fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete( id );
    
    ///cambiar el estado del usuario, en vez de borrarlo
    const usuario = await Usuario.findByIdAndUpdate( id, { estado : false });
    
    res.json(usuario);
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}