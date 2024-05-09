const express = require('express')
const db = require('better-sqlite3')('personas.sqlite')

const app = express()
const port = 3000
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
//crear confi de bases de datos

//servido web sabe donde esta la base de datos

app.use(express.json());

// //callback, /get se ejecuta esta funcion
// app.get('/persona', (req, res) => {
//   //aqui hare el select
//   personaId = req.query.edad;
//   const row = db.prepare('SELECT * FROM persona WHERE edad = ?').get(personaId);
//   res.json(row);
// })

// //callback, /get se ejecuta esta funcion
// app.get('/persona', (req, res) => {
//   //aqui hare el select
//   personaId = req.query.edad;
//   const row = db.prepare('SELECT * FROM persona WHERE edad = ?').get(personaId);
//   res.json(row);
// })



//eje 2 
// app.get('/Usuario', (req, res) => {
//   const personaId = req.query.id;
//   const row = db.prepare('SELECT * FROM Usuario WHERE id = ? ').get(personaId);
//   res.json(row);
// });


//eje 3 
app.get('/Products', (req, res) => {
  const row = db.prepare('SELECT * FROM Product').all();
  res.json(row);
});

//eje 4 
app.get('/Product', (req, res) => {
  const personaId = req.query.id;
  const row = db.prepare('SELECT * FROM Product WHERE id = ?').get(personaId);
  res.json(row);
});

//eje 5 
app.get('/Comandes', (req, res) => {
  const row = db.prepare('SELECT*FROM Comandes JOIN Usuario ON Comandes.Usuario_ID = Usuario.Id JOIN Product ON Comandes.Product_ID = Product.ID').all();
  res.json(row);
});
//eje 6 
app.get('/Comanda', (req, res) => {
  const personaId = req.query.id;
  const row = db.prepare('SELECT*FROM Comandes JOIN Usuario ON Comandes.Usuario_ID = Usuario.Id  Join PRODUCT  on Comandes.Product_ID = Product.ID WHERE Comandes.id = ?').get(personaId);
  res.json(row);
});

//primer eje
app.get('/Usuarios', (req, res) => {
  const row = db.prepare('SELECT * FROM Usuario').all();
  res.render("persona", {persona : row }); // res.render = renderizado es decir 
});
// añadir usuarios 
app.post('/Usuarios', (req, res) => {
  console.log(req.body);
  const statment = db.prepare('INSERT INTO Usuario(id,nombre,email) VALUES(?,?,?)');
  const info = statment.run(req.body.id, req.body.nombre, req.body.apellidos);
  res.redirect("Usuarios");
});

//ShowPersonas
app.get('/showPersonas', (req, res) => {
  const row = db.prepare('SELECT * FROM Usuario').all();
  res.render("showPersonas", Usuarios = row ); // res.render = renderizado es decir 
});
//metodos post para que escriban, el post no lo haremos lo hacmos para cuadno quremeos hacer acamobops
//sus /get, /post son para lo que estan hechas, es decir sus nombres hacen eso 

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/Usuarios`)
})


//crear metodos post para  mostar la inforamcion de las tablas
//
