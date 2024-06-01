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

app.get('/crearProducto', (req, res) => {
  res.render("product");
});
//Crear Producto
app.post('/crearProducto', (req, res) => {
  try {
    const statement = db.prepare('INSERT INTO product(id, Nombre, Preu) VALUES(?, ?, ?)');
    const info = statement.run(req.body.id, req.body.nombre, req.body.preu);
    res.redirect('/crearProducto');
  } catch (SqliteError) {
    res.status(500).send("Error inserting data into Product table");
  }
});

//Mostrar comandas 
app.get('/showComandas', (req, res) => {
  const rows = db.prepare('SELECT Comandes.ID , Usuario.Nombre as UsuarioNombre, Usuario.email, Product.nombre as ProductName, Product.preu FROM Comandes JOIN Usuario ON Comandes.Usuario_ID = Usuario.ID JOIN Product on Product.ID = Comandes.Product_ID').all();
  res.render('showComandas', { comandas: rows });
});


// Rutas para Comandas
app.get('/comandes', (req, res) => {
  const rowsProduct = db.prepare('SELECT * FROM Product').all();
  const rowsPersona = db.prepare('SELECT * FROM Usuario').all();
  res.render('comandes', { personas: rowsPersona, productos: rowsProduct });
});


app.post('/comandes', (req, res) => {
  if (!req.body.Usuario_ID || !req.body.product_ID) {
    const statement = db.prepare('INSERT INTO Comandes(Usuario_ID, Product_ID) VALUES(?, ?)');
    const info = statement.run(req.body.Usuario_ID, req.body.Product_ID);
    res.redirect('/comandes');
  } else {
    res.redirect('/showComandas');
  }
});

//Rutas para changed persona
app.get('/personaUpdate', (req, res) => {
  laquequieras = req.query.ID;
  const statement = db.prepare('SELECT * FROM Usuario WHERE ID = ?').get(laquequieras);
  res.render('personaUpdate', { persona: statement });
});

app.post('/personaUpdate', (req, res) => {
  try {
    const statement = db.prepare('UPDATE Usuario SET Nombre = ? , Email = ? WHERE ID = ?');
    const info = statement.run(req.body.nombre, req.body.email, req.body.ID);
    res.redirect('/showPersonas');
  } catch (SqliteError) {
  }
});


//Rutas para changed product
app.get('/productUpdate', (req, res) => {
  laquequieras = req.query.ID;
  const statement = db.prepare('SELECT * FROM Product WHERE ID = ?').get(laquequieras);
  res.render('productUpdate', { product: statement });
});

app.post('/productUpdate', (req, res) => {
  try {
    const statement = db.prepare('UPDATE Product SET Nombre = ? , Preu = ? WHERE ID = ?');
    const info = statement.run(req.body.Nombre, req.body.Preu, req.body.ID);
    res.redirect("/showProduct");
  } catch (SqliteError) {
  }
});

app.get('/comandesUpdate', (req, res) => {
  const laquequieras = req.query.ID;
  const comandes = db.prepare('SELECT Comandes.ID, Usuario.Nombre As UsuarioNom, Product.Nombre as ProductNom FROM Comandes JOIN Usuario ON Comandes.Usuario_ID = Usuario.ID JOIN Product ON Comandes.Product_ID = Product.ID WHERE Comandes.ID = ?').get(laquequieras);
  // const comandes = statement;
  if (comandes) {
    const rowsProduct = db.prepare('SELECT * FROM Product').all();
    const rowsPersona = db.prepare('SELECT * FROM Usuario').all();
    
    res.render('comandesUpdate', { comanda: comandes, personas: rowsPersona, productos: rowsProduct });
  } else {
    res.send('No se encontró ninguna comanda con el ID proporcionado.');
  }
});



app.post('/comandesUpdate', (req, res) => {
  try {
    const statement = db.prepare('UPDATE Comandes SET Usuario_ID = ? , Product_ID = ? WHERE id = ?');
    const info = statement.run(req.body.Usuario_ID, req.body.Product_ID, req.body.ID); // Cambia req.body.id a req.body.ID
    res.redirect("/showComandas");
  } catch (SqliteError) {
    // Manejar errores
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/persona`);
});
