const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //conectar a la base de datos
        this.conectarDB();

        //middlewares
        //middlewares. funciones que siempre se van a ejecutar cuando iniciemos el servidor
        this.middlewares();

        //rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }
    middlewares() {

        //CORS
        this.app.use(cors());

        //lectura y parseo del body, que venga de put, post, delete
        this.app.use(express.json());

       //directorio público
        this.app.use(express.static('public'));
    }

    routes() {

        /*la raiz ya no jala, porque se está sirviendo 
        //con el de arriba en public
        this.app.get('/',  (req, res) => {
            res.send('Hello World')
          })*/

          this.app.use(this.usuariosPath, require('../routes/usuarios'));
        
        
    }

    listen(){

        this.app.listen(this.port, () => {
            console.log('servidor corriendo en ', this.port);
        })
    }

}


module.exports = Server;