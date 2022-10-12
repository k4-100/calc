import express from "express";
const app = express();

const PORT: number = 5000;
const HOSTNAME: string = "127.0.0.1";

app.get("/", (req, res) => {
  res.status(200).send("HOME");
});

app.all("*", (req, res) => {
  res.status(404).send("ERROR");
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`listening at ${HOSTNAME}:${PORT}`);
});
