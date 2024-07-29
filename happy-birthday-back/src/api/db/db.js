const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./api/database/madb.db", (err) => {
  if (err) throw err;
  console.log("Database start");
});

db.run(
  "CREATE TABLE IF NOT EXISTS birthday_student (birthday DATE, lastname TEXT, firstname TEXT, email TEXT)",
  (err) => {
    if (err) throw err;
  }
);

db.run(
  "CREATE TABLE IF NOT EXISTS birthday_teacher (birthday DATE, lastname TEXT, firstname TEXT, email TEXT)",
  (err) => {
    if (err) throw err;
  }
);

db.run(
  "CREATE TABLE IF NOT EXISTS quote (quote TEXT, author TEXT)",
  (err) => {
    if (err) throw err;
  }
);



module.exports = db;