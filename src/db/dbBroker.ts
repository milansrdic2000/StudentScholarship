import oracledb, { Connection } from 'oracledb'
import { EntitySchema } from '../models/entitySchema.js'

export const hello = 'hi mom!'
export class DBBroker {
  private static _instance: DBBroker = null
  private connection: Connection
  private connectionState
  private constructor() {
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
  }

  public static getInstance(): DBBroker {
    try {
      if (this._instance === null) {
        this._instance = new DBBroker()
      }
      return this._instance
    } catch (err) {
      console.error(err)
    }
  }
  public async openConnection() {
    try {
      this.connection = await oracledb.getConnection({
        user: 'c##mr',
        password: 'c##mr',
        connectString: 'localhost/orcl',
      })
    } catch (err) {
      throw err
    }
  }
  public async closeConnection() {
    try {
      await this.connection.close()
    } catch (err) {
      return err
    }
  }
  public async select<schema extends EntitySchema<any>, model>(
    entitySchema: schema,
    criteria?: Partial<model>
  ): Promise<model[]> {
    let sql = 'SELECT '
    entitySchema.columns.forEach((item, index) => {
      if (item.getter) {
        sql +=
          entitySchema.tableAlias + `.${item.getter} as "${String(item.name)}" `
      } else {
        sql += ` ${String(item.name)} `
        if (item.alias) {
          sql += ` as "${item.alias}" `
        }
      }
      if (index < entitySchema.columns.length - 1) {
        sql += ' , '
      }
    })
    sql += ` FROM ${entitySchema.tableName} ${entitySchema.tableAlias}`
    if (criteria) {
      sql += ' WHERE '
      Object.keys(criteria).forEach((key, index) => {
        sql += `${entitySchema.tableAlias}.${key} = ${criteria[key]} `
        if (index < Object.keys(criteria).length - 1) {
          sql += ' AND '
        }
      })
    }

    const response = await this.executeQuery(sql)
    return response.rows
  }
  public executeQuery(sql: string, binds: any[] = []): Promise<any> {
    return this.connection.execute(sql, binds)
  }
}
