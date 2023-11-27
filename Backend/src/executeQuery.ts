import { QueryError, RowDataPacket } from "mysql2";
import connection from "./database";

const executeQuery = (query: string, values?: string[]) => {
  return new Promise<RowDataPacket[]>((resolve, reject) => {
    connection.query(
      query,
      values,
      (error: QueryError | null, results: RowDataPacket[]) => {
        if (error) {
          return reject(`DB ${error}`);
        }
        resolve(results);
      }
    );
  });
};

export default executeQuery;
