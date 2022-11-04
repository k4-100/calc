import express, { application } from "express";
import mysql from "mysql";
import _ from "lodash";

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

app.get("/login", async (req, res) => {
  let error = false;
  const { id, username, pass } = req.query;
  if (!id || !username || !pass)
    return res.status(400).json({ data: {}, status: false });

  const p = new Promise((res, rej) => {
    mysqlConnection.query("SELECT * FRO Users", (err, result) => {
      if (err) return rej(err);

      res({ result });
      res({
        result: result.map(({ userID, username }: any) => ({
          userID,
          username,
        })),
      });
    });
  }).catch((err) => {
    console.log("promise error: ", err);
    error = true;
  });

  const ret: any = await p;
  console.log(ret);
  if (error) return res.status(404).json({ data: [], status: false });
  return res.status(201).json({ data: ret.result, status: true });
});

// app.get("/api/v1/users", async (_, res) => {
//   let error = false;
//   const p = new Promise((res, rej) => {
//     mysqlConnection.query("SELECT * FROM Users", (err, result) => {
//       if (err) rej(err);

//       res({
//         result: result.map(({ userID, username }: any) => ({
//           userID,
//           username,
//         })),
//       });
//     });
//   }).catch((err) => {
//     console.log("promise error: ", err);
//     error = true;
//   });

//   if (!error) return res.status(404).json({ data: [], status: false });

//   const ret: any = await p;
//   return res.status(201).json({ data: ret.result, status: true });
// });

app.all("*", (req, res) => {
  res.status(404).send("ERROR");
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`listening at ${HOSTNAME}:${PORT}`);
});
