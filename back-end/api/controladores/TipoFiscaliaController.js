var sql = require('mssql')
var bdConfig = require('../bd/bdconfig')

exports.obtenerTipo = function(req, res) {

    sql.connect(bdConfig, err => {
        if (err) {
            res.json({
                estado: 0,
                msj: 'Error en la conexión',
                datos: err
            })
        }

        new sql.Request().query('SELECT * FROM tipo_fiscalia;', (err, result) => {
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