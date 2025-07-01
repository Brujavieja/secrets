//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Säilytetään kirjautumistila "muuttujassa"
// (HUOM! Tämä EI toimi useammalle käyttäjälle eikä ole turvallinen!)
let isLoggedIn = false;

app.use(express.static("public"));

// Näytä sivu – joko salainen tai login
app.get("/", (req, res) => {
  if (isLoggedIn) {
    res.sendFile(path.join(__dirname, "public", "secret.html"));
  } else {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  }
});

app.post("/check", (req, res) => {
  const { password } = req.body;

  if (password === "ILoveProgramming") {
    isLoggedIn = true;
    res.redirect("/secret.html");
  } else {
    res.send("Väärä salasana. <a href='/'>Yritä uudelleen</a>");
  }
});

app.get("/logout", (req, res) => {
  isLoggedIn = false;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Sovellus kuuntelee portissa ${port}`);
});


