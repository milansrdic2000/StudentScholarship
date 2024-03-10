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
      sql += `${entitySchema.tableAlias}.${key} = `
      if (typeof criteria[key] === 'string') {
        sql += `'${criteria[key]}'`
      } else {
        sql += criteria[key]
      }
      if (index < Object.keys(criteria).length - 1) {
        sql += ' AND '
      }
    })
    return sql
  }
  public async select<model>(
    mainSchema: EntitySchema<any>,
    ...joinSchema: EntitySchema<any>[]
  ): Promise<model[]> {
    let sql = 'SELECT '
    sql += this.getSelectQuery(mainSchema)
    joinSchema.forEach((schema) => {
      sql += ', ' + this.getSelectQuery(schema)
    })
    sql += ` FROM ${mainSchema.tableName} ${mainSchema.tableAlias}`

    // JOINS
    if (joinSchema?.length > 0) {
      const joinMetas = mainSchema.joinMeta
      joinSchema.forEach((schema, index) => {
        // for each join schema, iterate through all join keys ( ON condition)
        const joinMetaMain = mainSchema.joinMeta[index]
        sql += ` ${joinMetaMain.joinType} JOIN ${schema.tableName} ${schema.tableAlias} ON `

        joinMetaMain.joinKeys.forEach((key, j) => {
          sql += `${mainSchema.tableAlias}.${joinMetaMain.joinKeys[j]} = ${schema.tableAlias}.${schema.joinKey[j]} `
          if (j < joinMetaMain.joinKeys.length - 1) sql += ' AND '
        })
        const joinMeta = schema.joinMeta
        // check if each join schema has its own subjoins
        if (joinMeta?.length > 0) {
          joinMeta.forEach((subJoin, index) => {
            if (subJoin.subJoin) {
              sql += ` ${subJoin.joinType} JOIN ${subJoin.subJoin.tableName} ${subJoin.subJoin.tableAlias} ON `
              subJoin.joinKeys.forEach((key, j) => {
                sql += `${schema.tableAlias}.${subJoin.joinKeys[j]} = ${subJoin.subJoin.tableAlias}.${subJoin.subJoin.joinKey[j]} `
                if (j < subJoin.joinKeys.length - 1) sql += ' AND '
              })
            }
          })
        }
      })
    }
    if (mainSchema.filter) {
      sql += this.getWhereQuery(mainSchema)
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
    let command = `INSERT INTO ${entitySchema.tableName} ${entitySchema.insertQuery} `
    let output = {}
    if (entitySchema.autoIncrement) {
      command += `RETURNING ${entitySchema.autoIncrement} INTO :id `
      output = { id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } }
    }

    const result = await DBBroker._instance.connection.execute(command, output)

    await this.connection.commit()
    return result
  }
  public async update<model>(entitySchema: EntitySchema<model>): Promise<any> {
    let command = `UPDATE ${entitySchema.tableName} ${entitySchema.tableAlias} ${entitySchema.updateQuery}`

    const string = '12345'
    command += this.getWhereQuery(entitySchema)
    const response = await this.executeQuery(command)
    await this.connection.commit()
    return response
  }
  public executeQuery(sql: string, binds: any[] = []): Promise<any> {
    return this.connection.execute(sql, binds)
  }
}
