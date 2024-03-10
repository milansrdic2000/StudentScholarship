export interface EntitySchema<T> {
  tableName: string
  tableAlias?: string
  primaryKey: string | string[]
  autoIncrement?: string

  columns: ColumnSchema<T>[]
  filter?: Partial<T>
  payload?: Partial<T>

  insertQuery?: string
  updateQuery?: string

  // acceptance join
  joinKey?: string | string[]
  joinType?: string

  // join with other tables
  joinMeta?: JoinMeta[]
}

export interface JoinMeta {
  joinKeys: string[]
  joinType: string
  subJoin?: EntitySchema<any>
}
export interface ColumnSchema<T> {
  name: keyof T
  getter?: string
  alias?: string
  type?: string
  required?: boolean
  primaryKey?: boolean
  autoIncrement?: boolean
  foreignKey?: boolean
}
