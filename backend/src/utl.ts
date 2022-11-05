import mysql from "mysql";
import _ from "lodash";

/**
 *
 * @param username username query string
 * @param pass password query string
 * @param sqlConnection sql connection instance
 * @returns sql query awaiting completion
 */
export function getLoginPromise(
  username: string,
  pass: string,
  sqlConnection: mysql.Connection
) {
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
