import oracledb, { Connection } from "oracledb";
import {
  ColumnSchema,
  EntitySchema,
  JoinMeta,
} from "../models/entitySchema.js";
import { formatDate } from "../utils/date-helper.js";
import createHttpError from "http-errors";

export const hello = "hi mom!";
export class DBBroker {
  private static _instance: DBBroker = null;
  private connection: Connection;
  private connectionState;
  private constructor() {
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
  }

  public static getInstance(): DBBroker {
    try {
      if (this._instance === null) {
        this._instance = new DBBroker();
      }
      return this._instance;
    } catch (err) {
      console.error(err);
    }
  }
  public async openConnection() {
    try {
      this.connection = await oracledb.getConnection({
        user: "c##mr",
        password: "c##mr",
        connectString: "192.168.0.11/orcl",
      });
    } catch (err) {
      throw err;
    }
  }
  public async closeConnection() {
    try {
      await this.connection.close();
    } catch (err) {
      return err;
    }
  }
  public rollback() {
    this.connection.rollback();
  }
  private getFieldsForSchema(entitySchema: EntitySchema<any>): string {
    let sql = "";
    entitySchema.columns.forEach((item, index) => {
      sql += ` ${entitySchema.tableAlias}.${
        item.getter ? item.getter : String(item.name)
      } `;
      sql += ` as "${item.alias ? item.alias : String(item.name)}" `;

      if (index < entitySchema.columns.length - 1) {
        sql += " , ";
      }
    });
    return sql;
  }
  private getWhereQuery(entitySchema: EntitySchema<any>): string {
    let sql = "";
    const criteria = entitySchema.filter;
    sql += " WHERE ";
    Object.keys(criteria).forEach((key, index) => {
      sql += `${entitySchema.tableAlias}.${key} = `;
      if (typeof criteria[key] === "string") {
        sql += `'${criteria[key]}'`;
      } else {
        sql += criteria[key];
      }
      if (index < Object.keys(criteria).length - 1) {
        sql += " AND ";
      }
    });
    return sql;
  }
  private getJoinRecursive(mainSchema: EntitySchema<any>): string {
    let sql = "";
    const joinMeta = mainSchema.joinMeta;
    if (joinMeta?.length > 0) {
      joinMeta.forEach((join, index) => {
        const subSchema = join.subJoin;
        // looping through all join metas (table which we are joining with)
        sql += ` ${join.joinType} JOIN ${subSchema.tableName} ${subSchema.tableAlias} ON `;
        join.joinKeys.forEach((key, j) => {
          // we match these two tables with join keys provided in joinMeta
          sql += `${mainSchema.tableAlias}.${join.joinKeys[j]} = ${subSchema.tableAlias}.${subSchema.joinKey[j]} `;
          if (j < join.joinKeys.length - 1) sql += " AND ";
        });
        if (subSchema.joinMeta) {
          sql += this.getJoinRecursive(subSchema);
        }
      });
    }
    return sql;
  }
  private getFieldsRecursive(mainSchema: EntitySchema<any>): string {
    let sql = "";
    sql += this.getFieldsForSchema(mainSchema);
    const joinMeta = mainSchema.joinMeta;
    joinMeta?.forEach((join) => {
      sql += "," + this.getFieldsRecursive(join.subJoin);
    });
    return sql;
  }
  public async select<model>(
    mainSchema: EntitySchema<model>
  ): Promise<model[]> {
    let sql = "SELECT " + this.getFieldsRecursive(mainSchema);

    sql += ` FROM ${mainSchema.tableName} ${mainSchema.tableAlias}`;
    // JOINS
    sql += this.getJoinRecursive(mainSchema);
    if (mainSchema.filter) {
      sql += this.getWhereQuery(mainSchema);
    }
    const response = await this.executeQuery(sql);
    return response.rows;
  }
  public async delete<model>(entitySchema: EntitySchema<model>): Promise<any> {
    let command = `DELETE FROM ${entitySchema.tableName} ${entitySchema.tableAlias} `;
    if (!entitySchema.filter) throw new Error("No filter specified");

    command += this.getWhereQuery(entitySchema);
    const response = await this.executeQuery(command);
    await this.connection.commit();
    return response;
  }
  public async insert<model>(
    entitySchema: EntitySchema<model>,
    manageTransaction: boolean = true
  ): Promise<any> {
    let command = `INSERT INTO ${entitySchema.tableName} ${entitySchema.insertQuery} `;
    let output = {};
    if (entitySchema.autoIncrement) {
      command += `RETURNING ${entitySchema.autoIncrement} INTO :id `;
      output = { id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } };
    }
    console.log(command);
    const result = await DBBroker._instance.connection.execute(command, output);
    if (manageTransaction) await this.connection.commit();

    return result;
  }
  public async update<model>(entitySchema: EntitySchema<model>): Promise<any> {
    let command = `UPDATE ${entitySchema.tableName} ${entitySchema.tableAlias} ${entitySchema.updateQuery}`;

    command += this.getWhereQuery(entitySchema);
    const response = await this.executeQuery(command);

    return response;
  }
  public async patch<model>(entitySchema: EntitySchema<model>) {
    let command = `UPDATE ${entitySchema.tableName} ${entitySchema.tableAlias} SET `;
    Object.keys(entitySchema.payload).forEach((key, index) => {
      // get getter if columns has it
      const databaseColumn = entitySchema.getDatabaseColumnName
        ? entitySchema.getDatabaseColumnName(key)
        : key;
      if (!databaseColumn) return;
      if (key === entitySchema.primaryKey) return;
      const prop = entitySchema.payload[key];
      if (prop === undefined) return;
      // only map through primitive objects (objects are ommited)
      if (typeof prop === "object" && !(prop instanceof Date)) {
        return;
      }
      command += `${databaseColumn} = `;

      if (prop && prop instanceof Date) {
        command += `'${formatDate(prop)}'`;
      } else if (typeof prop === "string") {
        command += `'${prop}'`;
      } else if (typeof prop !== "object") {
        command += prop;
      }
      // append ',' if its not last prop

      command += " , ";
    });
    command = command.slice(0, -2);
    console.log(command);
    command += this.getWhereQuery(entitySchema);
    const response = await this.executeQuery(command);
    await this.connection.commit();
    if (response.rowsAffected === 0)
      throw createHttpError(404, "Patch Resource Not found hehe");
    return response;
  }
  public executeQuery(sql: string, binds: any[] = []): Promise<any> {
    return this.connection.execute(sql, binds);
  }
}
