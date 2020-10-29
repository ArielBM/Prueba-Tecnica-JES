var sql = require('mssql')
var bdConfig = require('../bd/bdconfig')

exports.obtenerDeptos = function(req, res) {

    sql.connect(bdConfig, err => {
        if (err) {
            res.json({
                estado: 0,
                msj: 'Error en la conexión',
                datos: err
            })
        }

        new sql.Request().query('SELECT * FROM departamento;', (err, result) => {
            res.json({
                estado: 1,
                datos: result['recordset']
            })
        })

    });

    sql.on('error', err => {
        res.json({
            estado: 2,
            msj: 'Error al momento de realizar la consulta',
            datos: err
        })
    })

}


exports.obtenerMunicipios = function(req, res) {

    var id_depto = req.params.id_depto;

    sql.connect(bdConfig, err => {
        if (err) {
            res.json({
                estado: 0,
                msj: 'Error en la conexión',
                datos: err
            })
        }

        new sql.Request()
            .input('id_depto', sql.Int, id_depto)
            .query(`SELECT m.id_municipio, m.nombre_municipio FROM municipio m
                WHERE m.id_departamento = @id_depto;
        `, (err, result) => {
                res.json({
                    estado: 1,
                    datos: result['recordset']
                })
            })

    });

    sql.on('error', err => {
        res.json({
            estado: 2,
            msj: 'Error al momento de realizar la consulta',
            datos: err
        })
    })

    

}