const express = require('express');
var cors = require('cors')


class Server {

    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //middlewares
        //middlewares. funciones que siempre se van a ejecutar cuando iniciemos el servidor
        this.middlewares();

        //rutas de mi aplicación
        this.routes();
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