import oracledb, { Connection } from 'oracledb'
import { EntityMeta } from '../models/entityMeta.js'

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
  public select<model extends EntityMeta<any>>(
    entity: model,
    criteria?: Partial<model>
  ): Promise<any> {
    let sql = 'SELECT '
    sql += Object.keys(entity).join(', ')
    return this.executeQuery(sql)
  }
  public executeQuery(sql: string, binds: any[] = []): Promise<any> {
    return this.connection.execute(sql, binds)
  }
}
