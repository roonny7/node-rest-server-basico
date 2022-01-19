const { response, request } = require('express');

const usuariosGet= (req= request, res= response) => {

    //const query = req.query;
    //o así 
    const { nombre, apikey, variablequenosemando='', pagina=1} = req.query

    res.json({                
        msg : 'get api - controlador',
        nombre,
        apikey,
        variablequenosemando,
        pagina
    })
}

const usuariosPost = (req, res = response) => {
    
    const { nombre, edad } = req.body;

    res.status(201).json({
        msg : 'post  api - controlador',
        nombre, 
        edad
    })
}

const usuariosPut = (req, res=response) => {

    //const id = req.params.id;
    // o asi : 
    const { id } = req.params;

    res.json({                
        msg : 'put api - controlador',
        id
    })
}

const usuariosPatch = (req, res= response) => {
    res.json({
        msg : 'patch api - controlador',
    })
}

const usuariosDelete = (req, res= response) => {
    res.json({
        msg : 'delete api - controlador',
    })
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}