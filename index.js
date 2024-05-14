const express = require('express');
const db = require('better-sqlite3')('personas.sqlite');
const app = express();
const port = 3000;
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//Rutas para Usuarios
app.get('/showPersonas', (req, res) => {
  const rows = db.prepare('SELECT * FROM Usuario').all();
  res.render("showPersonas", { personas: rows });
});
//persona
app.get('/persona', (req, res) => {
  res.render("persona");
});
//insertar persona
app.post('/persona', (req, res) => {
  const error = "error";
  try {
    const statement = db.prepare('INSERT INTO Usuario(id, nombre, email) VALUES(?, ?, ?)');
    const info = statement.run(req.body.id, req.body.nombre, req.body.email);
    res.redirect("persona");
  } catch (SqliteError) {
  }
});


// Rutas para Productos
app.get('/showProduct', (req, res) => {
  const rows = db.prepare('SELECT * FROM Product').all();
  res.render('showProductos', { productos: rows });
});
//
app.get('/crearProducto', (req, res) => {
  res.render("product");
});

app.post('/crearProducto', (req, res) => {
  try {
  const statement = db.prepare('INSERT INTO product(id, nombre, preu) VALUES(?, ?, ?)');
  const info = statement.run(req.body.id, req.body.nombre, req.body.preu);
  res.redirect('/product');
} catch (SqliteError) {

}
});


// Rutas para Productos
app.get('/showComanda', (req, res) => {
  const rows = db.prepare('SELECT * FROM Comandes').all();
  res.render('showComandas', { comandes: rows });
});
//
app.get('/crearComanda', (req, res) => {
  res.render("comanda");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/persona`);
});
