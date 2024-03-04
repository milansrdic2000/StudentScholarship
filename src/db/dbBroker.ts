import oracledb, { Connection } from 'oracledb'
import { ColumnSchema, EntitySchema } from '../models/entitySchema.js'

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
  private getSelectQuery(entitySchema: EntitySchema<any>): string {
    let sql = ''
    entitySchema.columns.forEach((item, index) => {
      if (item.getter) {
        sql +=
          entitySchema.tableAlias + `.${item.getter} as "${String(item.name)}" `
      } else {
        sql += ` ${entitySchema.tableAlias}.${String(item.name)} `
        if (item.alias) {
          sql += ` as "${item.alias}" `
        }
      }
      if (index < entitySchema.columns.length - 1) {
        sql += ' , '
      }
    })
    return sql
  }
  private getWhereQuery(entitySchema: EntitySchema<any>): string {
    let sql = ''
    const criteria = entitySchema.filter
    sql += ' WHERE '
    Object.keys(criteria).forEach((key, index) => {
      sql += `${entitySchema.tableAlias}.${key} = ${criteria[key]} `
      if (index < Object.keys(criteria).length - 1) {
        sql += ' AND '
      }
    })
    return sql
  }
  public async select<model>(
    entitySchema: EntitySchema<any>,
    ...joinSchema: EntitySchema<any>[]
  ): Promise<model[]> {
    let sql = 'SELECT '
    sql += this.getSelectQuery(entitySchema)
    joinSchema.forEach((schema) => {
      sql += ', ' + this.getSelectQuery(schema)
    })
    sql += ` FROM ${entitySchema.tableName} ${entitySchema.tableAlias}`

    // JOINS
    if (joinSchema?.length > 0) {
      joinSchema.forEach((schema) => {
        sql += ` ${schema.joinType} JOIN ${schema.tableName} ${schema.tableAlias} ON ${entitySchema.tableAlias}.${entitySchema.joinKey} = ${schema.tableAlias}.${schema.joinKey} `
      })
    }

    if (entitySchema.filter) {
      sql += this.getWhereQuery(entitySchema)
    }

    const response = await this.executeQuery(sql)
    return response.rows
  }
  public async delete<model>(entitySchema: EntitySchema<model>): Promise<any> {
    let command = `DELETE FROM ${entitySchema.tableName} ${entitySchema.tableAlias} `
    if (!entitySchema.filter) throw new Error('No filter specified')

    command += this.getWhereQuery(entitySchema)
    const response = await this.executeQuery(command)
    await this.connection.commit()
    return response
  }
  public async insert<model>(entitySchema: EntitySchema<model>): Promise<any> {
    let command = `INSERT INTO ${entitySchema.tableName} ${entitySchema.insertQuery}`

    const response = await this.executeQuery(command)
    await this.connection.commit()
    return response
  }
  public executeQuery(sql: string, binds: any[] = []): Promise<any> {
    return this.connection.execute(sql, binds)
  }
}
