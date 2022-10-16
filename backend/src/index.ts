import express from "express";
import mysql from "mysql";
import _ from "lodash";

const app = express();

const PORT: number = 5000;
const HOSTNAME: string = "127.0.0.1";

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "Products",
});

mysqlConnection.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});

app.get("/", async (req, res) => {
  const p = new Promise((res, rej) => {
    mysqlConnection.query("SELECT * FROM Products.Food", (err, result) => {
      if (err) throw err;

      res({ result });
    });
  }).catch((err) => console.log("promise error: ", err));

  const ret: any = await p;
  console.log(ret);
  return res.json({ data: ret.result, msg: "stuff", status: true });
});

app.all("*", (req, res) => {
  res.status(404).send("ERROR");
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`listening at ${HOSTNAME}:${PORT}`);
});
