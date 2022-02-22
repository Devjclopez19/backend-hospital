const { response } = require("express");
const Medico = require('../models/medicos');

const getMedicos = async(req, res = response) => {
    
    const medicos = await Medico.find()
                                    .populate('usuario','nombre')
                                    .populate('hospital','nombre');

    res.json({
        ok:true,
        medicos
    })
}
const crearMedico = async(req, res = response) => {

    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();
        
        res.status(200).json({
            ok:true,
            medico: medicoDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const updateMedico = async (req, res = response) => {

    const id = req.params.id;   
    const uid = req.uid; 

    try {

        const medico = await Medico.findById(id);
        if(!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado por id'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok:true,
            medico: medicoActualizado
        })
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const deleteMedico = async (req, res = response) => {

    res.json({
        ok:true,
        msg: 'deleteMedico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    updateMedico,
    deleteMedico
}