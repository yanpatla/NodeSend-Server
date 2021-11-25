const express = require("express");
const conectDB = require("./config/db");
 //*Create server
const app = express();

 
//*Conect to DB
conectDB();

//*Port
const port = process.env.PORT || 4000;

//* Habilitar ller Valores
app.use(express.json());

//*Routes
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/link", require("./routes/link"));
app.use("/api/files",require("./routes/files"))

//*Listen

app.listen(port, "0.0.0.0", () => {
  console.log(`Server on Port ${port}`);
});
