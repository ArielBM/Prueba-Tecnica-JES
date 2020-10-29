module.exports = function(app) {

    var main = require('../controladores/MainController.js');
    var tipo_fiscalia = require('../controladores/TipoFiscaliaController.js');
    var ubicacion = require('../controladores/UbicacionController');
    var fiscalia = require('../controladores/FiscaliaController');

    app.route('/').get(main.initMain);

    app.route('/tipoFiscalia').get(tipo_fiscalia.obtenerTipo);
    app.route('/departamentos').get(ubicacion.obtenerDeptos);
    app.route('/municipios/:id_depto').get(ubicacion.obtenerMunicipios);
    app.route('/crearFiscalia').post(fiscalia.crearFiscalia);
    app.route('/obtenerFiscalias').get(fiscalia.obtenerFiscalias);
    app.route('/verFiscalia/:id_fiscalia').get(fiscalia.verFiscalia);
    app.route('/modificarFiscalia').put(fiscalia.modificarFiscalia);
    app.route('/eliminarFiscalia/:id_fiscalia').delete(fiscalia.eliminarFiscalia);


}