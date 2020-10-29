var sql = require('mssql')
var bdConfig = require('../bd/bdconfig')


exports.crearFiscalia = function (req, res) {

    var nombre_fiscalia = req.body.nombre_fiscalia;
    var tel_fiscalia = req.body.tel_fiscalia;
    var direccion_fiscalia = req.body.direccion_fiscalia;
    var id_municipio = req.body.id_municipio;
    var id_tipo = req.body.id_tipo;

    sql.connect(bdConfig, err => {
        if (err) {
            res.json({
                estado: 0,
                msj: 'Error en la conexión',
                datos: err
            })
        }

        new sql.Request()
            .input('nombre_fiscalia', sql.VarChar, nombre_fiscalia)
            .input('tel_fiscalia', sql.VarChar, tel_fiscalia)
            .input('direccion_fiscalia', sql.VarChar, direccion_fiscalia)
            .input('id_municipio', sql.Int, id_municipio)
            .input('id_tipo', sql.Int, id_tipo)
            .query(`INSERT INTO fiscalia(nombre_fiscalia,tel_fiscalia, direccion_fiscalia, id_municipio, id_tipo)
                    VALUES (@nombre_fiscalia,@tel_fiscalia,@direccion_fiscalia,@id_municipio,@id_tipo);
        `, (err, result) => {

            if (err){
                console.log(err);
                res.json({
                    estado: 2,
                    msj: 'Error al momento de realizar la inserción',
                    datos: err
                })
            }

                console.log(result)
                res.json({
                    estado: 1,
                    datos: result
                })
            })

    });

    sql.on('error', err => {
        res.json({
            estado: 2,
            msj: 'Error al momento de realizar la inserción',
            datos: err
        })
    })

}


exports.verFiscalia = function (req, res) {

    var id_fiscalia = req.params.id_fiscalia;

    sql.connect(bdConfig, err => {
        if (err) {
            res.json({
                estado: 0,
                msj: 'Error en la conexión',
                datos: err
            })
        }

        new sql.Request()
            .input('id_fiscalia', sql.Int, id_fiscalia)
            .query(`SELECT d.id_departamento, d.nombre_departamento, m.id_municipio, m.nombre_municipio, f.id_fiscalia, f.nombre_fiscalia, f.tel_fiscalia,f.direccion_fiscalia, t.id_tipo, t.nombre_tipo   
                    FROM fiscalia f, tipo_fiscalia t, municipio m, departamento d
                    WHERE t.id_tipo = f.id_tipo
                    AND m.id_municipio = f.id_municipio
                    AND d.id_departamento = m.id_departamento
                    AND f.id_fiscalia = @id_fiscalia;`,
                (err, result) => {
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


exports.obtenerFiscalias = function (req, res) {

    sql.connect(bdConfig, err => {
        if (err) {
            res.json({
                estado: 0,
                msj: 'Error en la conexión',
                datos: err
            })
        }

        new sql.Request()
            .query(`SELECT d.id_departamento, d.nombre_departamento, m.id_municipio, m.nombre_municipio, f.id_fiscalia, f.nombre_fiscalia, f.tel_fiscalia,f.direccion_fiscalia, t.id_tipo, t.nombre_tipo  
                    FROM fiscalia f, tipo_fiscalia t, municipio m, departamento d
                    WHERE t.id_tipo = f.id_tipo
                    AND m.id_municipio = f.id_municipio
                    AND d.id_departamento = m.id_departamento;`,
                (err, result) => {
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



exports.modificarFiscalia = function (req, res) {

    var id_fiscalia = req.body.id_fiscalia
    var nombre_fiscalia = req.body.nombre_fiscalia;
    var tel_fiscalia = req.body.tel_fiscalia;
    var direccion_fiscalia = req.body.direccion_fiscalia;
    var id_municipio = req.body.id_municipio;
    var id_tipo = req.body.id_tipo;

    sql.connect(bdConfig, err => {
        if (err) {
            res.json({
                estado: 0,
                msj: 'Error en la conexión',
                datos: err
            })
        }

        new sql.Request()
            .input('nombre_fiscalia', sql.VarChar, nombre_fiscalia)
            .input('tel_fiscalia', sql.VarChar, tel_fiscalia)
            .input('direccion_fiscalia', sql.VarChar, direccion_fiscalia)
            .input('id_municipio', sql.Int, id_municipio)
            .input('id_tipo', sql.Int, id_tipo)
            .input('id_fiscalia', sql.Int, id_fiscalia)
            .query(`UPDATE fiscalia
                    SET nombre_fiscalia = @nombre_fiscalia,
                        tel_fiscalia = @tel_fiscalia,
                        direccion_fiscalia = @direccion_fiscalia,
                        id_municipio=@id_municipio,
                        id_tipo=@id_tipo
                    WHERE id_fiscalia=@id_fiscalia;`,
                (err, result) => {
                    res.json({
                        estado: 1,
                        datos: result
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


exports.eliminarFiscalia = function (req, res) {

    var id_fiscalia = req.params.id_fiscalia;

    sql.connect(bdConfig, err => {
        if (err) {
            res.json({
                estado: 0,
                msj: 'Error en la conexión',
                datos: err
            })
        }

        new sql.Request()
            .input('id_fiscalia', sql.Int, id_fiscalia)
            .query(`DELETE FROM fiscalia
                    WHERE id_fiscalia=@id_fiscalia;`,
                (err, result) => {
                    if (err){
                        console.log(err);
                        res.json({
                            estado: 2,
                            msj: 'Error al momento de realizar la consulta',
                            datos: err
                        })
                    }
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
