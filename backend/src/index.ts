import express from "express";
import mysql from "mysql";
import cors from "cors";
import _ from "lodash";
import * as UTL from "./utl";

const app = express();

const PORT: number = 5000;
const HOSTNAME: string = "127.0.0.1";

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "Sheet",
});

mysqlConnection.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});

app.use(cors());

//#region /login

app.get("/login", async (req, res) => {
  let error = false;
  const { username, pass } = req.query;
  if (!username || !pass)
    return res.status(400).json({ data: {}, status: false });

  const ret: any = await UTL.getLoginPromise(
    username as string,
    pass as string,
    mysqlConnection
  ).catch((err) => {
    console.log("promise error: ", err);
    error = true;
  });

  if (error) return res.status(404).json({ data: [], status: false });
  return res.status(201).json({ data: ret.result, status: true });
});

app.post("/login", async (req, res) => {
  let error = false;
  const { username, pass } = req.query;
  if (!username || !pass)
    return res.status(400).json({ data: {}, status: false });

  const ret: any = await UTL.postLoginPromise(
    username as string,
    pass as string,
    mysqlConnection
  )
    .then(() =>
      UTL.getLoginPromise(username as string, pass as string, mysqlConnection)
    )
    .catch((err) => {
      console.log("promise error: ", err);
      error = true;
    });

  if (error) return res.status(404).json({ data: [], status: false });
  return res.status(201).json({ data: ret.result, status: true });
});

//#endregion /login

//#region /table

app.get("/table/:id", async (req, res) => {
  let error = false;
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ data: {}, status: false });

  const ret: any = await UTL.getTablePromise(id, mysqlConnection).catch(
    (err) => {
      console.log("promise error: ", err);
      error = true;
    }
  );

  if (error) return res.status(404).json({ data: [], status: false });
  return res.status(201).json({ data: ret.result, status: true });
});

//#endregion /table

app.all("*", (req, res) => {
  res.status(404).send("ERROR");
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`listening at ${HOSTNAME}:${PORT}`);
});
