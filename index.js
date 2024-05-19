const express = require('express');
const db = require('better-sqlite3')('personas.sqlite'); // Add this line to initialize the db object
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
    console.log(req.body);
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
    console.log(req.body);
    const statement = db.prepare('INSERT INTO product(id, Nombre, Preu) VALUES(?, ?, ?)');
    const info = statement.run(req.body.id, req.body.nombre, req.body.preu);
    res.redirect('/crearProducto');
  } catch (SqliteError) {
    console.log(SqliteError);
    res.status(500).send("Error inserting data into Product table");
  }
});


app.get('/showComandas', (req, res) => {
  const rows = db.prepare('SELECT Usuario.nombre as UsuarioNombre, Usuario.email, product.nombre as ProductName, product.preu FROM Comandes JOIN Usuario ON Comandes.Usuario_ID = usuario.id JOIN product on product.id = Comandes.product_ID').all();
  res.render('showComandas', { comandes: rows });
});

// Rutas para Comandas
app.get('/comandes', (req, res) => {
  const rowsProduct = db.prepare('SELECT * FROM Product').all();
  const rowsPersona = db.prepare('SELECT * FROM Usuario').all();
  res.render('comandes', { personas: rowsPersona, productos: rowsProduct });
});


app.post('/comandes', (req, res) => {
  try {
    console.log(req.body);
    const statement = db.prepare('INSERT INTO Comandes(Usuario_ID, Product_ID) VALUES(?, ?)');
    const info = statement.run(req.body.Usuario_ID, req.body.product_ID);
    console.log(info);
    res.redirect('/showComandas');
  } catch (error) {
    console.log(error);
    res.status(500).send("Error inserting data into Comandes table");
  }
});




app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/persona`);
});
