import mysql from "mysql";
import _ from "lodash";

/**
 *
 * @param sqlConnection connection to sql database
 * @param query query to execute
 * @returns promise with a result of an sql query
 */
export function queryPromise(
  sqlConnection: mysql.Connection,
  query: string
): Promise<unknown> {
  return new Promise((res, rej) => {
    sqlConnection.query(query, (err, result) => {
      if (err) return rej(err);
      if (_.isEmpty(result))
        return res({
          result: [],
        });

      res({
        result: result[0],
      });
    });
  });
}

/**
 *
 * @param username username query string
 * @param pass password query string
 * @param sqlConnection sql connection instance
 * @returns sql query get promise awaiting completion
 */
export function getLoginPromise(
  username: string,
  pass: string,
  sqlConnection: mysql.Connection
): Promise<unknown> {
  return new Promise((res, rej) => {
    sqlConnection.query(
      `SELECT * FROM Users WHERE username='${username}' AND pass='${pass}'`,
      (err, result) => {
        if (err) return rej(err);

        if (_.isEmpty(result))
          return res({
            result: [],
          });

        delete result[0].pass;
        res({
          result: result[0],
        });
      }
    );
  });
}

/**
 *
 * @param username username query string
 * @param pass password query string
 * @param sqlConnection sql connection instance
 * @returns sql query post promise awaiting completion
 */
export function postLoginPromise(
  username: string,
  pass: string,
  sqlConnection: mysql.Connection
): Promise<unknown> {
  return new Promise((res, rej) => {
    sqlConnection.query(
      `INSERT INTO Users(username,pass) VALUES('${username}','${pass}')`,
      (err, result) => {
        if (err) return rej(err);
        res({
          result,
        });
      }
    );
  });
}

/**
 *
 * @param id id url param number
 * @param sqlConnection sql connection instance
 * @returns sql query get promise awaiting completion
 */
export function getTablePromise(
  id: number,
  sqlConnection: mysql.Connection
): Promise<unknown> {
  return new Promise((res, rej) => {
    sqlConnection.query(
      `SELECT * FROM Tables WHERE tableID=${id}`,
      (err, result) => {
        if (err) return rej(err);
        if (_.isEmpty(result))
          return res({
            result: [],
          });

        res({
          result: result[0],
        });
      }
    );
  });
}

/**
 * @param sheetID id of the sheet this table belongs to
 * @param content json content in a form of a string
 * @param sqlConnection sql connection instance
 * @returns sql query post promise awaiting completion
 */
export function postTablePromise(
  sheetID: number,
  content: string,
  sqlConnection: mysql.Connection
): Promise<unknown> {
  return new Promise((res, rej) => {
    sqlConnection.query(
      `INSERT INTO Tables(sheetID,content) VALUES(${sheetID},'${content}')`,
      (err, result) => {
        if (err) return rej(err);

        res({
          result,
        });
      }
    );
  });
}
