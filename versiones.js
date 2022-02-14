const versiones = {};

var sql = require('mysql');

const connection = sql.createPool({
  host: 'sql533.main-hosting.eu',
  user: 'u716697139_admin',
  password: 'Admin123',
  database: 'u716697139_test' //Name DB
});

versiones.getAll = (req, res) => {
  const consulta = 'SELECT * FROM versiones';

  connection.query(consulta, (error, resultados) => {
    if (resultados.length > 0) {
      res.send(resultados);
    } else {
      res.statusCode = 503;
      res.send('no hay resultados');
    }
  });
};

versiones.getByApp = (req, res) => {
  const appTarget = req.params.app;
  const consulta = `SELECT * FROM versiones WHERE app= '${appTarget}'`;

  connection.query(consulta, (error, resultados) => {
    if (resultados) {
      res.send(resultados);
    } else {
      res.statusCode = 503;
      res.send(error);
    }
  });
};

versiones.add = (req, res) => {
  const consultaSQL = 'INSERT INTO versiones SET ?';

  const { app, minima, actual, urlStoreAndroid, urlStoreIos } = req.body; //destructuring

  const newApp = {
    app: app,
    minima: minima,
    actual: actual,
    urlStoreAndroid: urlStoreAndroid,
    urlStoreIos: urlStoreIos
  };

  connection.query(consultaSQL, newApp, (error, resultados) => {
    if (resultados) {
      res.send(resultados);
    } else {
      res.statusCode = 503;
      res.send('No se pudo agregar');
    }
  });
};

versiones.modifyByApp = (req, res) => {
  const appTarget = req.params.app;
  const { app, minima, actual, urlStoreAndroid, urlStoreIos } = req.body;

  const consulta = `UPDATE versiones SET 
    app = '${app}',
    minima = '${minima}',
    actual = '${actual}',
    urlStoreAndroid = '${urlStoreAndroid}', 
    urlStoreIos = '${urlStoreIos}' WHERE app = '${appTarget}'`;

  connection.query(consulta, (error, resultados) => {
    if (resultados) {
      res.send(resultados);
    } else {
      res.statusCode = 503;
      res.send(error);
    }
  });
};

module.exports = versiones;
