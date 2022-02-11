const path = require('path');
const fs = require('fs');

const { response } = require("express")
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");


const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    
    if(!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital'
        })
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length -1 ];
    
    const extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'];

    if(!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El archivo posee una extensión no válida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`; 

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    // Mover el archivo a nuestro servidor
    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
        
        // Actualizar la base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })

    });
    
}

const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const img = req.params.img;

    const pathImg = path.join(__dirname,`../uploads/${tipo}/${img}`);

    // imagen por defecto no-image-available
    if(fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname,`../uploads/no-image-available.jpg`);
        res.sendFile(pathImg);
    }

}

module.exports = {
    fileUpload,
    retornaImagen
}