import express from "express";
import mysql from "mysql";
import cors from "cors";
import _ from "lodash";
import bodyParser from "body-parser";

import * as UTL from "./utl";

const app = express();

const PORT: number = 5000;
const HOSTNAME: string = "127.0.0.1";

// create application/json parser
const jsonParser = bodyParser.json();

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

app.post("/table", jsonParser, async (req, res) => {
  let error = false;
  const { content } = req.body;
  if (!content) return res.status(400).json({ data: {}, status: false });
  const ret: any = await UTL.queryPromise(
    mysqlConnection,
    `SELECT * FROM Sheets WHERE userID=${1}`
  )
    .then((dsa) => console.log((dsa as any).result.userID))
    .catch((err) => {
      console.log("promise error: ", err);
      error = true;
    });
  // UTL.postTablePromise(
  //   1,
  //   content,
  //   mysqlConnection
  // )
  if (error) return res.status(404).json({ data: [], status: false });
  return res
    .status(201)
    .json({ data: !_.isEmpty(ret) ? ret.result : [], status: true });
});
// app.put("/table", async (req, res) => {});
// app.delete("/table", async (req, res) => {});

//#endregion /table

app.all("*", (req, res) => {
  res.status(404).send("ERROR");
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`listening at ${HOSTNAME}:${PORT}`);
});
